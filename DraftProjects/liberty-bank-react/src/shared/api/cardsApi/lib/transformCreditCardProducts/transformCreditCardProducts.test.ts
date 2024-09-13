import { mockCards, mockExpectedData } from './mocksConstants';
import { transformCreditCardProducts } from './transformCreditCardProducts';

test('transformCreditCardProducts should transform credit card products currency, paymentSystem, maxSum fields and add typeName field', () => {
  expect(transformCreditCardProducts(mockCards)).toEqual(mockExpectedData);
});
