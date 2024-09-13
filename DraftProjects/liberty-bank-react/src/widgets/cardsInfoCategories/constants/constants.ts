import { PATH_PAGE } from '../../../shared';
import { LinkCardInfo } from '../model/types';

type CardStatus = 'ACTIVE' | 'BLOCKED' | 'CLOSED';

export enum CardAction {
  CLOSE = 'CLOSE',
  BLOCK = 'BLOCK',
  UNBLOCK = 'UNBLOCK',
}

export const ACTIVE_CARD_INFO: LinkCardInfo[] = [
  {
    icon: 'info-account',
    name: 'Детали счета',
  },
  {
    icon: 'info-rate',
    name: 'Тариф',
    link: PATH_PAGE.myCardTariffs,
  },
  {
    icon: 'info-limits',
    name: 'Лимиты по карте',
    link: PATH_PAGE.changeCardLimits,
  },
];

export const CLOSED_CARD_INFO: LinkCardInfo[] = [
  {
    icon: 'info-account',
    name: 'Детали счета',
  },
];

export const ACTIVE_CARD_ACTIONS: LinkCardInfo[] = [
  {
    icon: 'actions-pin',
    name: 'Изменить пин-код',
    link: PATH_PAGE.myCardChangePIN,
  },
  {
    icon: 'actions-reissue',
    name: 'Перевыпустить карту',
    link: PATH_PAGE.reissueCard,
  },
  {
    icon: 'actions-tick',
    name: 'Сделать карту основной',
    hasSwitcher: true,
  },
  {
    icon: 'actions-extra',
    name: 'Оформить дополнительную карту',
  },
  {
    icon: 'actions-block',
    name: 'Заблокировать карту',
    modalType: CardAction.BLOCK,
  },
  {
    icon: 'actions-close',
    name: 'Закрыть карту',
    link: PATH_PAGE.closeCard,
    modalType: CardAction.CLOSE,
  },
];

export const CLOSED_CARD_ACTIONS: LinkCardInfo[] = [
  {
    icon: 'actions-reissue',
    name: 'Перевыпустить карту',
    link: PATH_PAGE.reissueCard,
  },
];

export const BLOCKED_CARD_ACTIONS: LinkCardInfo[] = [
  {
    icon: 'actions-pin',
    name: 'Изменить пин-код',
    link: PATH_PAGE.myCardChangePIN,
  },
  {
    icon: 'actions-reissue',
    name: 'Перевыпустить карту',
    link: PATH_PAGE.reissueCard,
  },
  {
    icon: 'actions-extra',
    name: 'Оформить дополнительную карту',
  },
  {
    icon: 'actions-block',
    name: 'Разблокировать карту',
    modalType: CardAction.UNBLOCK,
  },
  {
    icon: 'actions-close',
    name: 'Закрыть карту',
    link: PATH_PAGE.closeCard,
    modalType: CardAction.CLOSE,
  },
];

export const SECTIONS = {
  action: 'Действия с картой',
  info: 'Карточный продукт',
};
export const TEXT = {
  closeTitles: {
    balanceEqualZero: 'Вы действительно хотите закрыть карту?',
    balanceGreaterZero: 'Кажется на карте остались средства',
    balanceLessZero: 'Баланс не должен быть отрицательным',
  },
  blockTitle: 'Вы действительно хотите заблокировать карту?',
  unblockTitle: 'Вы действительно хотите разблокировать карту?',
  yes: 'Да',
  no: 'Нет',
  transfer: 'Перевести',
  topUp: 'Пополнить',
};

export const CARD_STATUS: Record<string, CardStatus> = {
  CLOSED: 'CLOSED',
  BLOCKED: 'BLOCKED',
  ACTIVE: 'ACTIVE',
};

export const DIR = {
  cards: 'cards',
};

export const COLOR = {
  white: 'white',
};
