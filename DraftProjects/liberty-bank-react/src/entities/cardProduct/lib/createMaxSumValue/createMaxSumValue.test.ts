import { createMaxSumValue } from './createMaxSumValue';
import { TEXT } from '../../constants';

describe('createMaxSumValue return correct string', () => {
  test('should return the correct string', () => {
    expect(createMaxSumValue(['RUB'], [1000])).toBe('до 1 000 ₽');
    expect(createMaxSumValue(['USD'], [1000])).toBe('до 1 000 $');
    expect(createMaxSumValue(['EUR'], [1000])).toBe('до 1 000 €');
    expect(createMaxSumValue(['RUB', 'USD', 'EUR'], [60000, 1000, 900])).toBe(
      'до 60 000 ₽ \\ до 1 000 $ \\ до 900 €',
    );
  });

  test('should return the default text for no max sum value', () => {
    expect(createMaxSumValue(['USD'], [])).toBe(TEXT.description.noData);
    expect(createMaxSumValue(['USD'])).toBe(TEXT.description.noData);
  });
});
