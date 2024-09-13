import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ICurrencyConvertQuery, ICurrencyExchangeRates, IExchangeRatesOnlineQuery } from './types';
import { CURRENCY_SERVICE } from './constants';
import { URLS } from '../../constants';

export const currencyServiceApi = createApi({
  reducerPath: 'currencyService',
  baseQuery: fetchBaseQuery({
    baseUrl: URLS.CURRENCY,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  endpoints: (build) => ({
    exchangeRates: build.query<ICurrencyExchangeRates[], IExchangeRatesOnlineQuery>({
      query: (queryParams) => ({
        url: CURRENCY_SERVICE.exchangeRates,
        params: queryParams,
      }),
    }),
    setCurrencyAmount: build.mutation<{ targetAmount: number }, ICurrencyConvertQuery>({
      query: (queryParams) => ({
        url: CURRENCY_SERVICE.currencyConverter,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: queryParams,
      }),
    }),
  }),
});

export const { useLazyExchangeRatesQuery, useSetCurrencyAmountMutation } = currencyServiceApi;
