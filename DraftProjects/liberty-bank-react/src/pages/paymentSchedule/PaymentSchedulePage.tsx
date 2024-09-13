import React, { FC } from 'react';
import { Text, formatNumberWithSpaces } from '@/shared';
import { PAGE_TITLE, ceilsNames } from './constans';
import { payments } from './mockPaymentInfo';
import styles from './PaymentSchedulePage.module.scss';

const PaymentSchedulePage: FC = () => {
  return (
    <div className={styles.page_wrapper}>
      <Text tag='h3' size='m' weight='medium'>
        {PAGE_TITLE}
      </Text>
      <div className={styles.schedule_container}>
        <Text tag='span' size='m' weight='medium'>
          {ceilsNames.number}
        </Text>
        <Text tag='span' size='m' weight='medium'>
          {ceilsNames.paymentDate}
        </Text>
        <Text tag='span' size='m' weight='medium'>
          {ceilsNames.paymentAmount}
        </Text>
        <Text tag='span' size='m' weight='medium'>
          {ceilsNames.principalAmount}
        </Text>
        <Text tag='span' size='m' weight='medium'>
          {ceilsNames.interestAmount}
        </Text>
        <Text tag='span' size='m' weight='medium'>
          {ceilsNames.remainingLoan}
        </Text>
        {payments.map((payment) => (
          <React.Fragment key={payment.number}>
            <Text tag='span' size='m' weight='medium'>
              {payment.number}
            </Text>
            <Text tag='span' size='m' weight='medium'>
              {payment.paymentDate}
            </Text>
            <Text tag='span' size='m' weight='medium'>
              {formatNumberWithSpaces(payment.paymentAmount)}
            </Text>
            <Text tag='span' size='m' weight='medium'>
              {formatNumberWithSpaces(payment.principalAmount)}
            </Text>
            <Text tag='span' size='m' weight='medium'>
              {formatNumberWithSpaces(payment.interestAmount)}
            </Text>
            <Text tag='span' size='m' weight='medium'>
              {formatNumberWithSpaces(payment.remainingLoan)}
            </Text>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default PaymentSchedulePage;
