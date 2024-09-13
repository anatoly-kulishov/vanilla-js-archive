import { Navigate } from 'react-router-dom';
import { MyCreditRequests } from '@/widgets';
import { PATH_PAGE, Spinner, useGetCreditRequestsQuery } from '@/shared';

const CreditRequestsPage = () => {
  const { data: creditRequests, isLoading, error } = useGetCreditRequestsQuery();

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {creditRequests && <MyCreditRequests creditRequests={creditRequests} />}
    </>
  );
};

export default CreditRequestsPage;
