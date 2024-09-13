import styles from './insuranceApplicationOffline.module.scss';
import { OfflineCard } from '@/features/offlineCard/ui/OfflineCard';
import { BACK_BUTTON, TITLE_OFFLINE } from './constants';
import { BackButton, Text, Wrapper } from '@/shared';

const InsuranceApplicationOffline = () => {
  return (
    <Wrapper size='l'>
      <div className={styles['wrapper']}>
        <div className={styles['frame']}>
          <div className={styles['containerBackBtn']}>
            <BackButton text={BACK_BUTTON} theme='blue' width='24' height='24' />
          </div>
          <Text tag='h3' size='m' weight='medium' className={styles['containerTitle']}>
            {TITLE_OFFLINE}
          </Text>
          <OfflineCard />
        </div>
      </div>
    </Wrapper>
  );
};

export default InsuranceApplicationOffline;
