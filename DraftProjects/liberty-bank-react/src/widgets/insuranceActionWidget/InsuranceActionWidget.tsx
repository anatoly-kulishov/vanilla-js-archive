import { Button, Modal, Text } from '@/shared';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InsuranceActionWidget.module.scss';
import { InDevelopmentModal } from '@/entities/inDevelopmentModal/inDevelopmentModal.tsx';

type ButtonType = { sendButtonText: string; path?: string };

interface InsuranceActionWidgetProps {
  actionButtons: ButtonType[];
  actionTitle: string;
  productId: number;
  style?: React.CSSProperties;
  handleAction?: () => void;
}

export const InsuranceActionWidget: FC<InsuranceActionWidgetProps> = ({
  actionButtons,
  actionTitle,
  productId,
  style,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <div
      className={styles['action-block']}
      data-testid='action-block'
      style={{ background: style?.backgroundColor }}
    >
      <Text tag='span' size='xl' weight='bold' className={styles['action-title']}>
        {actionTitle}
      </Text>
      <div className={styles['buttons-container']}>
        {actionButtons.map((button) => (
          <Button
            key={button.sendButtonText}
            theme='secondary'
            className={styles['send-ticket-button']}
            onClick={
              button.path
                ? () => navigate(button.path as string, { state: productId })
                : () => setIsOpen(true)
            }
            type='button'
          >
            {button.sendButtonText}
          </Button>
        ))}
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <InDevelopmentModal setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
};
