import styles from './PaymentProductService.module.scss';
import { FC } from 'react';
import { Input, Text } from '@/shared';
import { SelectedPaymentCard } from '@/entities/selectedPaymentCard';
import { MOCK_PRODUCTS } from '../const';
import { Link, useParams } from 'react-router-dom';
import { BackNavBar } from '@/features';
import {
  PAYMENT_NAV_LINKS_PRODUCTS,
  PRODUCT_RUS_VALUE,
} from '@/pages/paymentsProductDetails/const';

interface PaymentProductServiceProps {}

const PaymentProductService: FC<PaymentProductServiceProps> = () => {
  const { productName, product } = useParams();

  if (productName == undefined || product == undefined) {
    throw new Error('Неверный url');
  }

  return (
    <div className={styles['product-service']}>
      <BackNavBar links={[PAYMENT_NAV_LINKS_PRODUCTS[productName]]} />
      <Text tag='h3'>{PRODUCT_RUS_VALUE[product].title}</Text>
      <Input.Search placeholder='Поиск' />
      <div className={styles['cards']}>
        {MOCK_PRODUCTS[productName][product]
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((card) => (
            <Link key={card.title} state={card.title} to={card.path}>
              <SelectedPaymentCard paymentName={card.title} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PaymentProductService;
