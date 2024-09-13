import { createInterestRateValue } from './createInterestRateValue';
import { TEXT } from '../../constants';

describe('createInterestRateValue return correct string', () => {
  test('should return the correct string', () => {
    expect(createInterestRateValue(10)).toBe('10,0 %');
    expect(createInterestRateValue(10.5)).toBe('10,5 %');
    expect(createInterestRateValue(10.56)).toBe('10,6 %');
  });

  test('should return the default text for no interest rate', () => {
    expect(createInterestRateValue()).toBe(TEXT.description.noData);
  });
});
