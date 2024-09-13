export const prepareAndSubstituteValue = (
  value: number,
  minValue: number,
  maxValue: number,
  returnType: 'number' | 'string',
) => {
  if (!value) {
    return returnType === 'number' ? 0 : String(minValue);
  }

  const newValue = value < minValue ? minValue : value > maxValue ? maxValue : value;

  return returnType === 'number' ? newValue : String(newValue);
};
