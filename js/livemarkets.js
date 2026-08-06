const markets = [

"EURUSD",

"GBPUSD",

"USDJPY",

"XAUUSD",

"BTCUSDT",

"ETHUSDT"

];

const container = document.getElementById("markets");

markets.forEach(symbol => {

    container.innerHTML += `
        <div class="card-info">
            <span>${symbol}</span>
            <h2 id="${symbol}">Loading...</h2>
        </div>
    `;
});
