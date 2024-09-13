import { CurrencyCode, IActiveAccountsByCurrency, Icon } from '@/shared';
import { ISelectOption } from './types';

export const hideAccountNumber = (accountNumber: string, visibleCharacters = 4) =>
  '**** **** **** **** ' + accountNumber.slice(-visibleCharacters);

const maskAccountNumber = (mask: string, value: string) => {
  const maskChars = mask.split('');
  const valueChars = value.split('');

  return maskChars.reduce((result, maskChar) => {
    if (!valueChars[0]) return result;
    if (maskChar === '*' || maskChar === valueChars[0]) {
      return result + valueChars.shift();
    } else {
      return result + maskChar;
    }
  }, '');
};

export const formatNumberWithCurrency = (currency: CurrencyCode, num?: number) =>
  num?.toLocaleString('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    style: 'currency',
    currency: currency,
  });

export const getOptionsToSelect = (
  { accounts }: IActiveAccountsByCurrency,
  currency: CurrencyCode,
): ISelectOption[] =>
  accounts.map(({ accountNumber, balance, accountName }) => ({
    contentLeft: <Icon icon='ruble' widthAndHeight='24px' />,
    value: maskAccountNumber('**** **** **** **** ****', accountNumber),
    caption: formatNumberWithCurrency(currency, balance),
    accountName: accountName !== accountNumber ? accountName : undefined,
    balance: balance,
  }));
