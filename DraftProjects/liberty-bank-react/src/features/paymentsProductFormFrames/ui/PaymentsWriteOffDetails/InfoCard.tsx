import { FC } from 'react';
import { PAYMENT_INFO } from './const';
import { Text } from '@/shared';
import styles from './PaymentsWriteOffDetails.module.scss';

export const InfoCard: FC<PAYMENT_INFO> = ({ title, value }) => {
  return (
    <div className={styles['info']}>
      <Text tag='h5' size='s' weight='regular' className={styles['info__title']}>
        {title}
      </Text>
      <Text tag='h5' size='s' weight='regular' className={styles['info__value']}>
        {value}
      </Text>
    </div>
  );
};
