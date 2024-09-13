import { formatNumberWithSpaces } from '../../lib';

export const validateValueMinMax = (value: number, min: number, max: number) => {
  if (value < min) {
    return formatNumberWithSpaces(min);
  } else if (value > max) {
    return formatNumberWithSpaces(max);
  } else {
    return formatNumberWithSpaces(value);
  }
};
