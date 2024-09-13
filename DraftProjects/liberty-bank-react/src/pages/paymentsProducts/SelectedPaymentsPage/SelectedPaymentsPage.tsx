import { SelectedPayments } from '@/widgets/selectedPayments';
import styles from '../../paymentsLayout/PaymentsLayoutPage.module.scss';
import { Wrapper } from '@/shared';

const SelectedPaymentsPage = () => {
  return (
    <Wrapper size='l' className={styles['paymentLayout']}>
      <SelectedPayments type='all' />
    </Wrapper>
  );
};

export default SelectedPaymentsPage;
