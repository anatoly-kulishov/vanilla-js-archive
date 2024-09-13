import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  IReportCreditRequest,
  PATH_PAGE,
  REQUEST_STATUS_TEXT,
  REQUEST_STATUS_TYPE,
  StatusLabel,
  Text,
  formatDate,
  formatInterestRate,
  formatNumberWithSpaces,
  pluralize,
} from '@/shared';
import { TEXT_REPORT } from './constants';
import styles from './CreditRequestReport.module.scss';

interface ICreditRequestReport {
  dataForReport: IReportCreditRequest;
}

export const CreditRequestReport: FC<ICreditRequestReport> = ({ dataForReport }) => {
  const {
    name,
    creationDate,
    interestRate,
    amount,
    status,
    currencyCode,
    periodMonths,
    deliveryInCash,
    typeCredit,
    calculationMode,
    rateIsAdjustable,
  } = dataForReport;
  const navigate = useNavigate();

  const onClickToRequests = () => {
    navigate(PATH_PAGE.creditRequests);
  };

  return (
    <div className={styles.reportForm}>
      <Text tag='h2' className={styles.titleReport}>
        {TEXT_REPORT.title}
      </Text>

      <table className={styles.reportTable}>
        <tbody className={styles.reportBody}>
          <tr className={styles.reportTr}>
            <td className={styles.reportTd}>{TEXT_REPORT.nameCreditProduct}</td>
            <td className={styles.reportTd}>{name}</td>
          </tr>
          <tr className={styles.reportTr}>
            <td className={styles.reportTd}>{TEXT_REPORT.creationDateRequest}</td>
            <td className={styles.reportTd}>{formatDate(creationDate)}</td>
          </tr>
          <tr className={styles.reportTr}>
            <td className={styles.reportTd}>{TEXT_REPORT.statusRequest}</td>
            <td className={styles.reportTd}>
              <StatusLabel type={REQUEST_STATUS_TYPE[status]} text={REQUEST_STATUS_TEXT[status]} />
            </td>
          </tr>
          <tr className={styles.reportTr}>
            <td className={styles.reportTd}>{TEXT_REPORT.interestRate}</td>
            <td className={styles.reportTd}>{formatInterestRate(interestRate)}% годовых</td>
          </tr>
          <tr className={styles.reportTr}>
            <td className={styles.reportTd}>{TEXT_REPORT.requestCreditAmount}</td>
            <td className={styles.reportTd}>{formatNumberWithSpaces(amount, 2)}</td>
          </tr>
          <tr className={styles.reportTr}>
            <td className={styles.reportTd}>{TEXT_REPORT.currencyCredit}</td>
            <td className={styles.reportTd}>{currencyCode}</td>
          </tr>
          <tr className={styles.reportTr}>
            <td className={styles.reportTd}>{TEXT_REPORT.requestCreditPeriod}</td>
            <td className={styles.reportTd}>
              {pluralize(periodMonths, ['месяц', 'месяца', 'месяцев'])}
            </td>
          </tr>
          <tr className={styles.reportTr}>
            <td className={styles.reportTd}>{TEXT_REPORT.methodObtaining}</td>
            <td className={styles.reportTd}>
              {deliveryInCash ? TEXT_REPORT.cash : TEXT_REPORT.card}
            </td>
          </tr>
          <tr className={styles.reportTr}>
            <td className={styles.reportTd}>{TEXT_REPORT.typeCredit}</td>
            <td className={styles.reportTd}>
              {typeCredit === 'CONSUMER' ? TEXT_REPORT.consumer : TEXT_REPORT.target}
            </td>
          </tr>
          <tr className={styles.reportTr}>
            <td className={styles.reportTd}>{TEXT_REPORT.paymentCalculationScheme}</td>
            <td className={styles.reportTd}>
              {calculationMode === 'DIFFERENTIATED'
                ? TEXT_REPORT.differentiated
                : TEXT_REPORT.annuity}
            </td>
          </tr>
          <tr className={styles.reportTr}>
            <td className={styles.reportTd}>{TEXT_REPORT.typeRate}</td>
            <td className={styles.reportTd}>
              {rateIsAdjustable ? TEXT_REPORT.linkedToCP : TEXT_REPORT.fixed}
            </td>
          </tr>
        </tbody>
      </table>

      <div className={styles.buttonContainerReport}>
        <Button className={styles.button}>{TEXT_REPORT.getReport}</Button>
        <Button onClick={onClickToRequests} className={styles.button}>
          {TEXT_REPORT.requestStatus}
        </Button>
      </div>
    </div>
  );
};
