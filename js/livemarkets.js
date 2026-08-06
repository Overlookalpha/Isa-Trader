import { db } from "./firebase.js";

import {
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

function monitorarAtivo(documento, elemento) {
    onSnapshot(doc(db, "prices", documento), (snapshot) => {

        if (!snapshot.exists()) return;

        const dados = snapshot.data();

        document.getElementById(elemento).textContent = dados.price;

    });
}

monitorarAtivo("EURUSD", "eurusd");
monitorarAtivo("GBPUSD", "gbpusd");
monitorarAtivo("XAUUSD", "gold");
monitorarAtivo("BTCUSD", "btc");
