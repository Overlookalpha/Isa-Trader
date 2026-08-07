
import { db } from "./firebase.js";

import {
    doc,
    onSnapshot,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Todos os preços ficarão armazenados aqui
export const marketData = {
  EURUSD: null,
  GBPUSD: null,
  XAUUSD: null,
  BTCUSD: null,

  ultimoEURUSD: null,

  history: {
    EURUSD: [],
    GBPUSD: [],
    XAUUSD: [],
    BTCUSD: []
  }
};

// Monitora um ativo
function monitorarAtivo(symbol) {

  onSnapshot(doc(db, "prices", symbol), (snapshot) => {

    if (!snapshot.exists()) return;

    marketData[symbol] = snapshot.data();
    marketData.history[symbol].push(snapshot.data().price);

// Mantém apenas os últimos 200 preços
if (marketData.history[symbol].length > 200) {
    marketData.history[symbol].shift();
}
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
function calcularEMA(precos, periodo) {

    if (precos.length < periodo) return null;

    const k = 2 / (periodo + 1);

    let ema = precos[0];

    for (let i = 1; i < precos.length; i++) {
        ema = precos[i] * k + ema * (1 - k);
    }

    return ema;

}
async function analisarMercado(symbol) {

  const ativo = marketData[symbol];

  if (!ativo) return;

  const preco = ativo.price;
const ema9 = calcularEMA(marketData.history[symbol], 9);
const ema21 = calcularEMA(marketData.history[symbol], 21);

if (ema9 && ema21) {
    console.log(`${symbol} | EMA9: ${ema9.toFixed(5)} | EMA21: ${ema21.toFixed(5)}`);
}

  let sinal = "HOLD";

  if (!ema9 || !ema21) {
    return;
}

if (ema9 > ema21) {
    sinal = "BUY";
} else {
    sinal = "SELL";
}

  console.log(symbol, "→", sinal);
await setDoc(
  doc(db, "signals", "current"),
  {
    action: sinal,
    pair: symbol,
    price: preco,
    confidence: 70,
    trend: sinal === "BUY" ? "Bullish" : "Bearish",
    updated: new Date()
  }
);
}
// Inicia o robô
export function iniciarAIRobot() {

  monitorarAtivo("EURUSD");
  monitorarAtivo("GBPUSD");
  monitorarAtivo("XAUUSD");
  monitorarAtivo("BTCUSD");

  console.log("🤖 AI Robot iniciado.");

}
