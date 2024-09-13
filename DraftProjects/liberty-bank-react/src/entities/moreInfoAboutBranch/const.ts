export const PHONE_NUMBERS = [
  {
    label: 'Обслуживание физических лиц',
    value: ['198', '+7 (922) 1110500', '+7 (922) 1110500'],
  },
  {
    label: 'Обслуживание юридических лиц',
    value: ['7464', '+7 (922) 1110500', '+7 (922) 1110500'],
  },
];

export const SERVICES_BANK: { [key: string]: string } = {
  cashWithdraw: 'Банкомат',
  moneyTransfer: 'Банковские переводы',
  paymentsAcceptance: 'Прием платежей',
  replenishment: 'Пополнение',
  currencyExchange: 'Обмен валюты',
  consultation: 'Консультация',
  credit: 'Кредиты',
  deposit: 'Депозиты',
  insurance: 'Страхование',
};

export const BRANCHES = {
  LOCAL_BRANCH: 'Отделение банка',
  ATM: 'Банкомат',
  TERMINAL: 'Терминал',
};
