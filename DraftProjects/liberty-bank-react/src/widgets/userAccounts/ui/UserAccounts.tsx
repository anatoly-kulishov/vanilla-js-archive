import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardType, FilterButtons, IAccount, InfoFrame, PATH_PAGE, Tabs } from '@/shared';
import { ShowUserAccounts } from '@/features';
import { getFilteredAccountsCount } from '../lib/getFilteredAccountsCount/getFilteredAccountsCount';
import { TEXT, NO_ACCOUNTS_ICON, FILTER_TEXT, FILTER, ACCOUNT_STATUS } from '../model/constants';
import { getSortedAccounts } from '../lib/getSortedAccounts/getSortedAccounts';
import s from './UserAccounts.module.scss';

interface Props {
  userAccounts?: IAccount;
}

export const UserAccounts = ({ userAccounts }: Props) => {
  let tabs = [];
  const navigate = useNavigate();
  const [filterCurrency, setFilterCurrency] = useState(FILTER.ALL);

  const handleCreateAccount = () => {
    navigate(PATH_PAGE.createCurrentAccount);
  };

  if (!userAccounts) {
    tabs = [
      {
        label: TEXT.openedAccountLabel,
        countIndicator: 0,
        content: (
          /**
           * Если у пользователя вообще нет счетов (условие if выполняется)
           * то EP отдаёт 404 ошибку и мы показываем InfoFrame
           */
          <div className={s.infoFrameWrapper}>
            <InfoFrame
              icon={NO_ACCOUNTS_ICON}
              cardType={CardType.dontOpen}
              title={TEXT.infoFrameTitle}
              primaryBtnText={TEXT.infoFrameBtn}
              onPrimaryButtonClick={handleCreateAccount}
            />
          </div>
        ),
      },
    ];
  } else {
    const sortedAccounts = getSortedAccounts(userAccounts.accounts);

    tabs = [
      {
        label: TEXT.openedAccountLabel,
        countIndicator:
          filterCurrency === FILTER.ALL
            ? sortedAccounts.ACTIVE.length
            : getFilteredAccountsCount(sortedAccounts.ACTIVE, filterCurrency),
        content: sortedAccounts.ACTIVE.length ? (
          <ShowUserAccounts
            accounts={sortedAccounts.ACTIVE}
            accountStatus={ACCOUNT_STATUS.ACTIVE}
            filterCurrency={filterCurrency}
          />
        ) : (
          /**
           * Если у пользователя нет активных счетов, но есть счета с
           * другим статусом, то на этой вкладке показываем InfoFrame
           */
          <div className={s.infoFrameWrapper}>
            <InfoFrame
              icon={NO_ACCOUNTS_ICON}
              cardType={CardType.dontOpen}
              title={TEXT.infoFrameTitle}
              primaryBtnText={TEXT.infoFrameBtn}
              onPrimaryButtonClick={handleCreateAccount}
            />
          </div>
        ),
      },
      ...(sortedAccounts.REQUEST.length
        ? [
            {
              label: TEXT.requestAccountLabel,
              countIndicator:
                filterCurrency === FILTER.ALL
                  ? sortedAccounts.REQUEST.length
                  : getFilteredAccountsCount(sortedAccounts.REQUEST, filterCurrency),
              content: (
                <ShowUserAccounts
                  accounts={sortedAccounts.REQUEST}
                  accountStatus={ACCOUNT_STATUS.REQUEST}
                  filterCurrency={filterCurrency}
                />
              ),
            },
          ]
        : []),
      ...(sortedAccounts.CLOSED.length
        ? [
            {
              label: TEXT.closedAccountLabel,
              countIndicator:
                filterCurrency === FILTER.ALL
                  ? sortedAccounts.CLOSED.length
                  : getFilteredAccountsCount(sortedAccounts.CLOSED, filterCurrency),
              content: (
                <ShowUserAccounts
                  accounts={sortedAccounts.CLOSED}
                  accountStatus={ACCOUNT_STATUS.CLOSED}
                  filterCurrency={filterCurrency}
                />
              ),
            },
          ]
        : []),
      ...(sortedAccounts.BLOCKED.length
        ? [
            {
              label: TEXT.blockedAccountLabel,
              countIndicator:
                filterCurrency === FILTER.ALL
                  ? sortedAccounts.BLOCKED.length
                  : getFilteredAccountsCount(sortedAccounts.BLOCKED, filterCurrency),
              content: (
                <ShowUserAccounts
                  accounts={sortedAccounts.BLOCKED}
                  accountStatus={ACCOUNT_STATUS.BLOCKED}
                  filterCurrency={filterCurrency}
                />
              ),
            },
          ]
        : []),
    ];
  }

  return (
    <Tabs
      tabs={tabs}
      filter={<FilterButtons filter={FILTER_TEXT} filterChange={setFilterCurrency} />}
    />
  );
};
