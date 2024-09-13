import { Position } from '../../model';
import { parseCoordinates } from './parseCoordinates';

describe('parseCoordinates', () => {
  test('should return an valid value', () => {
    const input = '123.576 345.789';
    const expectedOutput: Position = { lat: 123.576, lon: 345.789 };
    const output = parseCoordinates(input);
    expect(output).toEqual(expectedOutput);
  });
});
