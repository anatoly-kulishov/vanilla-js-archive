import HomeInsuranceOnlineApplication from '@/features/createInsuranceApplicationRequest/ui/homeInsuranceOnlineApplication/homeInsuranceOnlineApplication';
import { BackButton, Text, Wrapper } from '@/shared';
import { BACK_BTN, TITLE_ONLINE } from '../../contants';
import styles from '../homeInsuranceApplicationPage.module.scss';

const HomeInsuranceApplicationOnline = () => {
  return (
    <Wrapper size='l'>
      <div className={styles['wrapper']}>
        <div className={styles['frame']}>
          <div className={styles['containerBackBtn']}>
            <BackButton text={BACK_BTN} theme='blue' width='24' height='24' />
          </div>
          <Text tag='h3' size='m' weight='medium' className={styles['containerTitle']}>
            {TITLE_ONLINE}
          </Text>
          <HomeInsuranceOnlineApplication />
        </div>
      </div>
    </Wrapper>
  );
};

export default HomeInsuranceApplicationOnline;
