import { Position } from '../../model';

export const parseCoordinates = (input: string): Position => {
  const [latStr, lonStr] = input.split(' ');

  return {
    lat: parseFloat(latStr),
    lon: parseFloat(lonStr),
  };
};
