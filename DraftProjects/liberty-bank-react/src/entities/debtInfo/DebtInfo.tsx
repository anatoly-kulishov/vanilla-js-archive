import { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import {
  Button,
  CURRENCY,
  CurrencyCode,
  PATH_PAGE,
  Preloader,
  Text,
  formatNumberWithSpaces,
  useGetCreditDebtInfoQuery,
} from '@/shared';
import { getDateFromArray } from './utils';
import { TEXT } from './constants';
import styles from './DebtInfo.module.scss';

interface IDebtInfo {
  currencyCode: CurrencyCode;
  hideDebtInfoModal: () => void;
  openUnavailableModal: () => void;
}

export const DebtInfo: FC<IDebtInfo> = ({
  currencyCode,
  hideDebtInfoModal,
  openUnavailableModal,
}) => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to={PATH_PAGE.myCreditInfo} replace />;
  }

  const { data: dataDebtInfo, isLoading, error } = useGetCreditDebtInfoQuery(id);

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  const payButtonHandler = () => {
    hideDebtInfoModal();
    openUnavailableModal();
  };

  return (
    <>
      {isLoading && <Preloader />}
      {dataDebtInfo && (
        <div className={styles.paymentSchedule}>
          <Text tag='h1' weight='medium' size='xl' className={styles.paymentSchedule__title}>
            {TEXT.title}
          </Text>

          <div className={styles.paymentSchedule__block}>
            <div className={styles.paymentSchedule__textField}>
              <Text tag='h2' weight='medium' size='m' className={styles.paymentSchedule__title}>
                {TEXT.resultDebt}:
              </Text>
              <Text tag='h2' weight='medium' size='m' className={styles.paymentSchedule__title}>
                {formatNumberWithSpaces(dataDebtInfo.generalDebt)} {CURRENCY[currencyCode].text}
              </Text>
            </div>

            <div className={styles.paymentSchedule__textField}>
              <Text tag='h2' weight='medium' size='m' className={styles.paymentSchedule__title}>
                {TEXT.percentCreditPayment}:
              </Text>
              <Text tag='h2' weight='medium' size='m' className={styles.paymentSchedule__title}>
                {formatNumberWithSpaces(dataDebtInfo.percentCreditPayment)}{' '}
                {CURRENCY[currencyCode].text}
              </Text>
            </div>

            <div className={styles.paymentSchedule__textField}>
              <Text tag='h2' weight='medium' size='m' className={styles.paymentSchedule__title}>
                {TEXT.monthPaymentAmount}:
              </Text>
              <Text tag='h2' weight='medium' size='m' className={styles.paymentSchedule__title}>
                {formatNumberWithSpaces(dataDebtInfo.monthPayment)} {CURRENCY[currencyCode].text}
              </Text>
            </div>

            <div className={styles.paymentSchedule__textField}>
              <Text tag='h2' weight='medium' size='m' className={styles.paymentSchedule__title}>
                {TEXT.nextPaymentDate}:
              </Text>
              <Text tag='h2' weight='medium' size='m' className={styles.paymentSchedule__title}>
                {getDateFromArray(dataDebtInfo.paymentDate)}
              </Text>
            </div>
          </div>

          <div className={styles.paymentSchedule__buttons}>
            <Button theme='secondary' onClick={hideDebtInfoModal}>
              {TEXT.cancelButtonText}
            </Button>
            <Button theme='primary' onClick={payButtonHandler}>
              {TEXT.payButtonText}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
