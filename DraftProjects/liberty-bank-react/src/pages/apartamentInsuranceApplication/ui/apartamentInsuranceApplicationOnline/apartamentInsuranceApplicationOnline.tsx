import ApartamentInsuranceFormOnline from '@/features/createInsuranceApplicationRequest/ui/createHomeContentsInsuranceApplication/apartamentInsuranceForm/apartamentInsuranceFormOnline/apartamentInsuranceFormOnline';
import { BackButton, Text, Wrapper } from '@/shared';
import { BACK_BTN, TITLE_ONLINE } from '../../constants';
import styles from '../apartamentInsuranceApplication.module.scss';

const ApartamentInsuranceApplicationOnline = () => {
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
          <ApartamentInsuranceFormOnline />
        </div>
      </div>
    </Wrapper>
  );
};

export default ApartamentInsuranceApplicationOnline;
