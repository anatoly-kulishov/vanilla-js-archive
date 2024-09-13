import { PATH_PAGE, Spinner, useGetInfoDepositFormQuery } from '@/shared';
import { DepositForm } from '@/widgets';
import { Navigate, useParams } from 'react-router-dom';

const DepositApplicationPage = () => {
  const { id } = useParams();
  const { data: infoDepositForm, isLoading, error } = useGetInfoDepositFormQuery(id ?? '');

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }
  return (
    <>
      {isLoading && <Spinner />}
      {infoDepositForm && <DepositForm infoDepositForm={infoDepositForm} />}
    </>
  );
};

export default DepositApplicationPage;
