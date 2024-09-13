import { TEXT } from '../../constants';

export const createInterestRateValue = (interestRate?: number): string => {
  return interestRate
    ? `${interestRate.toFixed(1).replace(/\./g, ',')} %`
    : TEXT.description.noData;
};
