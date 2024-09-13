import { Navigate } from 'react-router-dom';
import { DepositHistoryList } from '@/widgets';
import { PATH_PAGE, Spinner, useGetDepositsHistoryQuery } from '@/shared';

const DepositHistoryPage = () => {
  const { error, data: depositsHistoryList, isLoading } = useGetDepositsHistoryQuery();

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {depositsHistoryList && <DepositHistoryList deposits={depositsHistoryList} />}
    </>
  );
};

export default DepositHistoryPage;
