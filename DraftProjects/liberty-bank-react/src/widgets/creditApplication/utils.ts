import { createSumValue } from '@/entities';
import { ICreditProductDetails, formatInterestRate } from '@/shared';

export const createCreditDataArray = (creditProduct: ICreditProductDetails) => {
  return [
    {
      id: 1,
      amount: `${formatInterestRate(creditProduct.interestRate)}%`,
      point: 'Процентная ставка',
    },
    {
      id: 2,
      preposition: 'от',
      amount: createSumValue(creditProduct.minSum, creditProduct.currencyCodeList),
      point: 'Минимальная сумма кредита',
    },
    {
      id: 3,
      preposition: 'от',
      amount: `${creditProduct.minPeriodMonths} до ${creditProduct.maxPeriodMonths} месяцев`,
      point: 'Срок кредита',
    },
    {
      id: 4,
      preposition: 'до',
      amount: createSumValue(creditProduct.maxSum, creditProduct.currencyCodeList),
      point: 'Максимальная сумма кредита',
    },
  ];
};
