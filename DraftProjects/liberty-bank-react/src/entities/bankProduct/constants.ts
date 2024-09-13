import { PATH_PAGE } from '@/shared';

export const TEXT = {
  checkoutButton: 'Оформить',
  viewMore: 'Показать больше',
  interestRate: 'Процентная ставка',
  amountMinDeposit: 'Минимальная сумма вклада',
  amountMinCredit: 'Минимальная сумма кредита',
  before: 'до',
  months: 'месяцев',
  maxDurationMonthsDeposit: 'Срок вклада',
  maxDurationMonthsCredit: 'Срок кредита',
  from: 'от',
  percentSign: '%',
  noData: 'Нет данных',
  tooltipText: 'Оформлено максимальное количество заявок',
};

export const CURRENCIES = {
  RUB: 'ruble',
  USD: 'dollar',
  EUR: 'euro',
};

export const APPLICATION_PATH = {
  credit: PATH_PAGE.creditForm,
  deposit: PATH_PAGE.depositApplication,
} as const;

export const INFO_PATH = {
  credit: PATH_PAGE.creditInformation,
  deposit: PATH_PAGE.depositInformation,
} as const;
