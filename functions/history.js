const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

const twelveDataApiKey = defineSecret("TWELVE_DATA_API_KEY");

exports.updateHistory = onRequest(
  {
    secrets: [twelveDataApiKey],
  },
  async (req, res) => {

    const ativos = [
      { api: "EUR/USD", doc: "EURUSD" },
      { api: "GBP/USD", doc: "GBPUSD" },
      { api: "XAU/USD", doc: "XAUUSD" },
      { api: "BTC/USD", doc: "BTCUSD" }
    ];

    for (const ativo of ativos) {

      const response = await fetch(
        `https://api.twelvedata.com/price?symbol=${ativo.api}&apikey=${twelveDataApiKey.value()}`
      );

      const data = await response.json();

      if (!data.price) continue;

      await db
        .collection("history")
        .doc(ativo.doc)
        .collection("ticks")
        .add({
          symbol: ativo.api,
          price: Number(data.price),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

    }

    res.send({
      success: true
    });

  }
);
