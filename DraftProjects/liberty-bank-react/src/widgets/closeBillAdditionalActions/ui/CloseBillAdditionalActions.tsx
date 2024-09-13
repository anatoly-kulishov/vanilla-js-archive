import { useNavigate } from 'react-router-dom';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { CardType, InfoFrame, PATH_PAGE } from '@/shared';
import { TEXT } from '../model/constants';
import { Reason } from '../model/types';

interface Props {
  error?: FetchBaseQueryError | SerializedError;
  cancelHandle: () => void;
}

export const CloseBillAdditionalActions = ({ error, cancelHandle }: Props) => {
  const navigate = useNavigate();

  const transferHandle = () => {
    navigate(PATH_PAGE.transfers.home);
  };

  if (error) {
    if ('data' in error) {
      const data = error.data;
      if (data && typeof data === 'object' && 'message' in data) {
        const errorMessage = data.message;

        return errorMessage === Reason.MORE ? (
          <InfoFrame
            icon={{ width: '244', height: '200', image: 'choiceIsYesNo' }}
            primaryBtnText={TEXT.transfer}
            secondaryBtnText={TEXT.backToBill}
            title={TEXT.moreTitle}
            cardType={CardType.closeBill}
            underImageTitle={TEXT.moreUnderImageTitle}
            underImageSubTitle={TEXT.moreUnderImageSubTitle}
            onPrimaryButtonClick={transferHandle}
            onSecondaryButtonClick={cancelHandle}
          />
        ) : (
          <InfoFrame
            icon={{ width: '244', height: '200', image: 'choiceIsYesNo' }}
            primaryBtnText={TEXT.transfer}
            secondaryBtnText={TEXT.backToBill}
            title={TEXT.lessTitle}
            subTitle={TEXT.lessSubTitle}
            cardType={CardType.closeBill}
            onPrimaryButtonClick={transferHandle}
            onSecondaryButtonClick={cancelHandle}
          />
        );
      }
    }
  }
};
