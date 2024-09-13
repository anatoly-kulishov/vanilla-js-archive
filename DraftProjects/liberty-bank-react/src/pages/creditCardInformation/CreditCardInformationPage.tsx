import { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { CardProduct } from '@/entities';
import {
  CardsList,
  PATH_PAGE,
  Spinner,
  transformationDetailsCard,
  useGetCreditCardProductInfoQuery,
} from '@/shared';
import { MOCK_DETAILS } from './mocks';
import styles from './CreditCardInformationPage.module.scss';

const CreditCardInformation: FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Navigate to={PATH_PAGE.cardProducts} replace />;
  }

  const { data: creditCardInfo, isLoading, error } = useGetCreditCardProductInfoQuery(id);

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {creditCardInfo && (
        <div className={styles.wrapper}>
          <CardProduct
            id={id}
            typeName={creditCardInfo.level}
            currency={[creditCardInfo.currency]}
            paymentSystem={[creditCardInfo.paymentSystem]}
            name={creditCardInfo.name}
            maxSum={[creditCardInfo.maxSum]}
            costPerMonth={[creditCardInfo.costPerMonth]}
            validityTerm={creditCardInfo.validityTerm}
            interestRate={creditCardInfo.interestRate}
          />
          <CardsList cards={transformationDetailsCard(MOCK_DETAILS)} />
        </div>
      )}
    </>
  );
};

export default CreditCardInformation;
