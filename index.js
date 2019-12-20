const fetch = require("isomorphic-unfetch");
const prettyjson = require("prettyjson");

async function getRextieData() {
  const response = await fetch("https://app.rextie.com/api/v1/fxrates/rate/", {
    method: "POST"
  });
  const data = await response.json();
  return data;
}

async function buildDollarObject(params) {
  const dollar = {};
  const rextieData = await getRextieData();
  dollar.rextie = {
    buy: rextieData.fx_rate_buy,
    sell: rextieData.fx_rate_sell
  };
  console.log(prettyjson.render(dollar));
  return prettyjson.render(dollar);
}

buildDollarObject();
