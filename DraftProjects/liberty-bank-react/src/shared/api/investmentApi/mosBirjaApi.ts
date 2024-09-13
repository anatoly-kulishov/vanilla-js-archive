import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { urls } from '@/widgets/myAssets/consts';
import { formatNumber } from '@/widgets/myAssets/lib/formatNumber';

interface IStocksMarketData {
  marketdata: {
    columns: string[];
    data: [string, number, number, number, number][];
  };
}

interface IBonds {
  securities: {
    columns: string[];
    data: [string, string, number, string][];
  };
  marketdata: {
    columns: string[];
    data: [number][];
  };
}

interface ICurrencies {
  marketdata: {
    columns: string[];
    data: Currency[];
  };
}

export type Bonds = [string, number, string, number][];
export type Currency = [string, number, number];
export type Stocks = [string, number, string][];

export const mosBirjaApi = createApi({
  reducerPath: 'mscBirjaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: urls.baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  }),

  endpoints: (build) => ({
    getStocks: build.query<(string | number)[][], void>({
      query: () => ({
        url: urls.stocks.url + urls.stocks.params,
      }),
      transformResponse: (response: IStocksMarketData) => {
        const transformedData: (string | number)[][] = response.marketdata.data.map(
          (stock: [string, number, number, number, number]) => {
            const numericChange = stock[4];
            const percentageChange = stock[1];
            const combinedChange = `${formatNumber(numericChange)}₽(${formatNumber(
              percentageChange,
            )}%)`;
            return [stock[0], `${stock[3]}₽`, combinedChange];
          },
        );
        return transformedData;
      },
    }),
    getBonds: build.query<(string | number)[][], void>({
      query: () => ({
        url: urls.bonds.url + urls.bonds.params,
      }),
      transformResponse: (responce: IBonds) => {
        const securitiesData: (string | number)[][] = responce.securities.data;
        const marketData = responce.marketdata.data;
        const combinedData: (string | number)[][] = securitiesData.map(
          (item: (string | number)[], index: number) => {
            const ticker = item[0];
            const bondName = item[1];
            return [`${bondName} (${ticker})`, `${item[2]}%`, item[3], `${marketData[index][0]}₽`];
          },
        );

        return combinedData;
      },
    }),
    getCurrencies: build.query<(string | number)[][], void>({
      query: () => ({
        url: urls.currencies.url + urls.currencies.params,
      }),
      transformResponse: (responce: ICurrencies) => {
        const combinedData = responce.marketdata.data.map((item: [string, number, number]) => {
          const priceDiff = item[2] - item[1];
          const percentage = priceDiff / item[1];
          return [
            item[0],
            `${item[1]}₽`,
            `${formatNumber(priceDiff)}₽ (${percentage.toFixed(4)}%)`,
          ];
        });
        return combinedData;
      },
    }),
  }),
});

export const { useGetStocksQuery, useGetBondsQuery, useGetCurrenciesQuery } = mosBirjaApi;
