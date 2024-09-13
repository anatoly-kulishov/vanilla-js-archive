import { formatPostData } from '..';
import { id, mockData, mockFormattedData } from '../mocksConstants';

describe('formatPostData function work correctly', () => {
  test('formatPostData function work correctly ', () => {
    expect(formatPostData(mockData, id)).toEqual(mockFormattedData);
  });
});
