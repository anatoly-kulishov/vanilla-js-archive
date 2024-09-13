import styles from './InsuranceOrdersPage.module.scss';
import {
  Modal,
  Preloader,
  getAccessToken,
  getCustomerId,
  useGetInsuranceOrdersQuery,
} from '@/shared';
import { OrderCard } from '@/entities/orderCard';
import { useState } from 'react';
import { InDevelopmentModal } from '@/entities/inDevelopmentModal/inDevelopmentModal';

const id = getCustomerId(getAccessToken() as string);

const InsuranceOrdersPage = () => {
  const { data, isLoading, isError, isSuccess } = useGetInsuranceOrdersQuery(id);
  const [isOpen, setIsOpen] = useState(false);
  return isLoading ? (
    <Preloader />
  ) : (
    <>
      {isError && 'Что-то пошло не так'}
      {isSuccess && (
        <div className={styles['active-policies-container']}>
          {data.map((policy) => (
            <OrderCard key={policy.submissionDate} {...policy} onClick={() => setIsOpen(true)} />
          ))}
        </div>
      )}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <InDevelopmentModal setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
};

export default InsuranceOrdersPage;
