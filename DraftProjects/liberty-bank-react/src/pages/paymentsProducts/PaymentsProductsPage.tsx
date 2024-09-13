import { SelectedPaymentCard } from '@/entities/selectedPaymentCard';
import styles from './PaymentsProductsPage.module.scss';
import { NAV_LINKS, MOCK_DATA, matchingParams, ERROR_ANSWER } from './constants';
import { NavBar } from '@/widgets';
import { Link, useParams } from 'react-router-dom';

const PaymentsProductsPage = () => {
  const productName = useParams().productName;

  return MOCK_DATA?.category.length ? (
    <>
      <NavBar links={NAV_LINKS} type='content' />
      <div className={styles['cards']}>
        {MOCK_DATA.category.map(
          (category) =>
            category.name === matchingParams[productName || 'communication'] &&
            category.subCategory.map((card) => (
              <Link key={card.title} state={card.title} to={card.path}>
                <SelectedPaymentCard paymentName={card.title} />
              </Link>
            )),
        )}
      </div>
    </>
  ) : (
    <div>{ERROR_ANSWER}</div>
  );
};

export default PaymentsProductsPage;
