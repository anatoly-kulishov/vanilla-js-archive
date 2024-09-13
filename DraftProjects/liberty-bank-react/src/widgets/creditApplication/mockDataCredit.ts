import { createSumValue } from '@/entities';
import { ICreditProductDetails } from '@/shared';

export const creditProductMock: ICreditProductDetails = {
  calculationMode: 'ANNUITY',
  creditDetails: [
    {
      details: ['Для этого кредита нужны поручители'],
      header: 'Наличие поручителей',
      icon: 'people',
    },
  ],
  currencyCodeList: ['RUB'],
  deliveryInCash: true,
  earlyRepayment: true,
  gracePeriodMonths: 2,
  id: '2',
  interestRate: 15.5,
  maxPeriodMonths: 12,
  maxSum: 3000000,
  minPeriodMonths: 12,
  minSum: 10000,
  name: 'Liberty Срочный',
  needGuarantees: false,
  needIncomeDetails: true,
  rateIsAdjustable: false,
  tagline: 'Не откладывай жизнь на завтра!',
};

export const creditDataArrayMock = [
  {
    id: 1,
    amount: `${creditProductMock.interestRate.toString().replace('.', ',')}%`,
    point: 'Процентная ставка',
  },
  {
    id: 2,
    preposition: 'от',
    amount: createSumValue(creditProductMock.minSum, creditProductMock.currencyCodeList),
    point: 'Минимальная сумма кредита',
  },
  {
    id: 3,
    preposition: 'от',
    amount: `${creditProductMock.minPeriodMonths} до ${creditProductMock.maxPeriodMonths} месяцев`,
    point: 'Срок кредита',
  },
  {
    id: 4,
    preposition: 'до',
    amount: createSumValue(creditProductMock.maxSum, creditProductMock.currencyCodeList),
    point: 'Максимальная сумма кредита',
  },
];
