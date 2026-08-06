const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

const twelveDataApiKey = defineSecret("TWELVE_DATA_API_KEY");

exports.updateEURUSD = onRequest(
  {
    secrets: [twelveDataApiKey],
  },
  async (req, res) => {
    try {
      const apiKey = twelveDataApiKey.value();

      const response = await fetch( 
        `https://api.twelvedata.com/price?symbol=EUR/USD&apikey=${apiKey}`
      );

      const data = await response.json();

      if (data.code) {
        throw new Error(data.message);
      }

      await db.collection("prices").doc("EURUSD").set({
        symbol: "EUR/USD",
        price: Number(data.price),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.send({
        success: true,
        data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
);
