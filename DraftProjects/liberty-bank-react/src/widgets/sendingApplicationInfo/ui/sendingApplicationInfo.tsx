import { Button, Preloader, Text } from '@/shared';
import ImageFail from '@/shared/ui/icon/assets/images/send-application-fail.png';
import ImageSuccess from '@/shared/ui/icon/assets/images/send-application-success.png';
import { FC } from 'react';
import { APPLICATION_INFO_TEXT } from '../constants';
import styles from './sendingApplicationInfo.module.scss';

type HandleResetType = undefined | (() => void);

interface SendingApplicationInfoProps {
  sendingStatus: boolean;
  handleNavigate: () => void;
  handleReset: HandleResetType;
  loading: boolean;
}

export const SendingApplicationInfo: FC<SendingApplicationInfoProps> = ({
  sendingStatus,
  handleNavigate,
  handleReset,
  loading,
}) => {
  if (loading) return <Preloader />;
  return (
    <div className={styles['containerInfo']}>
      <Text tag='h3' size='m' weight='medium'>
        {sendingStatus ? APPLICATION_INFO_TEXT.titleSuccess : APPLICATION_INFO_TEXT.titleFail}
      </Text>
      {sendingStatus && (
        <Text tag='p' size='s' weight='medium' className={styles['desc']}>
          {APPLICATION_INFO_TEXT.descriptionSuccess}
        </Text>
      )}
      <img src={sendingStatus ? ImageSuccess : ImageFail} alt='status-image' />
      {sendingStatus ? (
        <Button className={styles['btn']} onClick={handleNavigate}>
          {APPLICATION_INFO_TEXT.buttonTextSuccess}
        </Button>
      ) : (
        <div className={styles['fail-buttons']}>
          <Button className={styles['btn']} theme='secondary' onClick={handleNavigate}>
            {APPLICATION_INFO_TEXT.buttonTextFail}
          </Button>
          <Button className={styles['btn']} onClick={handleReset}>
            {APPLICATION_INFO_TEXT.buttonTextReset}
          </Button>
        </div>
      )}
    </div>
  );
};
