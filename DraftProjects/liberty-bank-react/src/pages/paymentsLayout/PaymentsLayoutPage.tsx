import { Wrapper } from '@/shared';
import { Outlet } from 'react-router-dom';
import styles from './PaymentsLayoutPage.module.scss';
import { SelectedPayments } from '@/widgets/selectedPayments';

const PaymentsLayoutPage = () => {
  return (
    <Wrapper size='l' className={styles['paymentLayout']}>
      <SelectedPayments type='limit' />
      <Outlet />
    </Wrapper>
  );
};

export default PaymentsLayoutPage;
