import { BackButton, Wrapper, Text } from '@/shared';

import styles from './InsuranceEditPolicies.module.scss';
import { useLocation } from 'react-router-dom';
import { InsuranceEditPolicy } from '@/widgets/insuranceEditOrder';

const InsuranceEditPolicies = () => {
  const location = useLocation();
  const docNumber = location.state.docNumber;
  return (
    <Wrapper size='l'>
      <div className={styles['wrapper']}>
        <div className={styles['frame']}>
          <div className={styles['containerBackBtn']}>
            <BackButton text={'Назад'} theme='blue' width='24' height='24' />
          </div>
          <Text tag='h3' size='m' weight='medium' className={styles['containerTitle']}>
            {`Заявка на изменение полиса страхования №${docNumber}`}
          </Text>
          <InsuranceEditPolicy />
        </div>
      </div>
    </Wrapper>
  );
};

export default InsuranceEditPolicies;
