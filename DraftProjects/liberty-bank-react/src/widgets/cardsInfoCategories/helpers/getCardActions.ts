import {
  ACTIVE_CARD_ACTIONS,
  BLOCKED_CARD_ACTIONS,
  CARD_STATUS,
  CLOSED_CARD_ACTIONS,
} from '../constants/constants';
import { ICardInfo } from '@/shared';

export const getCardActions = (card: ICardInfo) => {
  if (card?.cardStatus === CARD_STATUS.CLOSED) return CLOSED_CARD_ACTIONS;
  if (card?.cardStatus === CARD_STATUS.BLOCKED) return BLOCKED_CARD_ACTIONS;
  if (card?.cardStatus === CARD_STATUS.ACTIVE) return ACTIVE_CARD_ACTIONS;
};
