import { IImageProps } from '@/shared';

export enum ACCOUNT_STATUS {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  CLOSED = 'CLOSED',
  REQUEST = 'REQUEST',
}

export enum FILTER {
  ALL = 'Все',
  RUB = 'RUB',
  USD = 'USD',
  EUR = 'EUR',
}

export const TEXT = {
  openedAccountLabel: 'Открытые счета',
  requestAccountLabel: 'Заявки на открытие счетов',
  closedAccountLabel: 'Закрытые счета',
  blockedAccountLabel: 'Заблокированные счета',
  infoFrameTitle: 'На данный момент у Вас нет открытых счетов',
  infoFrameBtn: 'Открыть счет',
};

export const NO_ACCOUNTS_ICON: IImageProps = {
  image: 'dont-open-bill',
  width: '172',
  height: '216',
};

export const FILTER_TEXT = Object.values(FILTER);
