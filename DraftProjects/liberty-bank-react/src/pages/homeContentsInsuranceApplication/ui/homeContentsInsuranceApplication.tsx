import CreateHomeContentsInsuranceApplication from '@/features/createInsuranceApplicationRequest/ui/createHomeContentsInsuranceApplication/createHomeContentsInsuranceApplication';
import { BackButton, Text, Wrapper } from '@/shared';
import { BACK_BTN, TITLE } from '../constants';
import styles from './homeContentsInsuranceApplication.module.scss';

const HomeContentsInsuranceApplication = () => (
  <Wrapper size='l'>
    <div className={styles['wrapper']}>
      <div className={styles['frame']}>
        <div className={styles['containerBackBtn']}>
          <BackButton text={BACK_BTN} theme='blue' width='24' height='24' />
        </div>
        <Text tag='h3' size='m' weight='medium' className={styles['containerTitle']}>
          {TITLE}
        </Text>
        <CreateHomeContentsInsuranceApplication />
      </div>
    </div>
  </Wrapper>
);
export default HomeContentsInsuranceApplication;
