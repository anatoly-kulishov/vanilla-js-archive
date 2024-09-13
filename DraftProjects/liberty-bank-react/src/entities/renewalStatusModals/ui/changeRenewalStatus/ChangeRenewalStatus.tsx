import { FC } from 'react';
import { InfoFrame, CardType } from '@/shared';
import { PROLONGATION_MODAL } from '../../constants';

interface IChangeRenewalStatus {
  autoRenewal: boolean;
  handleOpenRenewalStatusModal: () => void;
  handleCancel: () => void;
}

export const ChangeRenewalStatus: FC<IChangeRenewalStatus> = ({
  autoRenewal,
  handleOpenRenewalStatusModal,
  handleCancel,
}) => {
  if (autoRenewal) {
    return (
      <InfoFrame
        title={PROLONGATION_MODAL.titleIsRefusalProlongation}
        icon={{ width: '244', height: '200', image: 'close-bill' }}
        primaryBtnText={PROLONGATION_MODAL.cancel}
        onSecondaryButtonClick={handleOpenRenewalStatusModal}
        cardType={CardType.applicationDeclined}
        onPrimaryButtonClick={handleCancel}
        secondaryBtnText={PROLONGATION_MODAL.yes}
      />
    );
  }

  return (
    <InfoFrame
      title={PROLONGATION_MODAL.titleIsAgreeProlongation}
      icon={{ width: '244', height: '200', image: 'close-bill' }}
      primaryBtnText={PROLONGATION_MODAL.cancel}
      onSecondaryButtonClick={handleOpenRenewalStatusModal}
      cardType={CardType.applicationDeclined}
      onPrimaryButtonClick={handleCancel}
      secondaryBtnText={PROLONGATION_MODAL.yes}
    />
  );
};
