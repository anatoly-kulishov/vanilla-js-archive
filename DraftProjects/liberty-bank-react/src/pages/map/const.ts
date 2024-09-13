import { IBranchServes, IFilterSchedule, IFilterServices } from './model/types';

export const DEFAULT_FILTER_BRANCH_SERVES: IBranchServes[] = [
  { type: 'all', value: 'Все' },
  { type: 'physical', value: 'Физические лица' },
  { type: 'legal', value: 'Юридические лица' },
];

export const DEFAULT_FILTER_SCHEDULE: IFilterSchedule[] = [
  { type: 'now', isSelected: false, value: 'Работает сейчас' },
  { type: 'weekends', isSelected: false, value: 'Работает в выходные' },
  { type: 'organization', isSelected: false, value: 'В режиме работы организации' },
];

export const DEFAULT_FILTER_SERVICES: IFilterServices[] = [
  { type: 'cashWithdraw', isSelected: false, value: 'Банкомат' },
  { type: 'moneyTransfer', isSelected: false, value: 'Банковские переводы' },
  { type: 'paymentsAcceptance', isSelected: false, value: 'Прием платежей' },
  { type: 'replenishment', isSelected: false, value: 'Пополнение' },
  { type: 'currencyExchange', isSelected: false, value: 'Обмен валюты' },
  { type: 'consultation', isSelected: false, value: 'Консультация' },
  { type: 'credit', isSelected: false, value: 'Кредиты' },
  { type: 'deposit', isSelected: false, value: 'Депозиты' },
  { type: 'insurance', isSelected: false, value: 'Страхование' },
];
