import { Outlet } from 'react-router-dom';
import styles from './InvestmentLKeducation.module.scss';

const InvestmentLKeducation = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default InvestmentLKeducation;
