import { FC } from 'react';
import { InfoFrame, CardType } from '@/shared';
import { PROLONGATION_MODAL } from '../../constants';

interface IRenewalStatus {
  autoRenewal: boolean;
  handleCancel: () => void;
}

export const RenewalStatus: FC<IRenewalStatus> = ({ autoRenewal, handleCancel }) => {
  if (autoRenewal) {
    return (
      <InfoFrame
        title={PROLONGATION_MODAL.titleProlongationDone}
        icon={{ width: '244', height: '200', image: 'frame' }}
        primaryBtnText={PROLONGATION_MODAL.backToMainBtnText}
        cardType={CardType.applicationDeclined}
        onPrimaryButtonClick={handleCancel}
      />
    );
  }

  return (
    <InfoFrame
      title={PROLONGATION_MODAL.titleProlongationRemoved}
      icon={{ width: '244', height: '200', image: 'frame' }}
      primaryBtnText={PROLONGATION_MODAL.backToMainBtnText}
      cardType={CardType.applicationDeclined}
      onPrimaryButtonClick={handleCancel}
    />
  );
};
