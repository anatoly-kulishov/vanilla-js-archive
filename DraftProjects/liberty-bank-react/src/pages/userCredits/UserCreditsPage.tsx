import { Navigate } from 'react-router-dom';
import { UserCreditProductList } from '@/widgets';
import { PATH_PAGE, Spinner, useGetUserCreditProductQuery } from '@/shared';

const UserCreditsPage = () => {
  const { data: userCreditProductList, isLoading, error } = useGetUserCreditProductQuery();

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {userCreditProductList && <UserCreditProductList creditInfoList={userCreditProductList} />}
    </>
  );
};

export default UserCreditsPage;
