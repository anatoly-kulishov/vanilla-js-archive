import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FC, useEffect, useState } from 'react';
import {
  Button,
  InputBox,
  InputErrorMessage,
  Input,
  useAppSelector,
  Text,
  useAppDispatch,
  useRequestVerificationCodeMutation,
  useVerificationByCodeMutation,
} from '@/shared';
import { FormStepProps, addToStepperState, toggleTabLabel } from '../model';
import styles from './Step.module.scss';
import { errorHandler } from '../lib/errorHandler';

const CODE_LENGTH = 6;
const schema = yup.object().shape({
  sms: yup.string().required('Обязательное поле').min(CODE_LENGTH),
});

type FormValues = yup.InferType<typeof schema>;

export const EnterSms: FC<FormStepProps> = ({ setNextStep }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [time, setTime] = useState<number>(30);
  const phone = useAppSelector((state) => state.formStepper.phone);

  const dispatch = useAppDispatch();
  const [requestVerificationCode] = useRequestVerificationCodeMutation();
  const [verificationByCode] = useVerificationByCodeMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { sms: '' },
  });

  const fetchVerificationCode = () => {
    phone &&
      requestVerificationCode(phone)
        .unwrap()
        .then((data) => {
          setTime(data.blockSeconds);
        })
        .catch((error) => {
          if (error.status === 406) return setTime(error.data.blockSeconds);

          const message = errorHandler.requestVerificationCode(error.status);
          setErrorMessage(message);
        });
  };

  useEffect(() => {
    dispatch(toggleTabLabel({ isTabLabelShown: false }));
    phone && fetchVerificationCode();
  }, []);

  useEffect(() => {
    if (time <= 0) return;

    const timeoutId = setTimeout(() => setTime(time - 1), 1000);

    return () => clearTimeout(timeoutId);
  }, [time]);

  const clickHandle: SubmitHandler<FormValues> = (data): void => {
    if (phone) {
      verificationByCode({ mobilePhone: phone, verificationCode: data.sms })
        .unwrap()
        .then((data) => {
          dispatch(addToStepperState(data));
          setNextStep();
        })
        .catch((error) => {
          const { attemptNumber } = error.data;
          const message = errorHandler.verificationByCode(error.status, attemptNumber);
          setErrorMessage(message);
        });
    }
  };

  const seconds = Math.floor(time % 60);
  const minutes = Math.floor((time / 60) % 60);
  const isError = Boolean(errors.sms) || errorMessage.length > 0;

  return (
    <>
      <Text tag={'h1'} weight={'bold'} className={styles.enterSms__title}>
        Введите код из смс
      </Text>
      <Text tag={'p'} size={'xs'} className={styles.enterSms__title}>
        На Ваш номер телефона отправлен 6-значный код подтверждения
      </Text>
      <form onSubmit={handleSubmit(clickHandle)}>
        <Controller
          control={control}
          name='sms'
          render={({ field: { onChange } }) => (
            <InputBox className={styles.enterPhone__input}>
              <Input.SMS isError={isError} onChange={onChange} />
              {errorMessage && <InputErrorMessage message={errorMessage} />}
            </InputBox>
          )}
        />
        <div className={styles.enterSms__timer}>
          {time === 0 ? (
            <Button onClick={fetchVerificationCode} theme='tertiary'>
              Отправить смс еще раз
            </Button>
          ) : (
            <Text tag={'p'} size={'xs'}>
              Повторная отправка через {minutes < 10 ? '0' + minutes : minutes}:
              {seconds < 10 ? '0' + seconds : seconds}
            </Text>
          )}
        </div>
        <Button width='max' type='submit' className={styles.step__button} disabled={!isValid}>
          Далее
        </Button>
      </form>
    </>
  );
};
