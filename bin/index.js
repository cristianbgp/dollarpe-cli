#! /usr/bin/env node
const prettyjson = require("prettyjson");
const sortCriteriaGenerator = require("./sort-criteria");
const getData = require("./get-data");

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
  dollar.tkambio = await getData({
    url: "https://tkambio.com/wp-admin/admin-ajax.php?action=get_tipo_cambio",
    method: "POST",
    accesorToBuy: data => Number(data.sell_type_change),
    accesorToSell: data => Number(data.buy_type_change)
  });
  const result = Object.entries(dollar)
    .sort(buyCriteriaDesc)
    .reduce((acc, element) => {
      acc[element[0]] = element[1];
      return acc;
    }, {});
  console.log(
    prettyjson.render(result, { numberColor: "white", keysColor: "cyan" })
  );
  return prettyjson.render(dollar);
}

buildDollarObject();
