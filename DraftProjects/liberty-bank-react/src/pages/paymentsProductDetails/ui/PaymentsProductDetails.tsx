import styles from './PaymentsProductDetails.module.scss';
import { FC } from 'react';
import { PATH_PAGE, Text } from '@/shared';
import { useLocation, useParams, Navigate } from 'react-router-dom';
import { PAYMENT_NAV_LINKS_PRODUCTS, PRODUCT_RUS_VALUE } from '../const';
import { BackNavBar } from '@/features';
import { PaymentsProductsForm } from '@/widgets';

interface PaymentsProductDetailsProps {}

const PaymentsProductDetails: FC<PaymentsProductDetailsProps> = () => {
  const { productName, product } = useParams();
  const productOperator = useLocation();

  if (productName == undefined || product == undefined) {
    return;
  }

  if (!productOperator.state) {
    return <Navigate to={`${PATH_PAGE.payments}/products/${productName}/${product}`} />;
  }

  return (
    <div className={styles['product-details']}>
      <BackNavBar links={[PAYMENT_NAV_LINKS_PRODUCTS[productName], PRODUCT_RUS_VALUE[product]]} />
      <Text tag='h4' size='m' weight='medium'>
        {productOperator.state}
      </Text>
      <PaymentsProductsForm />
    </div>
  );
};
export default PaymentsProductDetails;
