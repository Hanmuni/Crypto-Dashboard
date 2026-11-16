let coins = [];
let refreshTimerId;

const REFRESH_INTERVAL_MS = 60000;

const coinsEl = document.querySelector("#coins");
const refreshEl = document.querySelector("#refresh");
const errorEl = document.querySelector("#error");

const formatPrice = (price) => {
  if (price == null) {
    return "N/A";
  }

  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatPriceChange = (price) => {
  if (price == null) {
    return "N/A";
  }

  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    signDisplay: "exceptZero",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const createCoinElement = (coin) => {
  const coinEl = document.createElement("div");
  const coinHeaderEl = document.createElement("div");
  const coinFooterEl = document.createElement("div");
  const iconEl = document.createElement("img");
  const nameEl = document.createElement("span");
  const symbolEl = document.createElement("span");
  const currentPriceEl = document.createElement("span");
  const priceChange24hEl = document.createElement("span");

  iconEl.src = coin.image;
  nameEl.textContent = coin.name;
  symbolEl.textContent = coin.symbol;
  currentPriceEl.textContent = formatPrice(coin.current_price);
  priceChange24hEl.textContent = formatPriceChange(coin.price_change_24h);

  coinHeaderEl.classList.add("coin-header");
  coinFooterEl.classList.add("coin-footer");
  coinEl.classList.add("coin");
  iconEl.classList.add("coin-img");
  nameEl.classList.add("coin-name");
  symbolEl.classList.add("coin-symbol");
  currentPriceEl.classList.add("coin-price");

  if (coin.price_change_24h == null) {
    priceChange24hEl.classList.add("not-available");
  } else if (coin.price_change_24h > 0) {
    priceChange24hEl.classList.add("price-up");
  } else {
    priceChange24hEl.classList.add("price-down");
  }

  coinHeaderEl.append(nameEl, symbolEl);
  coinFooterEl.append(currentPriceEl, priceChange24hEl);

  coinEl.append(coinHeaderEl, iconEl, coinFooterEl);

  return coinEl;
};

const updateUI = () => {
  coinsEl.innerHTML = "";

  coins.forEach((coin) => {
    const coinEl = createCoinElement(coin);

    coinsEl.append(coinEl);
  });
};

const startAutoRefresh = () => {
  clearInterval(refreshTimerId);
  refreshTimerId = setInterval(fetchCoinData, REFRESH_INTERVAL_MS);
};

const fetchCoinData = async () => {
  refreshEl.classList.remove("hidden");
  errorEl.classList.add("hidden");

  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10",
    );

    if (!response.ok) {
      throw new Error(`HTTP-Error! Status: ${response.status}`);
    }

    const data = await response.json();

    coins = data;
    refreshEl.classList.add("hidden");

    updateUI();
  } catch (error) {
    console.error(error.message);
    refreshEl.classList.add("hidden");
    errorEl.classList.remove("hidden");
  }
};

const init = () => {
  fetchCoinData();
  startAutoRefresh();
};

init();
