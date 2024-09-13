import { IDebitCardProduct, IDebitCardProductsResponse } from '@/shared';
import { transformDebitCardProducts } from './transformDebitCardProducts';

const cards = {
  content: [
    {
      id: '731ef8b5-1e26-4fae-a063-fc9b77fc48dd',
      typeName: 'Liberty Card Gold',
      paymentSystem: 'MIR',
      currency: 'RUB',
      level: 'Gold',
      costPerMonth: 500,
      virtual: false,
      validityTerm: 60,
    },
    {
      id: 'b599cbb9-12b3-4bdd-8e8e-0577b3a81487',
      typeName: 'Liberty Card Gold',
      paymentSystem: 'MASTERCARD',
      currency: 'RUB',
      level: 'Gold',
      costPerMonth: 500,
      virtual: false,
      validityTerm: 60,
    },
    {
      id: '4f49a3a0-cb27-4933-903f-eab90474aca6',
      typeName: 'Liberty Card Gold',
      paymentSystem: 'VISA',
      currency: 'RUB',
      level: 'Gold',
      costPerMonth: 500,
      virtual: false,
      validityTerm: 60,
    },
    {
      id: '45973c61-9aac-479a-9ccf-88301f82b570',
      typeName: 'Liberty Card Gold',
      paymentSystem: 'MIR',
      currency: 'USD',
      level: 'Gold',
      costPerMonth: 5,
      virtual: false,
      validityTerm: 60,
    },
    {
      id: '14c78e82-654d-4ba2-b7aa-98803145be71',
      typeName: 'Liberty Card Gold',
      paymentSystem: 'MASTERCARD',
      currency: 'USD',
      level: 'Gold',
      costPerMonth: 5,
      virtual: false,
      validityTerm: 60,
    },
    {
      id: 'a24d791f-c1c4-421e-9f01-d9a2f1ede3f7',
      typeName: 'Liberty Card Gold',
      paymentSystem: 'VISA',
      currency: 'USD',
      level: 'Gold',
      costPerMonth: 5,
      virtual: false,
      validityTerm: 60,
    },
    {
      id: '61adbd49-1b26-4a7a-9ced-f2b9bf5cdb8b',
      typeName: 'Liberty Card Gold',
      paymentSystem: 'MIR',
      currency: 'EUR',
      level: 'Gold',
      costPerMonth: 5,
      virtual: false,
      validityTerm: 60,
    },
    {
      id: '2f774df1-2744-4ec0-a53f-5b9202a59c64',
      typeName: 'Liberty Card Gold',
      paymentSystem: 'MASTERCARD',
      currency: 'EUR',
      level: 'Gold',
      costPerMonth: 5,
      virtual: false,
      validityTerm: 60,
    },
    {
      id: '429eccf2-8119-4eb3-a26c-3c3d48718e3a',
      typeName: 'Liberty Card Gold',
      paymentSystem: 'VISA',
      currency: 'EUR',
      level: 'Gold',
      costPerMonth: 5,
      virtual: false,
      validityTerm: 60,
    },
    {
      id: 'c79cbb72-8570-4237-a0d4-0cf21fe0cae1',
      typeName: 'Liberty Card Child',
      paymentSystem: 'MIR',
      currency: 'RUB',
      level: 'Classic',
      costPerMonth: 0,
      virtual: false,
      validityTerm: 36,
    },
  ],
} as IDebitCardProductsResponse;

const expectedGroupedData: IDebitCardProduct[] = [
  {
    typeName: 'Liberty Card Child',
    paymentSystem: ['MIR'],
    currency: ['RUB'],
    costPerMonth: [0],
    validityTerm: 36,
  },
  {
    typeName: 'Liberty Card Gold',
    paymentSystem: ['MIR', 'MASTERCARD', 'VISA'],
    currency: ['RUB', 'USD', 'EUR'],
    costPerMonth: [500, 5, 5],
    validityTerm: 60,
  },
];

describe('transformDebitCardProducts return correct result', () => {
  test('transformDebitCardProducts shouldn`t group debit card products with `raw` argument', () => {
    expect(transformDebitCardProducts(cards, null, 'raw')).toEqual(cards);
  });
  test('transformDebitCardProducts should group debit card products by typeName, and sort by order', () => {
    expect(transformDebitCardProducts(cards)).toEqual(expectedGroupedData);
  });
});
