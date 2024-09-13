import { createValidityTermValue } from './createValidityTermValue';
import { TEXT } from '../../constants';

describe('createValidityTermValue return correct string', () => {
  test('should return the correct string for 24', () => {
    expect(createValidityTermValue(24)).toBe('24 месяца');
  });

  test('should return the correct string for any value other than 24', () => {
    expect(createValidityTermValue(10)).toBe('10 месяцев');
  });

  test('should return the default text for no validity term', () => {
    expect(createValidityTermValue(0)).toBe(TEXT.description.noData);
  });
});
