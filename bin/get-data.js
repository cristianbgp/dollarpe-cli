const fetch = require("node-fetch");

async function getData({ url, method = "GET", accesorToBuy, accesorToSell }) {
  const response = await fetch(url, {
    method: method
  });
  const data = await response.json();
  return { buy: accesorToBuy(data), sell: accesorToSell(data) };
}

module.exports = getData;
