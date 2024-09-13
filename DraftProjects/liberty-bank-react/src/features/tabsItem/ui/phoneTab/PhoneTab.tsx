import { FC, ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  AUTH_TYPE,
  AuthPhoneSchema,
  Button,
  Input,
  InputErrorMessage,
  Link,
  MAX_INPUT_LENGTH,
  PATH_PAGE,
  useLoginMutation,
} from '@/shared';
import { IPhoneFormInputs } from '../../model/form';
import styles from './PhoneTab.module.scss';
import { ERRORS, passwordRequirement, withoutASCII } from './const';

const formatPhone: (phone: string) => string = (phone) => phone.replace(/[+\s()]/g, '');
const ATTEMPT_THRESHOLD = 5;

export const PhoneTab: FC = () => {
  const {
    control,
    register,
    setError,
    clearErrors,
    handleSubmit,
    resetField,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { phone: '', password: '' },
    resolver: yupResolver(AuthPhoneSchema),
  });
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [wrongLoginAttempts, setWrongLoginAttempts] = useState(0);

  function showErrors(attempts: number) {
    const passwordErrors = attempts < ATTEMPT_THRESHOLD ? { message: ERRORS.INVALID } : {};

    setError('phone', {});
    setError('password', passwordErrors);
  }

  const clickHandle: SubmitHandler<IPhoneFormInputs> = (userData): void => {
    if (!isValid) return showErrors(wrongLoginAttempts);

    login({
      password: userData.password,
      login: formatPhone(userData.phone),
      type: AUTH_TYPE.PHONE,
    })
      .unwrap()
      .then(() => navigate(PATH_PAGE.root))
      .catch((e) => {
        setWrongLoginAttempts((prev) => {
          const newValue = prev + 1;
          e.status === 400 && showErrors(newValue);
          return newValue;
        });
      });
  };

  const handleClickReset: () => void = () => resetField('phone');

  const onChangePhone = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const valueLength = value.replace(/\D/g, '').length;

    valueLength > 0 && valueLength < 11
      ? setError('phone', { message: ERRORS.LENGTH_NUMBER })
      : clearErrors('phone');
  };

  const checkPassword = (value: string) => {
    clearErrors('password');
    if (value.length > 0) {
      if (!value.match(passwordRequirement) || value.match(withoutASCII)) {
        setError('password', { message: ERRORS.INVALID });
      }
      value.length < 6 && setError('password', { message: ERRORS.LENGTH_PASSWORD });
    }
  };

  const onChangePassword = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    checkPassword(value);
  };

  return (
    <form onSubmit={handleSubmit(clickHandle)}>
      <div className={styles['phone-container']}>
        <Controller
          control={control}
          name='phone'
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Input.Tel
              label='Номер телефона'
              {...field}
              mask='+7 (***) *** ****'
              isError={!!errors.phone}
              clearable={{ onClear: handleClickReset }}
              {...register('phone', {
                onChange: onChangePhone,
              })}
            />
          )}
        />
        {errors.phone?.message && <InputErrorMessage message={errors.phone.message} />}
      </div>
      <div className={styles['password-container']}>
        <Controller
          control={control}
          name='password'
          render={({ field }) => (
            <Input.Password
              label='Пароль'
              {...field}
              {...register('password', {
                onChange: onChangePassword,
              })}
              isError={!!errors.password}
              maxLength={MAX_INPUT_LENGTH}
            />
          )}
        />
        {errors.password?.message && <InputErrorMessage message={errors.password?.message} />}
        {wrongLoginAttempts >= ATTEMPT_THRESHOLD && (
          <div className={styles['errors']}>
            <InputErrorMessage message={ERRORS.INVALID + ERRORS.OVER_INVALID} />
            &nbsp;
            <Link to={PATH_PAGE.reset} className={styles.link}>
              {ERRORS.RESET_PASSWORD}
            </Link>
          </div>
        )}
      </div>
      <div className={styles['reset-link-container']}>
        <Link to={PATH_PAGE.reset} size='xs'>
          Забыли пароль?
        </Link>
      </div>
      <Button type='submit' width='max' size='l' showDisabledClass={!isValid}>
        Вперед
      </Button>
    </form>
  );
};
