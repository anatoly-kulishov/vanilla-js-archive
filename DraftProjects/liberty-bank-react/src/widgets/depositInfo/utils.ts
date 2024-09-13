import { createSumValue } from '@/entities';
import { IDepositInfoData, formatInterestRate } from '@/shared';

export const createDepositDataArray = ({
  amountMin,
  amountMax,
  currencyCodes,
  maxInterestRate,
  maxDurationMonths,
}: IDepositInfoData) => {
  return [
    {
      id: 1,
      preposition: 'до',
      amount: `${formatInterestRate(maxInterestRate)}%`,
      point: 'Процентная ставка',
    },
    {
      id: 2,
      preposition: 'от',
      amount: createSumValue(amountMin, currencyCodes),
      point: 'Минимальная сумма вклада',
    },
    {
      id: 3,
      preposition: 'до',
      amount: `${maxDurationMonths} месяцев`,
      point: 'Срок вклада',
    },
    {
      id: 4,
      preposition: 'до',
      amount: createSumValue(amountMax, currencyCodes),
      point: 'Максимальная сумма вклада',
    },
  ];
};
