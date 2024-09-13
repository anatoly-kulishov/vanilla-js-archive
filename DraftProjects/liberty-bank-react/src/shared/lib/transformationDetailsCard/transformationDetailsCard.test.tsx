import { transformationDetailsCard } from './';
import { depositDetail, transformedDepositCard } from './mockConstants';

describe('transformationDepositCard function work correctly', () => {
  test('transformationDepositCard function work correctly ', () => {
    expect(transformationDetailsCard(depositDetail)).toEqual(transformedDepositCard);
  });
});
