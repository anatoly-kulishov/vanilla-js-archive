import { FC } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { CreditRequestReport } from '@/entities';
import { InfoFrame, CardType, PATH_PAGE, useGetReportCreditQuery, Spinner } from '@/shared';
import { infoFrameText, failedOpenedCredit } from '../constants';
import styles from './CreditForm.module.scss';

interface IResultFrame {
  submitStatus: boolean;
  updateSubmitState: (bool: boolean) => void;
  id: number;
}

export const ResultFrame: FC<IResultFrame> = ({ submitStatus, updateSubmitState, id }) => {
  const { data: dataForReport, isLoading, error } = useGetReportCreditQuery(id);
  const navigate = useNavigate();

  const onClickToCreditForm = () => {
    navigate(PATH_PAGE.creditProducts);
  };
  const onClickToCreditProducts = () => {
    updateSubmitState(false);
  };

  if (error) return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;

  return (
    <div className={styles.resultForm}>
      {submitStatus ? (
        <>
          {isLoading && <Spinner />}
          {dataForReport && <CreditRequestReport dataForReport={dataForReport} />}
        </>
      ) : (
        <InfoFrame
          title={infoFrameText.titleFailed}
          primaryBtnText={infoFrameText.reapply}
          onPrimaryButtonClick={onClickToCreditProducts}
          secondaryBtnText={infoFrameText.creditList}
          onSecondaryButtonClick={onClickToCreditForm}
          cardType={CardType.applicationDeclined}
          icon={failedOpenedCredit}
        />
      )}
    </div>
  );
};
