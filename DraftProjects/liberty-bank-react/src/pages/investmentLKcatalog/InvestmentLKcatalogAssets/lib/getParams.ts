import { DEFAULT_HALF_YEAR_PROFIT_TPARAMS } from '../constants';

export const getLocaleDate = (date: Date) => {
  return date.toLocaleDateString().replace(/\./g, '-').split('-').reverse().join('-');
};

export const getParams = () => {
  const date = new Date();
  const till: string = getLocaleDate(date);
  let from: Date | string = date;
  from.setMonth(from.getMonth() - 7);
  from = getLocaleDate(from);

  return {
    ...DEFAULT_HALF_YEAR_PROFIT_TPARAMS,
    from,
    till,
  };
};
