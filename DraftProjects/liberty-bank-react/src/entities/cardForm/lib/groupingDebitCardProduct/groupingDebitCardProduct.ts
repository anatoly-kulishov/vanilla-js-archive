import { CardProduct, AccountSelectionFormPageProductInfo } from '../../model/types';

export const groupingDebitCardProduct = (cards: CardProduct[]) => {
  const groupedData = cards.reduce(
    (acc: AccountSelectionFormPageProductInfo, curr: CardProduct) => {
      if (!acc.typeName) {
        acc.typeName = curr.typeName;
        acc.paymentSystems = [curr.paymentSystem];
        acc.currencies = [curr.currency];
      } else {
        if (!acc.paymentSystems.includes(curr.paymentSystem)) {
          acc.paymentSystems.push(curr.paymentSystem);
        }
        if (!acc.currencies.includes(curr.currency)) {
          acc.currencies.push(curr.currency);
        }
      }

      return acc;
    },
    {} as AccountSelectionFormPageProductInfo,
  );

  return groupedData;
};
