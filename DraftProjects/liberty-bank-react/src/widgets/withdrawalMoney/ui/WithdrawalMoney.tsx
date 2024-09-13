import { FC } from 'react';
import { Button, Text } from '@/shared';
import style from './WithdrawalMoney.module.scss';
import { SelectTransferAccount } from '@/features';
import {
  TRANSFER_ACCOUNTS,
  TRANSFER_ACCOUNTS_2,
  TRANSFER_ACCOUNT_TITLE_FROM,
  TRANSFER_ACCOUNT_TITLE_IN,
  TRANSFER_BUTTON,
} from '../constants';

export interface IWithdrawalMoney {}

export const WithdrawalMoney: FC<IWithdrawalMoney> = () => {
  function createTransfer() {
    // TODO как сделают трансфер сервис написать логику создания запроса
  }

  return (
    <div className={style['withdrawal-money']}>
      <Text tag='h3'>{TRANSFER_ACCOUNT_TITLE_FROM}</Text>
      <SelectTransferAccount transferAccounts={TRANSFER_ACCOUNTS} />
      <Text tag='h3'>{TRANSFER_ACCOUNT_TITLE_IN}</Text>
      <SelectTransferAccount transferAccounts={TRANSFER_ACCOUNTS_2} />
      <Button onClick={createTransfer} className={style['btn-transfer']}>
        <Text tag='h3' size='m'>
          {TRANSFER_BUTTON}
        </Text>
      </Button>
    </div>
  );
};
