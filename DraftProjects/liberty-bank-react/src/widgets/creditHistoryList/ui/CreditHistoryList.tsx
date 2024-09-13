import { FC } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { CreditHistoryProduct } from '@/entities';
import {
  CardType,
  ICreditHistoryProduct,
  InfoFrame,
  PATH_PAGE,
  Spinner,
  useGetUserCreditProductQuery,
} from '@/shared';
import { INFO_FRAME_TEXT, MESSAGE_ICON } from '../constants';
import styles from './CreditHistoryList.module.scss';

interface ICreditHistoryList {
  credits: ICreditHistoryProduct[];
}

export const CreditHistoryList: FC<ICreditHistoryList> = ({ credits }) => {
  const navigate = useNavigate();
  const { data: userCreditList, isLoading, error } = useGetUserCreditProductQuery();

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  const handleNavigate = () => {
    if (userCreditList && userCreditList.length !== 0) {
      navigate(PATH_PAGE.myCredits);
    } else {
      navigate(PATH_PAGE.creditProducts);
    }
  };

  const handleButtonText =
    userCreditList && userCreditList.length !== 0
      ? INFO_FRAME_TEXT.goToUserCredits
      : INFO_FRAME_TEXT.goToBankCredits;

  const frameTitle =
    userCreditList && userCreditList.length !== 0
      ? INFO_FRAME_TEXT.noRepaidCreditsTitle
      : INFO_FRAME_TEXT.noIssuedCreditsTitle;

  return (
    <>
      {isLoading && <Spinner />}
      <div className={styles.container}>
        {credits?.length ? (
          <ul className={styles.credits_wrapper}>
            {credits.map((credit) => (
              <CreditHistoryProduct key={credit.id} {...credit} />
            ))}
          </ul>
        ) : (
          <div className={styles.frame_wrapper}>
            <InfoFrame
              icon={MESSAGE_ICON}
              title={frameTitle}
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
