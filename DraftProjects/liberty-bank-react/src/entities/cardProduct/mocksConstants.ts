import { PaymentSystem, CurrencyCode } from '@/shared';

export const debitCard = {
  id: '1d77ccba-8289-46f4-9bff-f012fbfbfc15',
  typeName: 'Liberty Card Travel',
  paymentSystem: ['VISA', 'Mastercard'] as PaymentSystem[],
  currency: ['USD', 'EUR'] as CurrencyCode[],
  costPerMonth: [1000, 20.5],
  validityTerm: 12,
};

export const debitCardValidityTermRes = 'USD \\ EUR';
export const debitCardCostPerMonthRes = '1 000 $ \\ 20,5 €';
export const debitCardCurrencyRes = '12 месяцев';

export const creditCard = {
  id: '1d77ccba-8289-46f4-9bff-f012fbfbfc15',
  name: 'product1',
  typeName: 'card-classic',
  paymentSystem: ['VISA', 'MASTERCARD'] as PaymentSystem[],
  currency: ['RUB', 'USD', 'EUR'] as CurrencyCode[],
  interestRate: 10.56,
  maxSum: [60000, 1000, 900],
};

export const creditCardInterestRateRes = '10,6 %';
export const creditCardMaxSumRes = 'до 60 000 ₽ \\ до 1 000 $ \\ до 900 €';
export const creditCardCurrencyRes = 'RUB \\ USD \\ EUR';
