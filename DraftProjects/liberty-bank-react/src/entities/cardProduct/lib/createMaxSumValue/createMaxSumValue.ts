import { TEXT } from '../../constants';
import { CurrencyCode } from '@/shared';

export const createMaxSumValue = (currency: CurrencyCode[], limits?: number[]): string => {
  return limits?.length
    ? limits
        .map(
          (limit, index) =>
            'до ' +
            limit.toLocaleString('ru-RU', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
              style: 'currency',
              currency: currency[index],
            }),
        )
        .join(' \\ ')
    : TEXT.description.noData;
};
