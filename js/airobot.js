
import { db } from "./firebase.js";

import {
  doc,
  onSnapshot   
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Todos os preços ficarão armazenados aqui
export const marketData = {
  EURUSD: null,
  GBPUSD: null,
  XAUUSD: null,
  BTCUSD: null
};

// Monitora um ativo
function monitorarAtivo(symbol) {

  onSnapshot(doc(db, "prices", symbol), (snapshot) => {

    if (!snapshot.exists()) return;

    marketData[symbol] = snapshot.data();

    console.log(${symbol}:, marketData[symbol]);

  });

}

// Inicia o robô
export function iniciarAIRobot() {

  monitorarAtivo("EURUSD");
  monitorarAtivo("GBPUSD");
  monitorarAtivo("XAUUSD");
  monitorarAtivo("BTCUSD");

  console.log("🤖 AI Robot iniciado.");

}
