import { db } from "./firebase.js";

import {
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// EUR/USD
onSnapshot(doc(db, "prices", "EURUSD"), (docSnap) => {
    if (docSnap.exists()) {
        document.getElementById("eurusd").innerHTML =
            docSnap.data().price;
    }
});

// GBP/USD
onSnapshot(doc(db, "prices", "GBPUSD"), (docSnap) => {
    if (docSnap.exists()) {
        document.getElementById("gbpusd").innerHTML =
            docSnap.data().price;
    }
});

// GOLD
onSnapshot(doc(db, "prices", "XAUUSD"), (docSnap) => {
    if (docSnap.exists()) {
        document.getElementById("gold").innerHTML =
            docSnap.data().price;
    }
});

// BITCOIN
onSnapshot(doc(db, "prices", "BTCUSD"), (docSnap) => {
    if (docSnap.exists()) {
        document.getElementById("btc").innerHTML =
            docSnap.data().price;
    }
});
