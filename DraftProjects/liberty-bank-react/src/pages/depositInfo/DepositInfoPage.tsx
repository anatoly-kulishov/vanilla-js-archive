import { PATH_PAGE, Spinner, useGetDepositProductDetailsQuery } from '@/shared';
import { DepositInfo } from '@/widgets';
import { Navigate, useParams } from 'react-router-dom';

const DepositInfoPage = () => {
  const { id } = useParams();

  const {
    data: depositProductDetails,
    isLoading,
    error,
  } = useGetDepositProductDetailsQuery(id ?? '');

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {depositProductDetails && <DepositInfo depositProduct={depositProductDetails} />}
    </>
  );
};

export default DepositInfoPage;
