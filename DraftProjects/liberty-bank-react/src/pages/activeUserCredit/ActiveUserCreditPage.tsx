import { PATH_PAGE, Spinner, useGetCurrentCreditQuery } from '@/shared';
import { ActiveUserCreditProduct } from '@/widgets';
import { Navigate, useParams } from 'react-router-dom';

const ActiveUserCreditPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: currentUserCreditInfo, isLoading, error } = useGetCurrentCreditQuery(id ?? '');

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {currentUserCreditInfo && <ActiveUserCreditProduct {...currentUserCreditInfo} />}
    </>
  );
};

export default ActiveUserCreditPage;
