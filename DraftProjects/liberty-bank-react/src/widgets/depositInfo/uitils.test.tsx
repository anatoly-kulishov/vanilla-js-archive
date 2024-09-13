import { depositDataArray, depositProduct } from './mocksConstants';
import { createDepositDataArray } from './utils';

describe('createDepositDataArray function work correctly', () => {
  test('createDepositDataArray function work correctly ', () => {
    expect(createDepositDataArray(depositProduct)).toEqual(depositDataArray);
  });
});
