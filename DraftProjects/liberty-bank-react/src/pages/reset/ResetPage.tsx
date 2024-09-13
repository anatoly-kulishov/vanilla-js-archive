import { BackButton, Wrapper } from '@/shared';
import { EnterPassword, EnterPhone, EnterSms, FormStepProps, FormStepper } from '@/widgets';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../registration/Registration.module.scss';

const RESET_STEPS: FC<FormStepProps>[] = [EnterPhone, EnterSms, EnterPassword];

const ResetPage = () => {
  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1);

  return (
    <main>
      <Wrapper>
        <div className={styles.registration}>
          <div className={styles.registration__header}>
            <BackButton
              name={'arrow-left-blue'}
              text={'Назад'}
              theme={'blue'}
              width={'24'}
              height={'24'}
              click={handleBackClick}
            />
          </div>
          <FormStepper steps={RESET_STEPS} stepperName={'reset'} />
        </div>
      </Wrapper>
    </main>
  );
};

export default ResetPage;
