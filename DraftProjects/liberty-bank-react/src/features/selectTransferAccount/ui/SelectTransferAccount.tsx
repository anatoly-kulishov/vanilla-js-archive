import { FC, useState } from 'react';
import style from './SelectTransferAccount.module.scss';
import { ITransferAccountCard, TransferAccountCard } from '@/entities';
import { Button } from '@/shared';
import classNames from 'classnames';

export interface ISelectTransferAccount {
  transferAccounts: ITransferAccountCard[];
}

export const SelectTransferAccount: FC<ISelectTransferAccount> = ({ transferAccounts }) => {
  const [activeCard, setActiveCard] = useState(''); // FIXME должны быть id каждого счета

  function selectAccount(item: string) {
    setActiveCard(item);
  }

  return (
    <div className={style['transfer-list']}>
      {transferAccounts.map((el) => (
        <Button
          key={el.title}
          theme='third'
          size='s'
          onClick={() => {
            selectAccount(el.title);
          }}
          className={classNames(style['select-btn'], {
            [style['select-btn-active']]: activeCard === el.title,
          })}
        >
          <TransferAccountCard
            accountTitle={el.accountTitle}
            title={el.title}
            funds={el.funds}
            isActive={activeCard === el.title}
          />
        </Button>
      ))}
    </div>
  );
};
