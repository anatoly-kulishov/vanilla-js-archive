export const BACK = 'Назад';
export const TITLE = 'Закрытие брокерского счета';

export const TABLE_TITLE = 'На вашем счете имеются следующие активы';

export const BUTTON_TEXT = 'Далее';

export const STOCKS_SUM = 'Сумма всех акций';

export const BONDS_SUM = 'Сумма всех облигаций';

export const MOCK_DATA = [
  ['Тип актива', 'Актив', 'Цена', 'Валюта', 'Количество', 'Сумма'],
  ['Акция', 'Газпром', 165, 'RUB ', 1],
  ['Облигация', 'МТС', 200, 'RUB ', 5],
  ['Акция', 'Сбер', 138, 'RUB ', 2],
  ['Облигация', 'СПМК БО-02', 56, 'RUB ', 17],
  ['Валюта', 'USD', 90, 'RUB ', 100],
  ['Облигация', 'Роснано', 900, 'RUB ', 1],
  ['Акция', 'Тинькофф', 100, 'RUB ', 2],
  ['Облигация', 'ЗСД-2', 250, 'RUB ', 6],
  ['Акция', 'Яндекс', 150, 'RUB ', 3],
  ['Облигация', 'М.Видео выпуск 3', 167, 'RUB ', 5],
  ['Облигация', 'МФК ЦФП выпуск 1', 199, 'RUB ', 5],
  ['Облигация', 'ОФЗ', 160, 'RUB ', 10],
];

export const MOCK_HEAD = ['type', 'asset', 'price', 'currency', 'amount', 'sum'];

export const COLUMN_NAMES: Record<string, string> = {
  type: 'Тип актива',
  asset: 'Актив',
  price: 'Цена',
  currency: 'Валюта',
  amount: 'Количество',
  sum: 'Сумма',
};

export const MOCK_CONTENT = [
  {
    type: 'Акция',
    asset: 'Газпром',
    price: 165,
    currency: 'RUB ',
    amount: 5,
  },
  {
    type: 'Облигация',
    asset: 'МТС',
    price: 200,
    currency: 'RUB ',
    amount: 2,
  },
  {
    type: 'Акция',
    asset: 'Сбер',
    price: 138,
    currency: 'RUB ',
    amount: 17,
  },
  {
    type: 'Облигация',
    asset: 'СПМК БО-02',
    price: 56,
    currency: 'RUB ',
    amount: 100,
  },
  {
    type: 'Валюта',
    asset: 'USD',
    price: 90,
    currency: 'RUB ',
    amount: 1,
  },
  {
    type: 'Облигация',
    asset: 'Роснано',
    price: 900,
    currency: 'RUB ',
    amount: 2,
  },
  {
    type: 'Акция',
    asset: 'Тинькофф',
    price: 100,
    currency: 'RUB ',
    amount: 6,
  },
  {
    type: 'Облигация',
    asset: 'ЗСД-2',
    price: 250,
    currency: 'RUB ',
    amount: 6,
  },
  {
    type: 'Акция',
    asset: 'Яндекс',
    price: 150,
    currency: 'RUB ',
    amount: 4,
  },
  {
    type: 'Облигация',
    asset: 'М.Видео выпуск 3',
    price: 167,
    currency: 'RUB ',
    amount: 5,
  },
  {
    type: 'Облигация',
    asset: 'МФК ЦФП выпуск 1',
    price: 199,
    currency: 'RUB ',
    amount: 5,
  },
  {
    type: 'Облигация',
    asset: 'ОФЗ',
    price: 160,
    currency: 'RUB ',
    amount: 10,
  },
];

export const TABLE_DATA = {
  content: MOCK_CONTENT,
  head: MOCK_HEAD,
};

export const MOCK_CONTENT_SHORT = [
  {
    type: 'Акция',
    asset: 'Газпром',
    price: 165,
    currency: 'RUB ',
    amount: 5,
  },
  {
    type: 'Облигация',
    asset: 'МТС',
    price: 200,
    currency: 'RUB ',
    amount: 2,
  },
];
