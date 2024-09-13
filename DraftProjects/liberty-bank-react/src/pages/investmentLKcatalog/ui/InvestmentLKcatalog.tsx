import { Outlet } from 'react-router-dom';
import styles from './InvestmentLKcatalog.module.scss';

const InvestmentLKanalytics = () => {
  return (
    <div className={styles['catalog-main']}>
      <Outlet />
    </div>
  );
};

export default InvestmentLKanalytics;
