import { ICard, ICreditCard } from '@/shared';

export const isCreditCard = (card: ICard | ICreditCard): card is ICreditCard =>
  (card as ICreditCard).name !== undefined;

export const getCardFields = (card: ICard | ICreditCard) => {
  const creditCard = isCreditCard(card);

  if (creditCard) {
    return {
      balance: card.generalBalance,
      cardName: card.name,
      cardStatus: card.status,
      typeName: card.level,
      expiredAt: card.expiredAt,
      type: 'credit',
    };
  }

  return {
    balance: card.balance,
    cardName: card.typeName,
    cardStatus: card.cardStatus,
    typeName: card.typeName,
    expiredAt: card.expiredAt,
    closedAt: card.closedAt,
    favourite: card.favourite,
    type: 'debit',
  };
};
