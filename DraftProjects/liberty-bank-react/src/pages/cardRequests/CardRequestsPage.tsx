import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { CardRequests } from '@/widgets';
import { PATH_PAGE, Spinner, useGetCreditCardRequestsQuery } from '@/shared';

const CardRequestsPage: FC = () => {
  const { data: cardRequests, isLoading, error } = useGetCreditCardRequestsQuery();

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {cardRequests && <CardRequests cardRequests={cardRequests} />}
    </>
  );
};

export default CardRequestsPage;
