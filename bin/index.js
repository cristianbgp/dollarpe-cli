#! /usr/bin/env node
const fetch = require("node-fetch");
const prettyjson = require("prettyjson");
const sortCriteriaGenerator = require("./sort-criteria");

async function getRextieData() {
  const response = await fetch("https://app.rextie.com/api/v1/fxrates/rate/", {
    method: "POST"
  });
  const data = await response.json();
  return { buy: Number(data.fx_rate_buy), sell: Number(data.fx_rate_sell) };
}

async function getKambistaData() {
  const response = await fetch(
    "https://api.kambista.com/v1/exchange/calculates?originCurrency=USD&destinationCurrency=PEN&active=S&amount=1"
  );
  const data = await response.json();
  return { buy: data.tc.bid, sell: data.tc.ask };
}

const buyCriteriaDesc = sortCriteriaGenerator(item => item[1].buy, {
  desc: true
});

async function buildDollarObject() {
  const dollar = {};
  dollar.rextie = await getRextieData();
  dollar.kambista = await getKambistaData();
  const result = Object.fromEntries(
    Object.entries(dollar).sort(buyCriteriaDesc)
  );
  console.log(
    prettyjson.render(result, { numberColor: "white", keysColor: "cyan" })
  );
  return prettyjson.render(dollar);
}

buildDollarObject();
