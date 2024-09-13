export const formatInterestRate = (value: number): string =>
  value.toFixed(1).replace(/\./g, ',').trim();
