const fetch = require("node-fetch");

async function getData({
  url,
  method = "GET",
  body,
  headers,
  accesorToBuy,
  accesorToSell,
}) {
  const response = await fetch(url, {
    method,
    headers,
    body,
  });
  const data = await response.json();
  return { buy: accesorToBuy(data), sell: accesorToSell(data) };
}

module.exports = getData;
