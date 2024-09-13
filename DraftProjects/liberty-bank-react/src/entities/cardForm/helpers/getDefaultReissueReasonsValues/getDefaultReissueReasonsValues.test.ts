import { ReissueCardFormLSKeys, reissueCardFormLSApi } from '../../model';
import { getDefaultReissueReasonsValues } from './getDefaultReissueReasonsValues';

const defaultResult = { reason: undefined };
const expectedResult = { reason: 'LOST' };

describe('getDefaultReissueReasonsValues', () => {
  test('should return default value if the storage is empty', () => {
    expect(getDefaultReissueReasonsValues(reissueCardFormLSApi)).toEqual(defaultResult);
  });

  test('should return valid data from storage', () => {
    reissueCardFormLSApi.setValue<string>(ReissueCardFormLSKeys.REISSUE_REASON, 'LOST');

    expect(getDefaultReissueReasonsValues(reissueCardFormLSApi)).toEqual(expectedResult);
  });
});
