import React, { FC } from 'react';
import { Button, Image, Text } from '@/shared';
import styles from './inDevelopmentModal.module.scss';
import { CloseButton } from '@/shared/ui/closeButton/closeButton';

interface IModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InDevelopmentModal: FC<IModalProps> = ({ setIsOpen }) => {
  return (
    <div className={styles['body-block']}>
      <div className={styles['body-container']}>
        <CloseButton onClick={() => setIsOpen(false)} />
        <div className={styles['svg-container']}>
          <Image image={'in-development'} widthAndHeight={'300px'} />
          <Text tag={'p'} className={styles['text-title']}>
            Извините, данный раздел находится в разработке, в скором времени все будет готово
          </Text>
          <Button
            size='m'
            width='max'
            className={styles['back-button']}
            onClick={() => setIsOpen(false)}
          >
            Вернуться на шаг назад
          </Button>
        </div>
      </div>
    </div>
  );
};
