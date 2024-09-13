import { CARD_STATUS, ACTIVE_CARD_INFO, CLOSED_CARD_INFO } from '../constants/constants';
import { ICardInfo } from '@/shared';

export const getCardInfo = (card: ICardInfo) => {
  return card?.cardStatus === CARD_STATUS.CLOSED ? CLOSED_CARD_INFO : ACTIVE_CARD_INFO;
};
