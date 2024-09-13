import { FC } from 'react';
import styles from './PaymentsWriteOffDetails.module.scss';
import { Text } from '@/shared';
import { CARD_INFO, PAYMENTS_WRITE_MOCK, PAYMENT_INFO_MOCK } from './const';
import { InfoCard } from './InfoCard';
import { ProductType } from '../PaymentsProductFormNumber/const';

interface PaymentsWriteOffDetailsProps {
  nextButton: React.ReactNode;
  backButton: React.ReactNode;
  type?: string;
}

export const PaymentsWriteOffDetails: FC<PaymentsWriteOffDetailsProps> = ({
  nextButton,
  backButton,
  type = 'internet',
}) => {
  return (
    <div className={styles['form']}>
      <div className={styles['form__container']}>
        <div className={styles['form__number']}>
          <Text tag='h5' size='s' weight='regular'>
            {ProductType[type]}
          </Text>
          <Text tag='h5' size='s' weight='semibold' className={styles['phone-number']}>
            {PAYMENTS_WRITE_MOCK.number}
          </Text>
        </div>
        <div className={styles['form__content']}>
          <div className={styles['form__block']}>
            {PAYMENT_INFO_MOCK.map((item) => (
              <InfoCard {...item} key={item.title} />
            ))}
          </div>
          <div className={styles['form__block']}>
            {CARD_INFO.map((item) => (
              <InfoCard {...item} key={item.title} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles['form__footer']}>
        {backButton}
        {nextButton}
      </div>
    </div>
  );
};
