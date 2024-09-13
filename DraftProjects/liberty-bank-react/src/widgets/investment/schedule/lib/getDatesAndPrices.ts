import { Candles, CandlesFilter, SheduleSize } from '../model/types';
import { getFormattedDate } from './formattedData';

export const getDatesAndPrices = (
  candles: Candles,
  filter: CandlesFilter,
  size: SheduleSize,
  zoom: number,
): [number[], string[]] => {
  let prices: number[] = candles.map((item) => item[0]);
  let dates: string[] = candles.map((item) => item[1]);
  let gap: number = 1;
  const gapSmallMap = {
    small: 5,
    big: 11,
  };

  if (filter === 'Д') {
    const candlesSlice = candles
      .slice(dates.length - 84 - zoom * 1)
      .filter(
        (item, index, arr) => +item[1][14] % 3 === 0 || index === arr.length - 1 || index === 0,
      );
    prices = candlesSlice.map((item) => item[0]);
    dates = candlesSlice.map((item) => item[1]);
    gap =
      size === 'small'
        ? Math.ceil(candlesSlice.length / gapSmallMap[size])
        : Math.ceil(dates.length / gapSmallMap[size]);
  } else {
    gap = Math.ceil(dates.length / gapSmallMap[size]);
  }

  // switch (filter) {
  //   case 'Д': {
  //     const candlesSlice = candles
  //       .slice(dates.length - 84 - zoom * 1)
  //       .filter(
  //         (item, index, arr) => +item[1][14] % 3 === 0 || index === arr.length - 1 || index === 0,
  //       );
  //     prices = candlesSlice.map((item) => item[0]);
  //     dates = candlesSlice.map((item) => item[1]);
  //     gap = size === 'small' ? Math.ceil(candlesSlice.length / gapSmallMap[size]) : Math.ceil(dates.length / gapSmallMap[size]);
  //     break;
  //   }
  //   case 'М': {
  //     gap = Math.ceil(dates.length / gapSmallMap[size]);
  //     break;
  //   }
  //   case 'Г': {
  //     gap = Math.ceil(dates.length / gapSmallMap[size]);
  //     break;
  //   }
  // }

  dates = dates
    .filter((_item, index, arr) => index % gap === 0 || index === arr.length - 1)
    .map((item) => getFormattedDate(item, filter));
  return [prices, dates];
};
