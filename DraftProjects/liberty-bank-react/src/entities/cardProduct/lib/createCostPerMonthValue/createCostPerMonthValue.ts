import { CurrencyCode } from '@/shared';
import { TEXT } from '../../constants';

export const createCostPerMonthValue = (
  costPerMonth: number[],
  currency: CurrencyCode[],
): string => {
  return costPerMonth.length && currency.length
    ? costPerMonth
        .map((value, index) =>
          value.toLocaleString('ru-RU', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: currency[index],
          }),
        )
        .join(' \\ ')
    : TEXT.description.noData;
};
