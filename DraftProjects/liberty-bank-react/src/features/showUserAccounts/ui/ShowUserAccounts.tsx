import { useEffect, useState } from 'react';
import { AccountInfo, AccountBlock, CurrencyType, AccountStatus } from '@/entities';
import { LoadMoreButton } from '@/shared';
import { filterAndSortAccounts } from '../lib/filterAndSortAccounts/filterAndSortAccounts';
import { TEXT, ACCOUNTS_STATE_LENGTH } from '../model/constants';
import s from './ShowUserAccounts.module.scss';

interface Props {
  accounts: AccountInfo[];
  accountStatus: AccountStatus;
  filterCurrency: CurrencyType | 'Все';
}

export const ShowUserAccounts = ({ accounts, accountStatus, filterCurrency }: Props) => {
  const [accountsShown, setAccountsShown] = useState(ACCOUNTS_STATE_LENGTH);
  const filteredAccounts = filterAndSortAccounts(accounts, filterCurrency);
  const slicedAccounts = filteredAccounts.slice(0, accountsShown);
  const accountsLength = filteredAccounts.length;
  const shouldLoadMore = accountsLength > accountsShown;

  const handleClickLoadMore = () => {
    setAccountsShown((accountsShown) => accountsShown + 6);
  };

  useEffect(() => {
    setAccountsShown(ACCOUNTS_STATE_LENGTH);
  }, [accountStatus]);

  return (
    <div className={s.wrapper}>
      <ul className={s.list}>
        {slicedAccounts.map((account) => (
          <AccountBlock key={account.id} account={account} to={account.id} />
        ))}
      </ul>
      {shouldLoadMore && (
        <div className={s.btnWrapper}>
          <LoadMoreButton
            iconName='arrow-down-blue'
            text={TEXT.loadMore}
            width='24'
            height='24'
            onClick={handleClickLoadMore}
          />
        </div>
      )}
    </div>
  );
};
