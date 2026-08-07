
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
  BTCUSD: null,

  ultimoEURUSD: null
};

// Monitora um ativo
function monitorarAtivo(symbol) {

  onSnapshot(doc(db, "prices", symbol), (snapshot) => {

    if (!snapshot.exists()) return;

    marketData[symbol] = snapshot.data();
    analisarMercado(symbol);
    if (symbol === "EURUSD") {

  if (marketData.ultimoEURUSD !== null) {

    if (marketData.EURUSD.price > marketData.ultimoEURUSD) {
      console.log("🟢 BUY");
    } else if (marketData.EURUSD.price < marketData.ultimoEURUSD) {
      console.log("🔴 SELL");
    }

  }

  marketData.ultimoEURUSD = marketData.EURUSD.price;

}

    console.log(`${symbol}:`, marketData[symbol]);

  });

}
function analisarMercado(symbol) {

  const ativo = marketData[symbol];

  if (!ativo) return;

  const preco = ativo.price;

  let sinal = "HOLD";

  if (preco > 1.15) {
    sinal = "BUY";
  } else {
    sinal = "SELL";
  }

  console.log(symbol, "→", sinal);

}
// Inicia o robô
export function iniciarAIRobot() {

  monitorarAtivo("EURUSD");
  monitorarAtivo("GBPUSD");
  monitorarAtivo("XAUUSD");
  monitorarAtivo("BTCUSD");

  console.log("🤖 AI Robot iniciado.");

}
