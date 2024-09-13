import { AccountInfo, CurrencyType } from '@/entities';

export const getFilteredAccountsCount = (accounts: AccountInfo[], filter: CurrencyType): number => {
  return accounts.filter((account) => account.currency === filter).length;
};
