import { CARD_STATUS, CardAction, TEXT } from '../constants/constants';
import { CardStatus } from '@/shared';

export const getModalTitle = (
  cardStatus: CardStatus,
  modalType: CardAction | null,
  balance: number,
) => {
  if (modalType === CardAction.CLOSE) {
    if (balance === 0) return TEXT.closeTitles.balanceEqualZero;
    return balance > 0 ? TEXT.closeTitles.balanceGreaterZero : TEXT.closeTitles.balanceLessZero;
  }

  if (modalType === CardAction.BLOCK || modalType === CardAction.UNBLOCK) {
    if (cardStatus === CARD_STATUS.ACTIVE) return TEXT.blockTitle;
    if (cardStatus === CARD_STATUS.BLOCKED) return TEXT.unblockTitle;
  }
};
