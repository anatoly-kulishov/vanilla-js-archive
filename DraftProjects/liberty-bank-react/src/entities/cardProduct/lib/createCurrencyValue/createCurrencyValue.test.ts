import { CurrencyCode } from '@/shared';
import { TEXT } from '../../constants';
import { createCurrencyValue } from './createCurrencyValue';

const currency = ['USD', 'EUR', 'RUB'] as CurrencyCode[];
const res = 'USD \\ EUR \\ RUB';

describe('createCurrencyValue returns correct string', () => {
  test('should return join currency codes with backslashes', () => {
    expect(createCurrencyValue(currency)).toBe(res);
  });

  test('should return default text if currency array is empty', () => {
    expect(createCurrencyValue([])).toBe(TEXT.description.noData);
  });
});
