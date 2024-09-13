import { FC } from 'react';
import { ICreditProductDetails, Text } from '@/shared';
import { createArrayFromObject } from './utils';
import styles from './CreditDetails.module.scss';

export interface ICreditDetails {
  creditProduct: ICreditProductDetails;
}

export const CreditDetails: FC<ICreditDetails> = ({ creditProduct }) => {
  return (
    <ul className={styles.list}>
      {createArrayFromObject(creditProduct).map(({ point, amount, preposition }) => (
        <li className={styles.item} key={point}>
          <div className={styles.amount_wrapper}>
            <Text tag='span' size='s' weight='medium' className={styles.preposition}>
              {preposition}
            </Text>
            <Text tag='span' size='m' weight='medium' className={styles.amount}>
              {amount}
            </Text>
          </div>
          <Text tag='p' size='xs' className={styles.point}>
            {point}
          </Text>
        </li>
      ))}
    </ul>
  );
};
