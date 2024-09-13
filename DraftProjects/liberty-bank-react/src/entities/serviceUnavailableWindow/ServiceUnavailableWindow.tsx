import { FC } from 'react';
import { InfoFrame, CardType } from '@/shared';
import { SERVICE_UNAVAILABLE_TEXT } from './constants';

interface IServiceUnavailableWindow {
  hideModal: () => void;
}

export const ServiceUnavailableWindow: FC<IServiceUnavailableWindow> = ({ hideModal }) => {
  return (
    <InfoFrame
      icon={{ width: '227', height: '200', image: 'service-unavailable' }}
      primaryBtnText={SERVICE_UNAVAILABLE_TEXT.goBack}
      underImageTitle={SERVICE_UNAVAILABLE_TEXT.infoMessage}
      cardType={CardType.serviceUnavailable}
      onPrimaryButtonClick={hideModal}
    />
  );
};
