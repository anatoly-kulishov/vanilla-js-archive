import {
  BackButton,
  Link,
  PATH_PAGE,
  Tabs,
  Text,
  Wrapper,
  useAppDispatch,
  useAppSelector,
} from '@/shared';
import {
  EnterDocument,
  EnterPassword,
  EnterPhone,
  EnterSms,
  FormStepProps,
  FormStepper,
  IStepperRefType,
  resetStepper,
  toggleTabLabel,
} from '@/widgets';
import { FC, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Registration.module.scss';

const REGISTRATION_BY_PHONE_STEPS: FC<FormStepProps>[] = [EnterPhone, EnterSms, EnterPassword];
const REGISTRATION_BY_DOCUMENT_STEPS: FC<FormStepProps>[] = [EnterDocument, EnterPassword];

const RegistrationPage = () => {
  const dispatch = useAppDispatch();
  const { isTabLabelShown } = useAppSelector((state) => state.formStepper);
  const childRef = useRef<IStepperRefType>(null);
  const handleTabClick = () => {
    if (childRef.current) {
      childRef.current.resetActiveStep();
    }
    dispatch(resetStepper());
  };

  useEffect(() => {
    dispatch(toggleTabLabel({ isTabLabelShown: true }));
  }, []);

  const tabs = [
    {
      label: 'Телефон',
      content: (
        <FormStepper
          steps={REGISTRATION_BY_PHONE_STEPS}
          stepperName={'registration'}
          ref={childRef}
        />
      ),
    },
    {
      label: 'Документ',
      content: (
        <FormStepper
          steps={REGISTRATION_BY_DOCUMENT_STEPS}
          stepperName={'registration'}
          ref={childRef}
        />
      ),
    },
  ];

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
          {isTabLabelShown && (
            <Text tag={'h1'} weight={'bold'}>
              Регистрация
            </Text>
          )}
          <div className={styles.registration__content}>
            <Tabs theme='secondary' tabs={tabs} onClick={handleTabClick} isGrayInactiveBorder />
            <Text tag={'p'} size={'m'} className={styles.registration__caption}>
              У вас уже есть аккаунт? <Link to={PATH_PAGE.login}>Авторизуйтесь</Link>
            </Text>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

export default RegistrationPage;
