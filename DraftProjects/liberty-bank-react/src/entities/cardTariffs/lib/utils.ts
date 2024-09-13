import { CurrencyCode } from '@/shared';
import { TEXT } from '../constants';

const formatToLocaleString = (value: number) => {
  return value.toLocaleString('ru-RU', {
    maximumFractionDigits: 0,
  });
};

export const getTheCost = (value: number | number[], currency: CurrencyCode[]) => {
  if (typeof value === 'number') {
    return `${formatToLocaleString(value)} ${currency[0]}`;
  }
  if (Array.isArray(value)) {
    return value
      .map((item, index) => `${formatToLocaleString(item)} ${currency[index]}`)
      .join(' \\ ');
  }
  return TEXT.noData;
};

export const getPercentValue = (value: number) => {
  return `${value.toLocaleString('ru-RU', {
    maximumFractionDigits: 3,
  })} %`;
};
