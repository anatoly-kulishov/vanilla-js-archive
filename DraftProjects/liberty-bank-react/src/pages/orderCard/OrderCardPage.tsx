import { OrderCardFormLSKeys, orderCardFormLSApi } from '@/entities/cardForm';
import { OrderCard } from '@/features/orderCard';
import { BackButton, PATH_PAGE } from '@/shared';
import { Text } from '@/shared/ui/text/Text';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import styles from './OrderCardPage.module.scss';
import { PAGE_TITLES, TEXT } from './constants';

const OrderCardPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const productType = query.get('productType');

  const [currentIndex, setCurrentIndex] = useState(
    orderCardFormLSApi.getValue(OrderCardFormLSKeys.PAGE_INDEX) ?? 0,
  );

  if (!productType) {
    return <Navigate to={PATH_PAGE.error} />;
  }

  return (
    <div className={styles['order-card-page']}>
      <BackButton
        className={styles['order-card-page__back-button']}
        text={TEXT.back}
        theme='blue'
        height='24'
        width='24'
      />
      <Text tag='h2' size='m' weight='medium' className={styles['order-card-page__title']}>
        {PAGE_TITLES[currentIndex] ?? TEXT.defaultPageTitle}
      </Text>
      <div className={styles['order-card-page__form-wrapper']}>
        {productType && (
          <OrderCard
            productType={productType}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </div>
    </div>
  );
};

export default OrderCardPage;
