import { CurrencyCode } from '@/shared';
import { TEXT } from '../../constants';

export const createCurrencyValue = (currency: CurrencyCode[]): string =>
  currency.length ? currency.join(' \\ ') : TEXT.description.noData;
