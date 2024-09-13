import { FC } from 'react';
import { Text } from '@/shared';
import style from './TransferAccountCard.module.scss';
import classNames from 'classnames';

export interface ITransferAccountCard {
  accountTitle: string;
  title: string;
  funds: number;
  isActive?: boolean;
}

export const TransferAccountCard: FC<ITransferAccountCard> = ({
  accountTitle,
  title,
  funds,
  isActive = false,
}) => {
  return (
    <div
      className={classNames(style['account-card'], {
        [style['account-card-active']]: isActive,
      })}
    >
      <div className={style['account-card_titles']}>
        <Text tag='h6' weight='medium'>
          {accountTitle}
        </Text>
        <Text tag='h6' weight='medium'>
          {title}
        </Text>
      </div>

      <Text tag='h6' size='l'>
        {`${funds} Р`}
      </Text>
    </div>
  );
};
