import { TSvgIconNames } from '@/shared';

export interface IExchangeRatesQuery {
  page?: number;
  size?: number;
  city_id?: number;
}

export interface ICurrencyConvertQuery {
  targetCurrencyId: number;
  baseCurrencyId: number;
  baseAmount: number;
}

export interface IExchangeRatesOnlineQuery {
  date: string;
  time: string;
}

export interface ICurrency {
  id: number;
  name: string;
  code: string;
  unit: number;
}

export interface IExchangeCurrency {
  buy: number;
  sale: number;
  svg: TSvgIconNames;
  name: string;
  country: string;
  code: string;
  id: number;
}

export interface ICurrencyExchangeRates {
  id: number;
  name: string;
  code: string;
  buyingRate: number;
  sellingRate: number;
  rateCBRF: number;
  updateAt: string;
  compareCurrencyExchange: 0 | -1 | 1;
}

export interface IBankBranch {
  title: string;
  currencyExchangeRates: ICurrencyExchangeRates[];
  cityName?: string;
  branchId?: string;
  branchNumber?: number;
  branchAddress?: string;
}

export interface IExchangeRates {
  page?: number;
  size?: number;
  totalCount: number;
  items: IBankBranch[];
}
