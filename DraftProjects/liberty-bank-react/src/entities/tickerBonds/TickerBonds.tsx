import { Button, Link, Text } from '@/shared';
import styles from './TickerBonds.module.scss';
import { FC } from 'react';

export interface ITickerFull {
  name: string;
  id: string;
  closeData: string;
  incomePercent: string;
  price: string;
  assetLink: string;
}

export const TickerFull: FC<ITickerFull> = ({
  name,
  id,
  closeData,
  incomePercent,
  price,
  assetLink,
}) => {
  return (
    <div className={styles['bonds-item']}>
      <Text tag='p' size='m' className={styles['bonds-name']}>{`${name}`}</Text>
      <Text tag='p' size='m' className={styles['bonds-name']}>{`(${id})`}</Text>
      <Text tag='p' size='m'>
        {closeData}
      </Text>
      <Text tag='p' size='m'>
        {incomePercent}%
      </Text>
      <Text tag='p' size='m'>
        {price} ₽
      </Text>
      <div className={styles['buy-btn-div']}>
        <Link to={assetLink + name}>
          <Button size='s' className={styles['buy-btn']}>
            Больше информации
          </Button>
        </Link>
      </div>
    </div>
  );
};
