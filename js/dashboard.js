
const dashboard = {

    balance:10000,

    profit:126.40,

    ai:92,

    status:"ACTIVE"

};

function updateCards(){

    const cards=document.querySelectorAll(".card-info h2");

    if(cards.length<4) return;

    cards[0].innerHTML="€"+dashboard.balance.toLocaleString();

    cards[1].innerHTML="+€"+dashboard.profit.toFixed(2);

    cards[2].innerHTML=dashboard.ai+"%";

    cards[3].innerHTML=dashboard.status;

}

updateCards();
