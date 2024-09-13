import { CurrencyCode } from '@/shared';
import { TEXT } from '../constants';

export const createSumValue = (minSum: number, currency: CurrencyCode[]): string => {
  return currency.length
    ? currency
        .map((value) =>
          minSum.toLocaleString('ru-RU', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: value,
          }),
        )
        .join(' \\ ')
        .replace(/\u00A0/g, ' ')
    : TEXT.noData;
};
