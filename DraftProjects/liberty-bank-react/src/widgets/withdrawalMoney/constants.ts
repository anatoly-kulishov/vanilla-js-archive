import { ITransferAccountCard } from '@/entities';

export const TRANSFER_ACCOUNT_TITLE_FROM = 'Выберете счет с которого хотите вывести средства';
export const TRANSFER_ACCOUNT_TITLE_IN = 'Выберете счет куда хотите вывести средства';
export const TRANSFER_BUTTON = 'Перевести средства';

export const TRANSFER_ACCOUNTS: ITransferAccountCard[] = [
  {
    accountTitle: 'Брокерский счет',
    title: '(Брокерский счет 1)',
    funds: 0,
  },
  {
    accountTitle: 'Брокерский счет',
    title: '(Брокерский счет 2)',
    funds: 1000,
  },
  {
    accountTitle: 'Брокерский счет',
    title: '(Брокерский счет 3)',
    funds: 5000,
  },
  {
    accountTitle: 'Брокерский счет',
    title: '(Брокерский счет 4)',
    funds: 10000000,
  },
];
export const TRANSFER_ACCOUNTS_2: ITransferAccountCard[] = [
  {
    accountTitle: 'Дебетовая карта',
    title: '(Дебетовая карта 1)',
    funds: 0,
  },
  {
    accountTitle: 'Дебетовая карта',
    title: '(Дебетовая карта 2)',
    funds: 1000,
  },
  {
    accountTitle: 'Дебетовая карта',
    title: '(Дебетовая карта 3)',
    funds: 5000,
  },
  {
    accountTitle: 'Дебетовая карта',
    title: '(Дебетовая карта 4)',
    funds: 10000000,
  },
];
