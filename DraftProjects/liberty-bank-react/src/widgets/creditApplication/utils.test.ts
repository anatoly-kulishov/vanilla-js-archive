import { creditProductMock, creditDataArrayMock } from './mockDataCredit';
import { createCreditDataArray } from './utils';

describe('createCreditDataArray function work correctly', () => {
  test('createCreditDataArray function work correctly ', () => {
    expect(createCreditDataArray(creditProductMock)).toEqual(creditDataArrayMock);
  });
});
