import {
  IDebitCardProduct,
  IDebitCardProductResponse,
  IDebitCardProductsResponse,
  CardTypeName,
} from '../../../..';

const SORT_ORDER: CardTypeName[] = [
  'Liberty Card Classic',
  'Liberty Card Child',
  'Liberty Card Gold',
  'Liberty Card Platinum',
  'Liberty Card Virtual',
  'Liberty Card Secure',
  'Liberty Card Travel',
];

export const transformDebitCardProducts = <
  T extends 'raw' | void,
  R = T extends string ? IDebitCardProductsResponse : IDebitCardProduct[],
>(
  res: IDebitCardProductsResponse,
  _meta?: unknown,
  arg?: T,
): R => {
  if (arg === 'raw') {
    return res as unknown as R;
  }

  return res.content.reduce((acc: IDebitCardProduct[], curr: IDebitCardProductResponse) => {
    const existingItem = acc.find((item) => item.typeName === curr.typeName);

    if (existingItem) {
      if (!existingItem.paymentSystem.includes(curr.paymentSystem)) {
        existingItem.paymentSystem.push(curr.paymentSystem);
      }
      if (!existingItem.currency.includes(curr.currency)) {
        existingItem.currency.push(curr.currency);
        existingItem.costPerMonth.push(curr.costPerMonth);
      }
    } else {
      acc.push({
        typeName: curr.typeName,
        paymentSystem: [curr.paymentSystem],
        currency: [curr.currency],
        costPerMonth: [curr.costPerMonth],
        validityTerm: curr.validityTerm,
      });
    }

    return acc.sort((a, b) => SORT_ORDER.indexOf(a.typeName) - SORT_ORDER.indexOf(b.typeName));
  }, []) as unknown as R;
};
