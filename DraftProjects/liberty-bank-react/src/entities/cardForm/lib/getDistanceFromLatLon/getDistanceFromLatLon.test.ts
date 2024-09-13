import { getDistanceFromLatLon } from './getDistanceFromLatLon';

describe('getDistanceFromLatLon', () => {
  test('should return an valid values', () => {
    expect(getDistanceFromLatLon(48.8566, 2.3522, 49.2498, 1.3501)).toBe('85,1 км');
    expect(getDistanceFromLatLon(37.748, -122.431, 37.749, -122.432)).toBe('142 м');
  });
});
