import { formatNumberWithSpaces } from '@/shared';

export const calculateInputMaxLength = (maxValue: number): number => {
  const maxValueAsString = maxValue.toString();
  return maxValueAsString.length + (formatNumberWithSpaces(maxValue).match(/ /g) || []).length;
};

export const createInputPlaceholder = (minValue: number, maxValue: number): string =>
  `от ${formatNumberWithSpaces(minValue)} до ${formatNumberWithSpaces(maxValue)}`;
