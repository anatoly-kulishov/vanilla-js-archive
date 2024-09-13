import { useEffect, useState } from 'react';
import { Candles, CandlesFilter, SheduleSize } from '../model/types';
import { getDatesAndPrices } from './getDatesAndPrices';

export function useCandles(
  candles: Candles,
  filter: CandlesFilter,
  size: SheduleSize = 'small',
  zoom: number = 0,
): [string[], number[]] {
  const [dates, setDates] = useState<string[]>([]);
  const [prices, setPrices] = useState<number[]>([]);

  useEffect(() => {
    const [priceRange, datesRange] = getDatesAndPrices(candles, filter, size, zoom);
    setPrices(priceRange);
    setDates(datesRange);
  }, [candles, zoom]);

  return [dates, prices];
}
