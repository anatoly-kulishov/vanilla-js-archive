import { AccountStatus, CurrencyType } from './types';
import { StatusLabelType, TSvgIconNames } from '@/shared';

export const TEXT = {
  LABEL: {
    MAIN: 'Основной счет',
    ACTIVE: 'Активный',
    BLOCKED: 'Заблокирован',
    CLOSED: 'Закрыт',
    REQUEST: 'Заявки на открытие счетов',
  },
  TYPE: {
    PAYMENT: 'Текущий счет',
    CREDIT: 'Кредитный счет',
    DEPOSIT: 'Депозитный счет',
  },
  noData: 'Нет данных',
};

export const ACCOUNT_STATUS_TYPE: Record<AccountStatus, StatusLabelType> = {
  ACTIVE: 'success',
  BLOCKED: 'warning',
  CLOSED: 'error',
  REQUEST: 'info',
};

export const CURRENCY_ICON: Record<CurrencyType, TSvgIconNames> = {
  RUB: 'ruble',
  USD: 'dollar',
  EUR: 'euro',
};
