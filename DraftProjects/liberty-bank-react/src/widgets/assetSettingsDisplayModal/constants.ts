import { PATH_PAGE } from '@/shared';

export enum AssetValues {
  stock = 'Акции',
  bonds = 'Облигации',
  currency = 'Валюта',
}
export const ASSET_VALUES = [AssetValues.stock, AssetValues.bonds, AssetValues.currency];
export const INPUT_PLACEHOLDER = 'Поиск по тикеру';

export const CURRENT_TICKERS = 'Текущие';
export const POSSIBLE_TICKERS = 'Можно добавить';

export const ASSET_LINK = PATH_PAGE.investmentLK.catalog.start + '/';
