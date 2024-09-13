/* eslint-disable camelcase */
import { PATH_PAGE } from '@/shared';
import { AssetOperation, BalanceOperation } from './model/types';

export const TITLE: string = 'История операций';
export const STATEMENT: string = 'Выписка';
export const COMISSION: string = 'Комиссия';
export const EMPTY_AMOUNT: string = '—';
export const ASSET_PATH: string = PATH_PAGE.investmentLK.catalog.start + '/';

export const ASSETS_BUTTONS: string[] = ['Все события', 'Покупка', 'Продажа'];
export const ASSETS_COLUMNS: string[] = [
  'Дата и время',
  'Тикер',
  'Операция',
  'Количество',
  'Сумма',
];
export const ASSETS_OPERATIONS: AssetOperation[] = [
  {
    moex_id: 'YNDX',
    intention: 1,
    amount: 5,
    price: 3985.6,
    comission: 200.0,
    created: '09.04.2024 20:34:37',
  },
  {
    moex_id: 'GAZP',
    intention: 2,
    amount: 2,
    price: 1600,
    comission: 22.0,
    created: '09.04.2024 20:34:37',
  },
];

export const BALANCE_BUTTONS: string[] = ['Все события', 'Пополнение', 'Вывод'];
export const BALANCE_COLUMNS: string[] = ['Дата и время', 'Операция', 'Сумма'];
export const BALANCE_OPERATIONS: BalanceOperation[] = [
  {
    transaction_id: 'dc9e2072-5d22-11ee-8c99-0242ac120001',
    transaction_type: 'Пополнение',
    total: 22381,
    date_time: '09.04.2024 20:34:37',
  },
  {
    transaction_id: 'dc9e2072-5d22-11ee-8c99-0242ac120002',
    transaction_type: 'Вывод',
    total: 6720,
    date_time: '09.04.2024 20:34:37',
  },
  {
    transaction_id: 'dc9e2072-5d22-11ee-8c99-0242ac120003',
    transaction_type: 'Пополнение',
    total: 1534,
    date_time: '09.04.2024 20:34:37',
  },
  {
    transaction_id: 'dc9e2072-5d22-11ee-8c99-0242ac120004',
    transaction_type: 'Вывод',
    total: 13677,
    date_time: '09.04.2024 20:34:37',
  },
];
