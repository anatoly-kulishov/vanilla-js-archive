import { ICreditCardProduct, ICreditCardProductResponse, TAllImages } from '@/shared';

export const mockCards: ICreditCardProductResponse[] = [
  {
    id: '1d77ccba-8289-46f4-9bff-f012fbfbfc15',
    name: 'product1',
    interestRate: 10,
    currency: 'USD',
    paymentSystem: 'VISA',
    levelOfCreditCardProduct: 'CLASSIC',
    maxSum: 1000,
  },
  {
    id: '0d60db57-29d7-4af4-8859-a8380335ee0c',
    name: 'product7',
    interestRate: 11,
    currency: 'RUB',
    paymentSystem: 'VISA',
    levelOfCreditCardProduct: 'GOLD',
    maxSum: 5000,
  },
];

export const mockExpectedData: ICreditCardProduct[] = [
  {
    id: '1d77ccba-8289-46f4-9bff-f012fbfbfc15',
    name: 'product1',
    interestRate: 10,
    typeName: 'classic' as TAllImages,
    currency: ['USD'],
    paymentSystem: ['VISA'],
    maxSum: [1000],
  },
  {
    id: '0d60db57-29d7-4af4-8859-a8380335ee0c',
    name: 'product7',
    interestRate: 11,
    typeName: 'gold' as TAllImages,
    currency: ['RUB'],
    paymentSystem: ['VISA'],
    maxSum: [5000],
  },
];
