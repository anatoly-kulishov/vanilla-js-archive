import { CandlesFilter, SearchCandlesParams } from './model/types';

export const DEFAULTPARAMS: SearchCandlesParams = {
  'iss.only': 'candles',
  'candles.columns': 'close,begin',
  interval: '24',
};

export const FILTER_BUTTONS: CandlesFilter[] = ['Д', 'М', 'Г'];

export const INFO_POSITION = { x: 30, y: 40 };

export const FIELDS = { price: 'Цена', change: 'Изменение' };
