import { createCostPerMonthValue } from './createCostPerMonthValue';
import { CurrencyCode } from '@/shared';
import { TEXT } from '../../constants';

const costPerMonth = [1000, 2000.01, 3000.5];
const currency = ['RUB', 'USD', 'EUR'] as CurrencyCode[];
const res = '1\u00A0000\u00A0₽ \\ 2\u00A0000,01\u00A0$ \\ 3\u00A0000,5\u00A0€';

describe('createCostPerMonthValue returns correct string', () => {
  test('returns formatted cost per month values', () => {
    expect(createCostPerMonthValue(costPerMonth, currency)).toEqual(res);
  });

  test('returns default text when either costPerMonth or currency is empty', () => {
    expect(createCostPerMonthValue([], [])).toEqual(TEXT.description.noData);
  });
});
