import { FC } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { DepositHistoryProduct } from '@/entities';
import {
  CardType,
  IDepositHistoryProduct,
  InfoFrame,
  PATH_PAGE,
  Spinner,
  useGetUsersDepositsQuery,
} from '@/shared';
import { INFO_FRAME_TEXT, MESSAGE_ICON } from '../constants';
import styles from './DepositHistoryList.module.scss';

interface IDepositHistoryList {
  deposits: IDepositHistoryProduct[];
}

export const DepositHistoryList: FC<IDepositHistoryList> = ({ deposits }) => {
  const navigate = useNavigate();
  const { error, data: userDepositList, isLoading } = useGetUsersDepositsQuery();

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  const handleNavigate = () => {
    if (userDepositList && userDepositList.length !== 0) {
      navigate(PATH_PAGE.myDeposits);
    } else {
      navigate(PATH_PAGE.depositProducts);
    }
  };

  const handleButtonText =
    userDepositList && userDepositList.length !== 0
      ? INFO_FRAME_TEXT.goToUserDeposits
      : INFO_FRAME_TEXT.goToBankDeposits;

  return (
    <>
      {isLoading && <Spinner />}
      <div className={styles.container}>
        {deposits?.length ? (
          <ul className={styles.deposits_wrapper}>
            {deposits.map((deposit) => (
              <DepositHistoryProduct key={deposit.depositId} {...deposit} />
            ))}
          </ul>
        ) : (
          <div className={styles.frame_wrapper}>
            <InfoFrame
              icon={MESSAGE_ICON}
              title={INFO_FRAME_TEXT.title}
              cardType={CardType.dontOpen}
              primaryBtnText={handleButtonText}
              onPrimaryButtonClick={handleNavigate}
            />
          </div>
        )}
      </div>
    </>
  );
};
