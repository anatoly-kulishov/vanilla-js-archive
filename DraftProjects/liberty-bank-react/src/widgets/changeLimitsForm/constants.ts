export const BUTTON_TEXT = 'Подтвердить';

export const LABELS = {
  choseLimitType: 'Выберите тип лимита',
  choseDuration: 'Выберите тип лимита',
  inputLimits: 'Введите ограничения',
  transactions: 'Безналичные операции',
  withdrawal: 'Снятие наличных в день',
  day: 'день',
  month: 'месяц',
  periodMonths: 'Срок кредита',
  monthlyIncome: 'Среднемесячный доход',
  amount: 'Сумма кредита',
} as const;

export const PLACEHOLDERS = {
  dailyOperationsQuantity: 'Количество операций в день',
  monthlyOperationsQuantity: 'Количество операций в месяц',
  maxOperationAmount: 'Сумма одной операции',
  maxSumDay: 'Сумма операций в день',
  maxSumMonth: 'Сумма операций в месяц',
  maxCashDay: 'Сумма операций',
} as const;

export const ERROR_MESSAGES = {
  required: 'Поле обязательно для заполнения',
  allRequired: 'Все поля обязательны для заполнения',
  maxOperationDay: 'Превышено максимальное количество операций в день',
  maxOperationMonth: 'Превышено максимальное количество операций в месяц',
  maxSumOperation: 'Превышено максимальная сумма одной операции',
  maxSumDay: 'Превышена максимальная сумма операций в день',
  maxSumMonth: 'Превышена максимальная сумма операций в месяц',
  maxCashDay: 'Превышена максимальная сумма снятия наличных в день',
} as const;
