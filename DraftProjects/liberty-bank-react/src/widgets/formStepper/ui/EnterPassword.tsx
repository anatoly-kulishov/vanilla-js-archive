import { FC, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  InputBox,
  InputErrorMessage,
  Text,
  passwordSchema,
  passwordValidationMessages,
  useAppSelector,
  PATH_PAGE,
  useAppDispatch,
  usePasswordRecoveryMutation,
  useCreatePasswordMutation,
} from '@/shared';
import { FormStepProps, toggleTabLabel } from '../model';
import styles from './Step.module.scss';
import { errorHandler } from '../lib/errorHandler';

type FormValues = InferType<typeof passwordSchema>;

export const EnterPassword: FC<FormStepProps> = ({ stepperName }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const sessionToken = useAppSelector((state) => state.formStepper.sessionToken);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { password: '', confirmPassword: '' },
    resolver: yupResolver(passwordSchema),
  });

  useEffect(() => {
    dispatch(toggleTabLabel({ isTabLabelShown: false }));

    return () => {
      toggleTabLabel({ isTabLabelShown: true });
    };
  }, []);

  const password = watch('password');
  useEffect(() => {
    setErrorMessage('');
  }, [password]);

  const [recoverPassword] = usePasswordRecoveryMutation();
  const [createPassword] = useCreatePasswordMutation();

  const clickHandle: SubmitHandler<FormValues> = (data): void => {
    if (sessionToken) {
      (stepperName === 'registration'
        ? createPassword({ sessionToken, password: data.password })
        : recoverPassword({ sessionToken, newPassword: data.password })
      )
        .unwrap()
        .then(() => {
          navigate(PATH_PAGE.login);
        })
        .catch((error) => {
          const message = errorHandler.password(error.status);
          setErrorMessage(message);
        });
    }
  };

  const isError = errors.password?.type !== 'required' && !!errors.password;

  return (
    <>
      <Text tag={'h1'} weight={'bold'} className={styles.step__title}>
        Придумайте {stepperName === 'reset' && 'новый'} пароль
      </Text>
      <form onSubmit={handleSubmit(clickHandle)}>
        <Controller
          control={control}
          rules={{ required: true }}
          name='password'
          render={({ field }) => (
            <InputBox className={styles.step__pwd_input}>
              <Input.Password isError={isError} label={'Пароль'} {...field} />

              {errors.password?.type !== 'required' &&
                isDirty &&
                passwordValidationMessages.map((message, index) => {
                  let isValid = true;
                  if (errors.password) {
                    const errorArr = JSON.parse(errors.password?.message || '[]');
                    isValid = !!errorArr[index];
                  }
                  return <InputErrorMessage key={message} message={message} isValid={isValid} />;
                })}
            </InputBox>
          )}
        />

        <Controller
          control={control}
          rules={{ required: true }}
          name='confirmPassword'
          render={({ field }) => (
            <InputBox className={styles.step__input}>
              <Input.Text
                isError={Boolean(errors.confirmPassword)}
                label={'Подтвердить пароль'}
                type='password'
                {...field}
              />
              {errors.confirmPassword?.message && (
                <InputErrorMessage message={errors.confirmPassword.message} />
              )}
              {errorMessage && <InputErrorMessage message={errorMessage} />}
            </InputBox>
          )}
        />
        <Button
          width='max'
          type='submit'
          onClick={handleSubmit(clickHandle)}
          className={styles.step__button}
          disabled={!isValid || Boolean(errors.confirmPassword || errors.password)}
        >
          {stepperName === 'registration' ? 'Зарегистрироваться' : 'Сменить пароль'}
        </Button>
      </form>
    </>
  );
};
