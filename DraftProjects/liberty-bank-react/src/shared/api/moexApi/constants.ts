import { formatNumber } from '@/shared/lib/formatNumber';

export const BASE_URL = 'https://iss.moex.com/iss/engines';
export const MOEX_FILTERS_URLS = {
  stocksColumns: 'marketdata.columns=SECID,LASTTOPREVPRICE,LAST,MARKETPRICE,CHANGE',
  bondsSecurities:
    'securities=RU000A1008V9,RU000A102UZ5,RU000A103D37,RU000A104V00,RU000A104ZK2,RU000A105H98,RU000A107UB5,RU000A1032X5,RU000A1078H1,RU000A104JV3',
};
export const CATALOG_URLS = {
  stocks: `/stock/markets/shares/boards/TQBR/securities.json?iss.meta=off&iss.only=marketdata&marketdata.marketprice_board=1&sort_column=ISSUECAPITALIZATION&sort_order=desk&marketdata.first=10&${MOEX_FILTERS_URLS.stocksColumns}`,
  bonds: `/stock/markets/bonds/boards/TQCB/securities.json?iss.meta=off&iss.only=securities,marketdata&securities.columns=SECID,SHORTNAME,YIELDATPREVWAPRICE,MATDATE&marketdata.columns=VALUE&${MOEX_FILTERS_URLS.bondsSecurities}`,
  currency:
    '/currency/markets/index/securities.json?iss.meta=off&marketdata.columns=SECID,OPENVALUE,CURRENTVALUE&iss.only=marketdata&securities=CNYFIX,EURFIX,USDFIX',
};

interface IMarketdata {
  columns: string[];
  data: string[][];
}
interface ISecurities {
  columns: string[][];
  data: string[][];
}
interface IData {
  marketdata: IMarketdata;
  securities: ISecurities;
}
export function transformStocksData(data: IData): string[][] {
  if (data) {
    return data.marketdata.data;
  } else return [];
}
export function transformBondsData(data: IData): string[][] {
  if (data) {
    const currentPrices = data.marketdata.data;
    const otherInfo = data.securities.data;
    const bondsData: string[][] = [];
    for (let i = 0; i < 10; i++) {
      bondsData.push([
        otherInfo[i][0],
        otherInfo[i][1],
        otherInfo[i][2],
        otherInfo[i][3],
        currentPrices[i][0],
      ]);
    }
    return bondsData;
  } else return [];
}
export function transformCurrencyData(data: IData): string[][] {
  if (data) {
    const currencyData: string[][] = [];
    data.marketdata.data.map((el) => {
      const dif = formatNumber(Number(el[2]) - Number(el[1]));
      const difPercent = formatNumber(((Number(el[2]) - Number(el[1])) / Number(el[2])) * 100);
      const isPlus = Number(dif) > 0;
      currencyData.push([
        el[0].substring(0, 3),
        `${el[1]}`,
        `${isPlus ? '+' : ''}${dif}₽ (${difPercent}%)`,
      ]);
    });
    return currencyData;
  } else return [];
}
