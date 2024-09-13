import { PATH_PAGE, Spinner, useGetUserDepositProductInfoQuery } from '@/shared';
import { UserDepositInfo } from '@/widgets';
import { Navigate, useParams } from 'react-router';

const UserDepositInformationPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: userDepositInfo, error, isLoading } = useGetUserDepositProductInfoQuery(id ?? '');

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {userDepositInfo && <UserDepositInfo userDepositInfo={userDepositInfo} id={id} />}
    </>
  );
};

export default UserDepositInformationPage;
