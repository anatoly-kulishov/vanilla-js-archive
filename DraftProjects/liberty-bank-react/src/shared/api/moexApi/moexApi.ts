import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  transformCandles,
  transformHalfYearProfit,
  transformTicker,
  transformTickers,
} from './utils/transformResponse';
import {
  ITickersParams,
  ITickersFormatted,
  ICandlesParams,
  ICandlesFormatted,
  IHalfYearProfitParams,
} from './types';
import {
  BASE_URL,
  CATALOG_URLS,
  transformBondsData,
  transformCurrencyData,
  transformStocksData,
} from './constants';

export interface IPlayer {
  name: string;
  age: number;
  price: number;
  position: string;
  img: string;
  id: string;
}
export const moexApi = createApi({
  reducerPath: 'moexApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getStocks: builder.query<string[][], void>({
      query: () => ({
        url: CATALOG_URLS.stocks,
      }),
      transformResponse: transformStocksData,
    }),
    getBonds: builder.query<string[][], void>({
      query: () => ({
        url: CATALOG_URLS.bonds,
      }),
      transformResponse: transformBondsData,
    }),
    getCurrency: builder.query<string[][], void>({
      query: () => ({
        url: CATALOG_URLS.currency,
      }),
      transformResponse: transformCurrencyData,
    }),
    getTickers: builder.query<ITickersFormatted, ITickersParams>({
      query: (params) => ({
        url: '/stock/markets/shares/securities.json',
        params,
      }),
      transformResponse: transformTickers,
    }),
    getTicker: builder.query<number, ITickersParams>({
      query: (params) => ({
        url: '/stock/markets/shares/securities.json',
        params,
      }),
      transformResponse: transformTicker,
    }),
    getCandles: builder.query<ICandlesFormatted, ICandlesParams>({
      query: ({ params, activeTicker }) => ({
        url: `/stock/markets/shares/securities/${activeTicker}/candles.json`,
        params,
      }),
      keepUnusedDataFor: 600,
      transformResponse: transformCandles,
    }),
    getHalfYearProfit: builder.query<number, IHalfYearProfitParams>({
      query: ({ params, ticker }) => ({
        url: `/stock/markets/shares/securities/${ticker}/candles.json`,
        params,
      }),
      transformResponse: transformHalfYearProfit,
    }),
  }),
});
export const {
  useGetStocksQuery,
  useGetBondsQuery,
  useGetCurrencyQuery,
  useGetTickersQuery,
  useGetTickerQuery,
  useGetCandlesQuery,
  useGetHalfYearProfitQuery,
  usePrefetch,
} = moexApi;
