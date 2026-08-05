import { db } from "./firebase.js";

import {
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const dashboardRef = doc(db, "dashboard", "main");

onSnapshot(dashboardRef, (snapshot) => {

    if (!snapshot.exists()) return;

    const data = snapshot.data();

    const cards = document.querySelectorAll(".card-info h2");

    if (cards.length < 4) return;

    cards[0].innerHTML = "€" + Number(data.balance).toLocaleString();

    cards[1].innerHTML = "+€" + Number(data.profit).toFixed(2);

    cards[2].innerHTML = data.openTraders;

    cards[3].innerHTML = data.winRate + "%";

});
