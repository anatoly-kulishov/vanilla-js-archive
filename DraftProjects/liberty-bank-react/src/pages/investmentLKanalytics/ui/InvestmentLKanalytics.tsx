import { Outlet } from 'react-router-dom';
import styles from './InvestmentLKanalytics.module.scss';

const InvestmentLKanalytics = () => {
  return (
    <div className={styles['analytics-main']}>
      <Outlet />
    </div>
  );
};

export default InvestmentLKanalytics;
