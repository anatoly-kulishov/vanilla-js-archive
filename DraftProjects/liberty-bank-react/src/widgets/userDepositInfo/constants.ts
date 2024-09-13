export const USER_DEPOSIT_INFO_TEXT = {
  depositAccountText: '/ Депозитный счет',
  depositAmount: 'Сумма депозита:',
  totalAmount: 'Итоговая сумма:',
  statusLabelText: 'Активный',
  statusLabelTextClosed: 'Закрыт',
  labelCapitalization: 'Капитализация',
  accountNumberText: '№ счета:',
  month: 'мес.',
  depositScheme: 'Схема депозита',
  openDate: 'Дата открытия',
  closeDate: 'Дата закрытия',
  durationOfDeposit: 'Длительность существования',
  interestRate: 'Ставка',
  recall: 'Отозвать',
  replenish: 'Пополнить',
  withdrawFunds: 'Вывести средства',
} as const;

export const DOTS_MENU_USER_DEPOSIT_INFO_TEXT = [
  { text: 'Реквизиты' },
  { text: 'График начисления процентов' },
  { text: 'Информация о пополнении депозита' },
  { text: 'Отказ от пролонгации депозита' },
];

export const depositScheme = {
  FIXED: 'Срочный',
  RECURRING: 'До востребования',
} as const;
