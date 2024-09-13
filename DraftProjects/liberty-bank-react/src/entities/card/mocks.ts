import { ICard, ICreditCard } from '@/shared';

export const cardData: ICard = {
  id: '1',
  firstTwelveNumbers: '123456789012',
  lastFourNumbers: '4321',
  account: 'a1',
  typeName: 'card-classic',
  paymentSystem: 'MIR',
  balance: 100,
  currency: 'RUB',
  expiredAt: '0',
  closedAt: '0',
  level: '0',
  cardStatus: 'ACTIVE',
  credit: false,
  favourite: false,
};

export const creditCardData: ICreditCard = {
  id: '2',
  name: 'Liberty Card Classic',
  currency: 'RUB',
  paymentSystem: 'MIR',
  level: 'CLASSIC',
  generalBalance: 100,
  expiredAt: '10/30',
  status: 'ACTIVE',
  firstTwelveNumbers: '123456789123',
  lastFourNumbers: '4444',
};
