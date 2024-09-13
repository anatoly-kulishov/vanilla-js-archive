import { FC, useState } from 'react';
import { USER_REVOKE_DEPOSIT_TEXT } from './constants';
import { InfoFrame, CardType, usePostUserDepositRecallMutation } from '@/shared';

interface IRevokeUserDeposit {
  hideRevokeModal: () => void;
  depAccountNumber: string;
}

export const RevokeUserDeposit: FC<IRevokeUserDeposit> = ({
  hideRevokeModal,
  depAccountNumber,
}) => {
  const [isRevokeQuestionModal, setIsRevokeQuestionModal] = useState(true);
  const [postUserDepositRecall] = usePostUserDepositRecallMutation();

  const handleAcceptRevoke = () => {
    postUserDepositRecall({ isActive: false, mainDepAccountNumber: depAccountNumber });
    setIsRevokeQuestionModal(false);
  };

  if (isRevokeQuestionModal) {
    return (
      <InfoFrame
        title={USER_REVOKE_DEPOSIT_TEXT.revokeQuestion}
        icon={{ width: '244', height: '200', image: 'close-bill' }}
        primaryBtnText={USER_REVOKE_DEPOSIT_TEXT.revokeButtonCancel}
        onSecondaryButtonClick={handleAcceptRevoke}
        cardType={CardType.applicationDeclined}
        onPrimaryButtonClick={hideRevokeModal}
        secondaryBtnText={USER_REVOKE_DEPOSIT_TEXT.revokeButtonYes}
      />
    );
  }

  return (
    <InfoFrame
      title={USER_REVOKE_DEPOSIT_TEXT.revokeStatusSuccess}
      icon={{ width: '244', height: '200', image: 'frame' }}
      secondaryBtnText={USER_REVOKE_DEPOSIT_TEXT.revokeButtonBackToMainPage}
      cardType={CardType.applicationDeclined}
      onSecondaryButtonClick={hideRevokeModal}
      primaryBtnText={USER_REVOKE_DEPOSIT_TEXT.revokeButtonSendBill}
      onPrimaryButtonClick={() => {}}
    />
  );
};
