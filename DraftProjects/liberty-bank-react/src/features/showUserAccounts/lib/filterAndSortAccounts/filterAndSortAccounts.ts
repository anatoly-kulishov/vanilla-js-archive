import { AccountInfo, CurrencyType } from '@/entities';

export const filterAndSortAccounts = (
  accounts: AccountInfo[],
  filterCurrency: CurrencyType | 'Все',
): AccountInfo[] => {
  return accounts
    .filter((a) => filterCurrency === 'Все' || filterCurrency === a.currency)
    .sort((a, b) => {
      if (a.isMain > b.isMain) {
        return -1;
      } else if (a.isMain === b.isMain) {
        return 0;
      } else {
        return 1;
      }
    });
};
