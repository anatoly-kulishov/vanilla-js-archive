/* eslint-disable camelcase */
import { IAssetsFavorites, TPngImageNames } from '@/shared';

export const CATALOG_TEXT = {
  inputPlaceholderText: 'Название или тикер',
  popularSearchText: 'Чаще всего ищут:',
  lastSearchText: 'Недавние запросы:',
};
export const TABLE_HEADERS_TEXT = {
  stocks: ['Название', 'Цена', 'За день'],
  bonds: ['Название', 'Дата Закрытия', 'Доход', 'Цена'],
  currency: ['Название', 'Цена', 'С начала дня'],
};

export const NAME_STOCKS = new Map([
  ['SBER', 'Сбер Банк'],
  ['LKOH', 'Лукойл'],
  ['ROSN', 'Роснефть'],
  ['NVTK', 'Новатек'],
  ['SIBN', 'Газпром Нефть'],
  ['GAZP', 'Газпром'],
  ['GMKN', 'НорНикель'],
  ['TATN', 'Татнефть'],
  ['PLZL', 'Полюс'],
  ['CHMF', 'Северсталь'],
]);
export const NAME_CURRENCY = new Map([
  ['cny', 'Китайский Юань'],
  ['eur', 'Евро'],
  ['usd', 'Доллар США'],
]);
export const CATALOG_POPULAR: TPngImageNames[] = ['SBER', 'GAZP', 'PLZL', 'usd'];
export const TICKER_URL = '/investment/lk/catalog/';

export const PARAMS = {
  'iss.meta': 'off',
  'iss.only': 'marketdata',
  'marketdata.columns': 'SECID,LASTTOPREVPRICE,LAST,MARKETPRICE,CHANGE',
  marketprice_board: '1',
};

export const TICKERS_IN_BRIEFCASE: IAssetsFavorites = {
  stocks: ['SBER', 'GAZP', 'PLZL', 'LKOH'],
  bonds: ['RU000A1008V9', 'RU000A104JV3', 'RU000A105H98'],
  currency: ['USD'],
};
