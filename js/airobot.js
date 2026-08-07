
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

    const historico = marketData.history[symbol];
    const preco = ativo.price;

    const ema9 = calcularEMA(historico, 9);
    const ema21 = calcularEMA(historico, 21);
console.log(symbol, "Histórico:", historico.length);
    if (!ema9 || !ema21) return;

    //============================
    // TENDÊNCIA
    //============================

    let sinal = "HOLD";

    if (ema9 > ema21) {
        sinal = "BUY";
    } else if (ema9 < ema21) {
        sinal = "SELL";
    }

    //============================
    // FORÇA DA TENDÊNCIA
    //============================

    const distanciaEMA = Math.abs(ema9 - ema21);

    let confidence = Math.min(
        95,
        Math.round(distanciaEMA * 100000)
    );

    if (confidence < 55)
        confidence = 55;

    //============================
    // RSI (simples)
    //============================

    let rsi = 50;

    if (historico.length > 15) {

        let ganhos = 0;
        let perdas = 0;

        for (let i = historico.length - 14; i < historico.length; i++) {

            const diff = historico[i] - historico[i - 1];

            if (diff > 0)
                ganhos += diff;
            else
                perdas += Math.abs(diff);
        }

        if (perdas === 0)
            rsi = 100;
        else {

            const rs = ganhos / perdas;

            rsi = 100 - (100 / (1 + rs));

        }

    }

    //============================
    // FILTRO RSI
    //============================

    if (sinal === "BUY" && rsi > 70)
        confidence -= 15;

    if (sinal === "SELL" && rsi < 30)
        confidence -= 15;

    confidence = Math.max(confidence, 50);

    //============================
    // SALVA NO FIRESTORE
    //============================

    await setDoc(doc(db, "signals", "current"), {

        pair: symbol,

        action: sinal,

        price: preco,

        confidence,

        trend: sinal === "BUY" ? "Bullish" : "Bearish",

        ema9,

        ema21,

        rsi,

        updated: new Date()

    });

    console.log("🤖", symbol, sinal, confidence + "%", "RSI:", rsi.toFixed(1));

}
// Inicia o robô
export function iniciarAIRobot() {

  monitorarAtivo("EURUSD");
  monitorarAtivo("GBPUSD");
  monitorarAtivo("XAUUSD");
  monitorarAtivo("BTCUSD");

  console.log("🤖 AI Robot iniciado.");

}
