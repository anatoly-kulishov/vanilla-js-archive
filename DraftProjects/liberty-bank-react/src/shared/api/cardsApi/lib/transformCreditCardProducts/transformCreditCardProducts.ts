import { ICreditCardProduct, ICreditCardProductResponse, TAllImages } from '../../../..';

export const transformCreditCardProducts = (cards: ICreditCardProductResponse[]) =>
  cards.map(
    (creditCard): ICreditCardProduct => ({
      id: creditCard.id,
      name: creditCard.name,
      typeName: `${creditCard.levelOfCreditCardProduct.toLocaleLowerCase()}` as TAllImages,
      paymentSystem: [creditCard.paymentSystem],
      currency: [creditCard.currency],
      maxSum: [creditCard.maxSum],
      interestRate: creditCard.interestRate,
    }),
  );
