import { ICreditProductDetails, formatNumberWithSpaces } from '@/shared';

interface IDetailsItem {
  amount: string;
  point: string;
  preposition?: string;
}

export const createArrayFromObject = (creditProduct: ICreditProductDetails): IDetailsItem[] => {
  return [
    {
      amount: `${creditProduct.interestRate}%`,
      point: 'Процентная ставка',
    },
    {
      amount: `${formatNumberWithSpaces(creditProduct.minSum)} RUB`,
      point: 'Минимальная сумма кредита',
      preposition: 'от',
    },
    {
      amount: `${formatNumberWithSpaces(creditProduct.maxSum)} RUB`,
      point: 'Максимальная сумма кредита',
      preposition: 'до',
    },
    {
      amount: `${creditProduct.minPeriodMonths} месяцев`,
      point: 'Минимальный срок кредита',
      preposition: 'от',
    },
    {
      amount: `${creditProduct.maxPeriodMonths} месяцев`,
      point: 'Максимальный срок кредита',
      preposition: 'до',
    },
  ];
};
