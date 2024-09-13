import { Navigate } from 'react-router-dom';
import { CreditHistoryList } from '@/widgets';
import { PATH_PAGE, Spinner, useGetUserCreditHistoryQuery } from '@/shared';

const CreditRequestsPage = () => {
  const { data: creditHistory, isLoading, error } = useGetUserCreditHistoryQuery();

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {creditHistory && <CreditHistoryList credits={creditHistory} />}
    </>
  );
};

export default CreditRequestsPage;
