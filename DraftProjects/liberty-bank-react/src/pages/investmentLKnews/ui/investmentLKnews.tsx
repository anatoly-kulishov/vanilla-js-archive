import { Outlet } from 'react-router-dom';
import styles from './investmentLKnews.module.scss';

const InvestmentLKnews = () => {
  return (
    <div className={styles['analytics-main']}>
      <Outlet />
    </div>
  );
};

export default InvestmentLKnews;
