import { ICandlesResponse, ITickersResponse } from '../types';

export const transformTickers = (response: ITickersResponse) => {
  return response.marketdata.data.map((item) => {
    return {
      name: item[0],
      changedValueInPercent: item[1],
      currentValue: item[2] || item[3],
      changedValue: item[4],
      change: '',
    };
  });
};

export const transformTicker = (response: ITickersResponse): number => {
  const price = response.marketdata.data[0][0] || response.marketdata.data[0][1];
  return price as number;
};

export const transformCandles = (response: ICandlesResponse) => {
  return response.candles.data;
};

export const transformHalfYearProfit = (response: ICandlesResponse): number => {
  const data = response.candles.data;
  if (data[0]) {
    return (data[data.length - 1][0] / data[0][0]) * 100 - 100;
  } else {
    return 0;
  }
};
