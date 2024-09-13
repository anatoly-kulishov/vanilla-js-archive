export const TEXT = {
  title: ['AO «Liberty Bank» ', 'Заявление о закрытии брокерского счета'],
  cancellation: 'Отмена',
  sign: 'Подписать',
  download: 'Скачать PDF',
};

export const REQUISITES = [
  'Дата',
  'Клиент',
  'Серия и номер паспорта',
  'Кем выдан',
  'Код подразделения',
  'Дата выдачи',
  'Брокерский счет',
  'Депозитарный счет',
];

export const CHECKBOX_TEXT = [
  'Я подтверждаю, что ознакомлен с ',
  'Порядком закрытия брокерского счета',
  ' и ограничением открытия нового брокерского счета не ранее 48 часов с момента закрытия текущего счета ',
];

// export const USER_ID = '033140e9-ea0a-40c3-a738-060283531147';

export const BROKER_ID = 'a4b1d386-64b3-423a-bfc8-03867300ba6a';

export const URL_PDF = `http://172.17.1.79:30303/investment/api/v1/customers/broker-accounts/${BROKER_ID}`;
export const PDF_NAME = 'APPLICATION_FOR_CLOSURE';
