import { getCardDescription } from './getCardDescription';
import { TEXT, DESCRIPTIONS } from '../../constants';

describe('getCardDescription return correct description', () => {
  test('should return the correct debit card description if the argument is in the list, ', () => {
    expect(getCardDescription('Liberty Card Classic')).toBe(DESCRIPTIONS['Liberty Card Classic']);
  });

  test('should return the correct credit card description if the argument is in the list', () => {
    expect(getCardDescription('product1', true)).toBe(DESCRIPTIONS.product1);
  });

  test('should return the debit card default description if the argument is not in the list and if it is debit card description', () => {
    expect(getCardDescription('Liberty Card')).toBe(TEXT.description.debitCardDefault);
  });

  test('should return the credit card default description if the argument is not in the list and if it is credit card description', () => {
    expect(getCardDescription('Liberty Card', true)).toBe(TEXT.description.creditCardDefault);
  });
});
