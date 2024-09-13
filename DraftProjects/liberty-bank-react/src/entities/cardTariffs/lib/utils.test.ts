import { CurrencyCode } from '@/shared';
import { getPercentValue, getTheCost } from './utils'; // Adjust the import path as necessary

describe('getTheCost function', () => {
  test('formats a single number with currency', () => {
    const value = 1234;
    const currency = ['RUB'] as CurrencyCode[];
    const expected = '1 234 RUB';

    const result = getTheCost(value, currency);

    expect(result.replace(/\s/g, ' ')).toBe(expected.replace(/\s/g, ' '));
  });

  test('formats an array of numbers with corresponding currencies', () => {
    const value = [1234, 5678];
    const currency = ['USD', 'EUR'] as CurrencyCode[];
    const expected = '1 234 USD \\ 5 678 EUR';

    const result = getTheCost(value, currency);

    expect(result.replace(/\s/g, ' ')).toBe(expected.replace(/\s/g, ' '));
  });
});

describe('getPercentValue function', () => {
  test('formats a number to a percentage string with Russian locale', () => {
    const value = 0.123456;
    const expected = '0,123 %';

    const result = getPercentValue(value);

    expect(result).toBe(expected);
  });

  test('handles zero correctly', () => {
    const value = 0;
    const expected = '0 %';

    const result = getPercentValue(value);

    expect(result).toBe(expected);
  });

  test('handles negative numbers correctly', () => {
    const value = -0.123456;
    const expected = '-0,123 %';

    const result = getPercentValue(value);

    expect(result).toBe(expected);
  });
});
