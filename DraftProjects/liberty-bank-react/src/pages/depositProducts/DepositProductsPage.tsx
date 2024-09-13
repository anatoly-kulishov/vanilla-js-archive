import { Navigate } from 'react-router-dom';
import { DepositProductList, FiltersForm } from '@/widgets';
import { CardType, InfoFrame, PATH_PAGE, Spinner, useGetDepositProductsQuery } from '@/shared';
import { MESSAGE_ICON, TITLE_TEXT } from './constants';
import styles from './DepositProductsPage.module.scss';

const DepositProductsPage = () => {
  const { data: depositProducts, isLoading, isSuccess, error } = useGetDepositProductsQuery();

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  if (isSuccess && depositProducts.length === 0) {
    return (
      <div className={styles.infoWrapper}>
        <InfoFrame icon={MESSAGE_ICON} cardType={CardType.dontOpen} title={TITLE_TEXT} />
      </div>
    );
  }

  return (
    <>
      {isLoading && <Spinner />}
      {depositProducts && (
        <FiltersForm type='deposit' products={depositProducts}>
          <DepositProductList />
        </FiltersForm>
      )}
    </>
  );
};

export default DepositProductsPage;
