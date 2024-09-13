import { TEXT } from '@/pages/requisites/constants';
import { Button, Icon, Text } from '@/shared';
import { FC } from 'react';

import styles from './RequisitesSend.module.scss';

export const RequisitesSend: FC = () => {
  const handleSendRequisites = () => {
    // TODO: Написать обработчик когда будет возможность формировать документ
  };

  return (
    <div className={styles['requisites-send']}>
      <Text className={styles['requisites-send__title']} tag='h2' size='m' weight='medium'>
        {TEXT.method}
      </Text>
      <div className={styles['requisites-send__btn-container']}>
        <Button theme='icon' onClick={handleSendRequisites}>
          <Icon icon={'mail-circle'} widthAndHeight={'64px'} />
        </Button>
        <Button theme='icon' onClick={handleSendRequisites}>
          <Icon icon={'whatsapp-phone'} widthAndHeight={'64px'} />
        </Button>
        <Button theme='icon' onClick={handleSendRequisites}>
          <Icon icon={'telegram-circle'} widthAndHeight={'64px'} />
        </Button>
      </div>
    </div>
  );
};
