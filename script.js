let coins = [];

// TEMPORARY MOCK DATA FOR STYLING
const mockData = [
  {
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    name: "Bitcoin",
    symbol: "btc",
    current_price: 65000,
    price_change_24h: 1200.5,
  },
  {
    name: "Ethereum",
    symbol: "eth",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3500,
    price_change_24h: -50.25,
  },
  {
    name: "Bitcoin",
    symbol: "btc",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 65000,
    price_change_24h: 1200.5,
  },
  {
    name: "Ethereum",
    symbol: "eth",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3500,
    price_change_24h: -50.25,
  },
  {
    name: "Bitcoin",
    symbol: "btc",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 65000,
    price_change_24h: 1200.5,
  },
  {
    name: "Ethereum",
    symbol: "eth",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3500,
    price_change_24h: -50.25,
  },
  {
    name: "Bitcoin",
    symbol: "btc",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 65000,
    price_change_24h: 1200.5,
  },
  {
    name: "Ethereum",
    symbol: "eth",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3500,
    price_change_24h: -50.25,
  },
];

const coinsEl = document.querySelector("#coins");

const renderCoins = () => {
  coins.forEach((coin) => {
    const coinEl = document.createElement("div");
    const iconEl = document.createElement("img");
    const nameEl = document.createElement("span");
    const symbolEl = document.createElement("span");
    const currentPriceEl = document.createElement("span");
    const priceChange24hEl = document.createElement("span");

    iconEl.src = coin.image;
    nameEl.textContent = coin.name;
    symbolEl.textContent = coin.symbol;
    currentPriceEl.textContent = coin.current_price + "$";
    priceChange24hEl.textContent = coin.price_change_24h + "$";

    coinEl.classList.add("coin");
    iconEl.classList.add("coin-img");
    nameEl.classList.add("coin-name");
    symbolEl.classList.add("coin-symbol");
    currentPriceEl.classList.add("coin-price");

    if (coin.price_change_24h > 0) {
      priceChange24hEl.classList.add("green");
    } else {
      priceChange24hEl.classList.add("red");
    }

    coinEl.append(nameEl, symbolEl, iconEl, currentPriceEl, priceChange24hEl);

    coinsEl.append(coinEl);
  });
};

const fetchCoinData = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10",
    );

    if (!response.ok) {
      throw new Error(`HTTP-Error! Status: ${response.status}`);
    }

    const data = await response.json();

    coins = data;

    renderCoins();
  } catch (error) {
    console.error(error.message);
  }
};

const init = () => {
  fetchCoinData();
};

init();
