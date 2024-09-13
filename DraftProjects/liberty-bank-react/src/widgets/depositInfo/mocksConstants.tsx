import type { IDepositInfoData, TSvgIconNames } from '@/shared';

type TTransformedDepositCard = {
  id: number;
  title: string;
  description: string;
  icon: TSvgIconNames;
};

export const transformedDepositCard: TTransformedDepositCard[] = [
  {
    id: 1,
    title: 'Вклад в национальной валюте',
    description: 'Без потерь при конвертации',
    icon: 'atm',
  },
  {
    id: 2,
    title: 'Гибкие условия',
    description: 'Вклад от 1 до 36 месяцев',
    icon: 'calendar-blue',
  },
  { id: 3, title: 'Фиксированная ставка', description: 'до 6% годовых', icon: 'percent' },
  { id: 4, title: 'Возможность пополнения', description: 'Предусмотрена', icon: 'selector' },
  {
    id: 5,
    title: 'Капитализация процентов',
    description: 'Для увеличения доходности',
    icon: 'contribution',
  },
  {
    id: 6,
    title: 'Возврат депозита',
    description: 'В любой момент времени, без потери накопленных процентов',
    icon: 'certificate',
  },
];

export const depositDataArray = [
  { id: 1, preposition: 'до', amount: '6,0%', point: 'Процентная ставка' },
  {
    id: 2,
    preposition: 'от',
    amount: '1 000 $ \\ 1 000 €',
    point: 'Минимальная сумма вклада',
  },
  { id: 3, preposition: 'до', amount: '36 месяцев', point: 'Срок вклада' },
  {
    id: 4,
    preposition: 'до',
    amount: '1 000 000 $ \\ 1 000 000 €',
    point: 'Максимальная сумма вклада',
  },
];

export const iconData = {
  dir: 'serviceCard',
};

export const depositProduct: IDepositInfoData = {
  procentBorders: 1,
  id: '1',
  name: 'Liberty+ Детский',
  schemaName: 'RECURRING',
  interestRateEarly: 0,
  isCapitalization: false,
  amountMin: 1000,
  amountMax: 1000000,
  minDurationMonths: 1,
  maxDurationMonths: 36,
  currencyCodes: ['USD', 'EUR'],
  isActive: false,
  isRevocable: false,
  productDetails: 'Подробная информация о депозите',
  autoRenewal: false,
  maxInterestRate: 6,
  tagline: 'Не откладывай жизнь на завтра!',
  depositDetail: [
    { icon: 'atm', header: 'Вклад в национальной валюте', details: ['Без потерь при конвертации'] },
    { icon: 'calendar-blue', header: 'Гибкие условия', details: ['Вклад от 1 до 36 месяцев'] },
    { icon: 'percent', header: 'Фиксированная ставка', details: ['до 6% годовых'] },
    { icon: 'selector', header: 'Возможность пополнения', details: ['Предусмотрена'] },
    {
      icon: 'contribution',
      header: 'Капитализация процентов',
      details: ['Для увеличения доходности'],
    },
    {
      icon: 'certificate',
      header: 'Возврат депозита',
      details: ['В любой момент времени, без потери накопленных процентов'],
    },
  ],
};
