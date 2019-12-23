#! /usr/bin/env node
const fetch = require("node-fetch");
const prettyjson = require("prettyjson");
const sortCriteriaGenerator = require("./sort-criteria");

async function getData({ url, method = "GET", accesorToBuy, accesorToSell }) {
  const response = await fetch(url, {
    method: method
  });
  const data = await response.json();
  return { buy: accesorToBuy(data), sell: accesorToSell(data) };
}

const buyCriteriaDesc = sortCriteriaGenerator(item => item[1].buy, {
  desc: true
});

async function buildDollarObject() {
  const dollar = {};
  dollar.rextie = await getData({
    url: "https://app.rextie.com/api/v1/fxrates/rate/",
    method: "POST",
    accesorToBuy: data => Number(data.fx_rate_buy),
    accesorToSell: data => Number(data.fx_rate_sell)
  });
  dollar.kambista = await getData({
    url:
      "https://api.kambista.com/v1/exchange/calculates?originCurrency=USD&destinationCurrency=PEN&active=S&amount=1",
    accesorToBuy: data => data.tc.bid,
    accesorToSell: data => data.tc.ask
  });
  const result = Object.fromEntries(
    Object.entries(dollar).sort(buyCriteriaDesc)
  );
  console.log(
    prettyjson.render(result, { numberColor: "white", keysColor: "cyan" })
  );
  return prettyjson.render(dollar);
}

buildDollarObject();
