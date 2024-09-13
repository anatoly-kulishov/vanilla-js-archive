import { InDevelopmentModal } from '@/entities/inDevelopmentModal/inDevelopmentModal';
import styles from './productPage.module.scss';
import { useNavigate } from 'react-router-dom';

export const PaymentsPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles['payments-page']}>
      <InDevelopmentModal setIsOpen={() => navigate(-1)} />
    </div>
  );
};
