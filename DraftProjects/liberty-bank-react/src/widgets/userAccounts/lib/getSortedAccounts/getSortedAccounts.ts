import { AccountInfo } from '@/entities';
import { ACCOUNT_STATUS } from '../../model/constants';
import { SortedAccounts } from '../../model/types';

export const getSortedAccounts = (accounts: AccountInfo[]): SortedAccounts => {
  const sortedData: SortedAccounts = {
    ACTIVE: [],
    BLOCKED: [],
    CLOSED: [],
    REQUEST: [],
  };

  accounts.forEach((account) => {
    switch (account.status) {
      case ACCOUNT_STATUS.ACTIVE:
        sortedData.ACTIVE.push(account);
        break;
      case ACCOUNT_STATUS.BLOCKED:
        sortedData.BLOCKED.push(account);
        break;
      case ACCOUNT_STATUS.CLOSED:
        sortedData.CLOSED.push(account);
        break;
      case ACCOUNT_STATUS.REQUEST:
        sortedData.REQUEST.push(account);
        break;
    }
  });

  return sortedData;
};
