import { FC, ReactNode } from 'react';
import { Icon, Input, Text } from '@/shared';
import styles from './PaymentsWriteOffCard.module.scss';
import { CARD_MOCK } from './const';
import { ProductType } from '../PaymentsProductFormNumber/const';

interface PaymentsWriteOffCardProps {
  button: ReactNode;
  type?: string;
  withoutTitle?: boolean;
}

export const PaymentsWriteOffCard: FC<PaymentsWriteOffCardProps> = ({
  button,
  type = 'loanRepayment',
  withoutTitle = false,
}) => {
  const withSum = new RegExp('^(' + 'insurance|fines|taxes' + ')$', 'i').test(type);

  return (
    <div className={styles['form-wrapper']}>
      <div className={styles['form-wrapper__container']}>
        {!withoutTitle && (
          <div className={styles['form-wrapper__number']}>
            <Text tag='h5' size='s' weight='regular'>
              {ProductType[type]}
            </Text>
            <Text tag='h5' size='s' weight='semibold' className={styles['phone-number']}>
              {CARD_MOCK.phone}
            </Text>
          </div>
        )}
        {withSum && (
          <div className={styles['form-wrapper__number']}>
            <Text tag='h5' size='s' weight='regular'>
              {CARD_MOCK.paymentSumTitle}
            </Text>
            <Text tag='h5' size='s' weight='semibold' className={styles['phone-number']}>
              {CARD_MOCK.paymentSum}
            </Text>
          </div>
        )}
        <div className={styles['form-wrapper__content']}>
          <Text tag='h5' size='s' weight='regular'>
            {CARD_MOCK.cardTitle}
          </Text>
          <Input.Select
            value='Карта МИР *** 0804'
            white
            options={['Карта МИР *** 0037', 'Карта МИР *** 0804']}
            size='m'
          />
        </div>
        {!withSum && (
          <div className={styles['form-wrapper__content']}>
            <Text tag='h5' size='s' weight='regular'>
              {CARD_MOCK.sumTitle}
            </Text>
            <Input.Number contentRight={<Icon icon={'ruble-small'} />} white size='s' />
          </div>
        )}
      </div>
      {button}
    </div>
  );
};
