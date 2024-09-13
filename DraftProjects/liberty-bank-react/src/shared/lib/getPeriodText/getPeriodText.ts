import { pluralize } from '../pluralize';
import { PERIOD_TEXT } from './constants';

export const getPeriodText = (periodMonths: number) => {
  const periodYears = Math.floor(periodMonths / 12);
  const months = pluralize(periodMonths, PERIOD_TEXT.months);

  if (periodYears !== 0) {
    const years = pluralize(periodYears, PERIOD_TEXT.years);
    return `${years} (${months})`;
  } else {
    return `${months}`;
  }
};
