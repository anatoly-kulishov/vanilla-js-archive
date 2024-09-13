export const urls = {
  baseUrl: 'https://iss.moex.com/iss/engines/',
  stocks: {
    url: 'stock/markets/shares/boards/TQBR/securities.json?iss.meta=off&',
    params:
      'iss.only=marketdata&marketdata.marketprice_board=1&sort_column=ISSUECAPITALIZATION&sort_order=desk&marketdata.first=5&marketdata.columns=SECID,LASTTOPREVPRICE,LAST,MARKETPRICE,CHANGE',
  },
  bonds: {
    url: 'stock/markets/bonds/boards/TQCB/securities.json?iss.meta=off&iss.only=securities,marketdata&securities.columns=',
    params:
      'SECID,SHORTNAME,YIELDATPREVWAPRICE,MATDATE&marketdata.columns=VALUE&securities=RU000A1008V9,RU000A102UZ5,RU000A103D37,RU000A104V00,RU000A104ZK',
  },
  currencies: {
    url: 'currency/markets/index/securities.json?iss.meta=off&',
    params:
      'marketdata.columns=SECID,OPENVALUE,CURRENTVALUE&iss.only=marketdata&securities=CNYFIX,EURFIX,USDFIX',
  },
};

export const cols = {
  Акции: ['Наименование', 'Цена', 'Изменение цены', 'В наличии'],
  Облигации: ['Наименование', 'Доходность', 'Срок погашения', 'Цена', 'В наличии'],
  Валюта: ['Наименование', 'Цена', 'Изменение цены', 'В наличии'],
};

export const availableAssetsCount = {
  stocks: [10, 15, 10, 5, 2],
  bonds: [10, 15, 10, 5, 2],
  currency: [4563, 1237, 2378],
};
