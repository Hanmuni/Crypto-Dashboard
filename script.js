const fetchCoinData = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10",
    );

    if (!response.ok) {
      throw new Error(`HTTP-Error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    console.error(error.message);
  }
};

fetchCoinData();
