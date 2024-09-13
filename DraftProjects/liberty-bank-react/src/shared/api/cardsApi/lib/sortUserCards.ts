import { ICard } from '..';

export const sortUserCards = (response: ICard[]) => {
  const sortedCards = response.sort((a, b) => {
    if (a.favourite === b.favourite) {
      if (a.favourite) {
        return 0;
      } else {
        const statusOrder = {
          ACTIVE: 1,
          BLOCKED: 2,
          CLOSED: 3,
        };
        return statusOrder[a.cardStatus] - statusOrder[b.cardStatus];
      }
    } else if (a.favourite) {
      return -1;
    } else {
      return 1;
    }
  });

  return sortedCards;
};
