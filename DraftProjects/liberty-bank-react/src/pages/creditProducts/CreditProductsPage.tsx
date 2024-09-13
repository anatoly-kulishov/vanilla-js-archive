import { Navigate } from 'react-router-dom';
import { CreditProductList, FiltersForm } from '@/widgets';
import { PATH_PAGE, Spinner, useGetCreditProductsQuery } from '@/shared';
import styles from './CreditProductsPage.module.scss';

const CreditProductsPage = () => {
  const {
    data: creditProducts,
    isLoading: creditProductsLoading,
    error: creditProductsError,
  } = useGetCreditProductsQuery();

  if (creditProductsError) {
    return <Navigate to={PATH_PAGE.error} state={{ error: creditProductsError }} replace />;
  }

  return (
    <div className={styles.wrapper}>
      {creditProductsLoading && <Spinner />}
      {creditProducts && (
        <FiltersForm type='credit' products={creditProducts}>
          <CreditProductList />
        </FiltersForm>
      )}
    </div>
  );
};

export default CreditProductsPage;
