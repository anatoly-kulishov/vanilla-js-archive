import { FC } from 'react';
import { Button, Text } from '@/shared';
import styles from './ConfirmCityModal.module.scss';

interface IConfirmCityModalProps {
  city: string;
  handleConfirmButtonClick: () => void;
  handleCancleButtonClick: () => void;
}

export const ConfirmCityModal: FC<IConfirmCityModalProps> = (props) => {
  const { city, handleConfirmButtonClick, handleCancleButtonClick } = props;
  return (
    <div className={styles.modal}>
      <Text tag='h3' weight='medium' className={styles.title}>
        Ваш город - {city}?
      </Text>
      <div className={styles.button_container}>
        <Button onClick={handleConfirmButtonClick}>Все верно</Button>
        <Button theme='secondary' onClick={handleCancleButtonClick}>
          Нет, изменить
        </Button>
      </div>
    </div>
  );
};
