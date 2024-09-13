import { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { CreditForm } from '@/widgets';
import { GetInfoCreditForm } from '@/entities';
import { PATH_PAGE, Spinner, useGetInfoCreditFormQuery } from '@/shared';
import { createMaxCreditRequestError } from './utils';

export const CreditFormPage: FC = () => {
  const { id } = useParams();
  const {
    data: infoCreditForm,
    isLoading,
    error,
  } = useGetInfoCreditFormQuery<GetInfoCreditForm>(id ?? '');

  if (error?.status === 429) {
    return <Navigate to={PATH_PAGE.error} state={createMaxCreditRequestError(error)} replace />;
  }

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {infoCreditForm && <CreditForm infoCreditForm={infoCreditForm} />}
    </>
  );
};

export default CreditFormPage;
