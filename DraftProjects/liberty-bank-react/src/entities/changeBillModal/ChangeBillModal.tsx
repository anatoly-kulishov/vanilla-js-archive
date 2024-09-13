import { FC } from 'react';

import { MODAL_TEXT } from './constants.ts';
import { CardType, InfoFrame, Modal } from '@/shared';

interface ChangeAccountNameModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  hideModal: () => void;
  onPrimaryButtonClick: () => void;
  onSecondaryButtonClick?: () => void;
}

export const ChangeAccountNameModal: FC<ChangeAccountNameModalProps> = ({
  isOpen,
  setIsOpen,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <InfoFrame
        icon={{
          width: '300',
          height: '300',
          image: 'frame',
        }}
        onCloseClick={setIsOpen}
        primaryBtnText={MODAL_TEXT.text}
        title={MODAL_TEXT.title}
        cardType={CardType.closeBill}
        onPrimaryButtonClick={onPrimaryButtonClick}
        onSecondaryButtonClick={onSecondaryButtonClick}
      />
    </Modal>
  );
};
