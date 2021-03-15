#! /usr/bin/env node
const prettyjson = require("prettyjson");
const sortCriteriaGenerator = require("./sort-criteria");
const getData = require("./get-data");

const buyCriteriaDesc = sortCriteriaGenerator((item) => item[1].buy, {
  desc: true,
});

const greenText = (text) => `\x1b[32m${text}\x1b[0m`;

async function buildDollarObject() {
  const dollar = {};
  [dollar.rextie, dollar.kambista, dollar.tkambio] = await Promise.all([
    getData({
      url: "https://app.rextie.com/api/v1/fxrates/rate/",
      method: "POST",
      accesorToBuy: (data) => Number(data.fx_rate_buy),
      accesorToSell: (data) => Number(data.fx_rate_sell),
    }),
    getData({
      url:
        "https://api.kambista.com/v1/exchange/calculates?originCurrency=USD&destinationCurrency=PEN&active=S&amount=1",
      accesorToBuy: (data) => data.tc.bid,
      accesorToSell: (data) => data.tc.ask,
    }),
    getData({
      url: "https://tkambio.com/wp-admin/admin-ajax.php",
      method: "POST",
      body: "action=get_exchange_rate",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      accesorToBuy: (data) => Number(data.buying_rate),
      accesorToSell: (data) => Number(data.selling_rate),
    }),
  ]);
  let result = Object.entries(dollar).sort(buyCriteriaDesc);

  result[0][1].buy = greenText(result[0][1].buy);
  result[0][1].sell = greenText(result[0][1].sell);

  result = result.reduce((acc, element) => {
    acc[element[0]] = element[1];
    return acc;
  }, {});
  console.log(
    prettyjson.render(result, { numberColor: "white", keysColor: "cyan" })
  );
  return prettyjson.render(dollar);
}

buildDollarObject();
