import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { StatusLabel, maskStringAsterisks, Text, Icon } from '@/shared';
import { TEXT, ACCOUNT_STATUS_TYPE, CURRENCY_ICON } from '../model/constants';
import { AccountInfo } from '../model/types';
import s from './AccountBlock.module.scss';

interface Props {
  account: AccountInfo;
  to: string;
}

export const AccountBlock = ({ account, to }: Props) => {
  const accountStatus = useMemo(() => ACCOUNT_STATUS_TYPE[account.status], [account.status]);

  const accountName = useMemo(() => {
    return account.accountName !== account.accountNumber
      ? account.accountName
      : maskStringAsterisks(account.accountNumber, 6);
  }, [account.accountName, account.accountNumber]);

  const accountBalance = useMemo(() => {
    return account.balance !== null && !isNaN(account.balance)
      ? new Intl.NumberFormat('ru-RU', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          style: 'currency',
          currency: account.currency,
        }).format(account.balance)
      : TEXT.noData;
  }, [account.balance]);

  return (
    <li className={s.item}>
      <Link to={to} data-testid={'opened_account_' + account.id}>
        <div className={s.container}>
          <div className={s.row}>
            <Icon icon={CURRENCY_ICON[account.currency]} widthAndHeight={'40px'} />
            <div className={s.statusWrapper}>
              {account.isMain && (
                <StatusLabel
                  size={'xxs'}
                  type={'info'}
                  text={TEXT.LABEL.MAIN}
                  data-testid={'main_account_label'}
                />
              )}
              <StatusLabel
                size={'xxs'}
                type={accountStatus}
                text={TEXT.LABEL[account.status]}
                data-testid={'account_status_label'}
              />
            </div>
          </div>
          <div className={s.row}>
            <div className={s.column}>
              <Text
                tag='p'
                size='m'
                weight='medium'
                className={s.accountName}
                data-testid={'account_name'}
              >
                {accountName}
              </Text>
              <Text
                tag='p'
                size='s'
                weight='regular'
                className={s.accountType}
                data-testid={'account_type'}
              >
                {TEXT.TYPE[account.accountType]}
              </Text>
            </div>
            <Text
              tag='p'
              size='m'
              weight='medium'
              className={s.balance}
              data-testid={'account_balance'}
            >
              {accountBalance}
            </Text>
          </div>
        </div>
      </Link>
    </li>
  );
};
