import { AccountOption, IAccountInfo, ICard, maskStringAsterisks } from '@/shared';
import { ONLY_DIGITS_REX_EXP, TEXT } from '../../model/constants';
import { TransferOption } from '../../model/types';

export const getAllOptions = (
  userCards: ICard[],
  userAccounts: IAccountInfo[],
): TransferOption[] => {
  const sortAccountsByIsMain = (accounts: IAccountInfo[]): IAccountInfo[] => {
    return [...accounts].sort((a, b) => {
      if (a.isMain && !b.isMain) {
        return -1;
      }
      if (!a.isMain && b.isMain) {
        return 1;
      }
      return 0;
    });
  };

  // TODO: accountsWithoutOpenedCards это временная реализация, до внесения изменений в EP
  const accountsWithoutOpenedCards = sortAccountsByIsMain(userAccounts).filter(
    (account) => !userCards.some((card) => card.account === account.id),
  );

  const accountOptions = accountsWithoutOpenedCards.map((account): TransferOption => {
    const maskedAccountNumber = maskStringAsterisks(account.accountNumber, 6);

    return {
      value: account.id,
      additionalData: {
        balance: account.balance,
        currency: account.currency,
      },
      content: ({ selected, isInContainer }) => (
        <AccountOption
          selected={selected ?? false}
          accountName={
            ONLY_DIGITS_REX_EXP.test(account.accountName)
              ? maskedAccountNumber
              : account.accountName
          }
          balance={account.balance}
          currency={account.currency}
          isInContainer={isInContainer ?? false}
        />
      ),
    };
  });

  const sortCardsByFavorite = (cards: ICard[]): ICard[] => {
    return [...cards].sort((a, b) => {
      if (a.favourite && !b.favourite) {
        return -1;
      }
      if (!a.favourite && b.favourite) {
        return 1;
      }
      return 0;
    });
  };

  // TODO: activeCards это временная реализация, до внесения изменений в EP
  const activeCards = sortCardsByFavorite(userCards).filter((card) => card.cardStatus === 'ACTIVE');

  const cardOptions = activeCards.map((card): TransferOption => {
    const maskedCardNumber = `${TEXT.cardMask} ${card.lastFourNumbers}`;

    return {
      value: card.account,
      additionalData: {
        balance: card.balance,
        currency: card.currency,
      },
      content: ({ selected, isInContainer }) => (
        <AccountOption
          selected={selected ?? false}
          accountName={maskedCardNumber}
          balance={card.balance}
          currency={card.currency}
          isInContainer={isInContainer ?? false}
        />
      ),
    };
  });

  return [...accountOptions, ...cardOptions];
};
