export const ACCOUNT_TYPE = {
  PAYMENT: 'Текущий счет',
  CREDIT: 'Кредитный счет',
  DEPOSIT: 'Депозитный счет',
} as const;

export const ACCOUNT_STATUS_TEXT = {
  ACTIVE: 'Активный',
  BLOCKED: 'Заблокирован',
  CLOSED: 'Закрыт',
  REQUEST: 'Заявки на открытие счетов',
} as const;
