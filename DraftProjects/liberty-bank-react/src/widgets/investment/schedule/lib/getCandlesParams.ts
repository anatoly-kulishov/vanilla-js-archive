import { CandlesFilter, Interval, SearchCandlesParams } from '../model/types';
import { DEFAULTPARAMS } from '../constants';
import { getLocaleDate } from './formattedData';

export const getCandlesParams = (filter: CandlesFilter, zoom: number = 0): SearchCandlesParams => {
  const till: Date | string = getLocaleDate(new Date());
  let from: Date | string = new Date();
  let interval: Interval;

  switch (filter) {
    case 'Д': {
      from.setDate(from.getDate() - 5);
      interval = '10';
      break;
    }
    case 'М': {
      from.setMonth(from.getMonth() - 1);
      from.setDate(from.getDate() - zoom);
      interval = '24';
      break;
    }
    case 'Г': {
      from.setMonth(from.getMonth() - 11);
      from.setDate(from.getDate() - zoom * 7);
      interval = '7';
      break;
    }
    default: {
      from.setMonth(from.getMonth() - 1);
      interval = '24';
      break;
    }
  }

  from = getLocaleDate(from);

  return {
    ...DEFAULTPARAMS,
    from,
    till,
    interval,
  };
};
