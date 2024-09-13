import { Navigate, useParams } from 'react-router-dom';
import { CreditApplication } from '@/widgets';
import { GetInfoCreditForm } from '@/entities';
import {
  CardsList,
  PATH_PAGE,
  Spinner,
  Text,
  transformationDetailsCard,
  useGetCreditProductDetailsQuery,
  useGetInfoCreditFormQuery,
} from '@/shared';
import styles from './CreditInformationPage.module.scss';

const CreditInformationPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: creditProductData, error, isLoading } = useGetCreditProductDetailsQuery(id ?? '');
  const { isLoading: isCreditInfoLoading, error: creditInfoError } =
    useGetInfoCreditFormQuery<GetInfoCreditForm>(String(id));

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  return (
    <div className={styles.container}>
      {isLoading && <Spinner />}
      {creditProductData && (
        <>
          <Text tag='h1' weight='bold'>
            {creditProductData.name}
          </Text>
          <div className={styles.creditWrapper}>
            <CreditApplication
              creditProduct={creditProductData}
              disabled={creditInfoError?.status === 429}
              isLoading={isCreditInfoLoading}
            />
            <CardsList cards={transformationDetailsCard(creditProductData.creditDetails)} />
          </div>
        </>
      )}
    </div>
  );
};

export default CreditInformationPage;
