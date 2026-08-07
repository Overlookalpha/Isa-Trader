import { db } from "./firebase.js";

import {
    collection,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

import {
    doc
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// DASHBOARD
const dashboardRef = doc(db, "dashboard", "main");

onSnapshot(dashboardRef, (snapshot) => {
    console.log("Quantidade de trades:", snapshot.size);

snapshot.forEach(doc => {
    console.log(doc.id, doc.data());
});

    if (!snapshot.exists()) return;

    const data = snapshot.data();

    const cards = document.querySelectorAll(".card-info h2");

    if (cards.length < 4) return;

    cards[0].innerHTML = "€" + Number(data.balance).toLocaleString();

    cards[1].innerHTML = "+€" + Number(data.profit).toFixed(2);

    cards[2].innerHTML = data.openTraders;

    cards[3].innerHTML = data.winRate + "%";

});


// ==========================
// AI SIGNAL
// ==========================

const signalRef = doc(db, "signals", "current");

onSnapshot(signalRef, (snapshot) => {

    if (!snapshot.exists()) return;

    const signal = snapshot.data();

    document.querySelector(".buy h3").innerHTML =
        signal.action + " SIGNAL";

    document.querySelector(".buy strong").innerHTML =
        signal.pair;

    document.querySelector(".buy p b").innerHTML =
        signal.confidence + "%";

    document.querySelector(".buy small").innerHTML =
        signal.trend;

});
const tradesRef = collection(db, "trades");

onSnapshot(
    tradesRef,
    (snapshot) => {
        console.log(snapshot);
        console.log(snapshot.constructor.name);
        console.log(snapshot.size);
    },
    (error) => {
        console.error("Erro Firestore:", error);
    }
);

    const list = document.getElementById("tradesList");
const historyList = document.getElementById("historyList");
    
    list.innerHTML = "";
     historyList.innerHTML = "";
    snapshot.forEach((doc) => {

        const trade = doc.data();
      if (trade.status === "OPEN") {
        
        list.innerHTML += `
<div class="trade-card">

    <h3 style="color:${trade.action === 'BUY' ? '#22c55e' : '#ef4444'}">
    ${trade.action} ${trade.pair}
</h3>

    <p><strong>Entry:</strong> ${trade.entry}</p>

    <p><strong>Stop Loss:</strong> ${trade.sl}</p>

    <p><strong>Take Profit:</strong> ${trade.tp}</p>

    <p><strong>Profit:</strong> €${trade.profit}</p>

    <p><strong>Status:</strong> <span style="color:${trade.status === 'OPEN' ? '#22c55e' : '#ef4444'};font-weight:bold;">${trade.status}</span></p>

</div>
`;
      }
if (trade.status === "CLOSED") {

historyList.innerHTML += `

<div class="trade-card closed-card">

    <div class="trade-top">

        <div>

            <span style="color:${trade.action==="BUY" ? "#22c55e" : "#ef4444"};font-weight:bold;">

                ${trade.action}

            </span>

            <strong>${trade.pair}</strong>

        </div>

        <span class="closed">

            CLOSED

        </span>

    </div>

    <div class="trade-grid">

        <div>

            <small>Entry</small>

            <strong>${trade.entry}</strong>

        </div>

        <div>

            <small>Exit</small>

            <strong>${trade.exitPrice ?? "-"}</strong>

        </div>

        <div>

            <small>Stop Loss</small>

            <strong>${trade.sl}</strong>

        </div>

        <div>

            <small>Take Profit</small>

            <strong>${trade.tp}</strong>

        </div>

        <div>

            <small>Profit</small>

            <strong class="${trade.profit>=0?"profit":"loss"}">

                €${Number(trade.profit).toFixed(2)}

            </strong>

        </div>

        <div>

            <small>Risk</small>

            <strong>${trade.risk ?? "-"}</strong>

        </div>

    </div>

</div>

`;

}
});
    

});
