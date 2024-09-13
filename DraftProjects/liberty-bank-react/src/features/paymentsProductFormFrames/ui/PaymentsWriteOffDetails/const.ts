export interface PAYMENT_INFO {
  title: string;
  value: string;
}

export interface PAYMENT_DATA {
  [key: string]: string;
}

export const PAYMENT_INFO_MOCK: PAYMENT_INFO[] = [
  {
    title: 'Назначение платежа',
    value: 'Мобильные операторы',
  },
  {
    title: 'Получатель',
    value: 'МТС',
  },
  {
    title: 'ИНН',
    value: '7788990011',
  },
  {
    title: 'ОГРН',
    value: '3344556677889900',
  },
  {
    title: 'КПП',
    value: '3344556677889900',
  },
  {
    title: 'Номер счёта получателя',
    value: '55556666777788889999',
  },
  {
    title: 'Банк получателя',
    value: 'Филиал "Центральный" банка ВТБ',
  },
  {
    title: 'БИК',
    value: '667788990',
  },
];

export const CARD_INFO: PAYMENT_INFO[] = [
  {
    title: 'Счёт списания',
    value: 'Карта МИР *** 0804',
  },
  {
    title: 'Сумма списания',
    value: '1 600 ₽',
  },
];

export const PAYMENTS_WRITE_MOCK: PAYMENT_DATA = {
  title: 'Номер телефона или лицевой счет',
  number: '24321564',
};
