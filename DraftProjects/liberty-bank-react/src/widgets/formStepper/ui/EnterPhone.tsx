import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useAppDispatch,
  InputErrorMessage,
  Input,
  Button,
  Link,
  InputBox,
  phoneSchema,
  Text,
  PATH_PAGE,
  useLazyPhoneVerificationQuery,
} from '@/shared';
import { ChangeEvent, FC, useEffect } from 'react';
import { FormStepProps, addToStepperState, toggleTabLabel } from '../model';
import styles from './Step.module.scss';
import { errorHandler, formatPhone } from '../lib';
import { ERROR_MESSAGES } from '../consts';
import { StatusCodes } from '@/shared/types';
import { ERRORS } from '@/features/tabsItem/ui/phoneTab/const';

type FormValues = InferType<typeof phoneSchema>;

export const EnterPhone: FC<FormStepProps> = ({ setNextStep, stepperName }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toggleTabLabel({ isTabLabelShown: true }));
  }, []);

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors, isValid },
    register,
    setError,
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: { phone: '' },
    resolver: yupResolver(phoneSchema),
  });

  const movingToNextStage = (phone: string) => {
    dispatch(addToStepperState({ phone }));
    setNextStep();
  };

  type StatusType = StatusCodes.BadRequest | StatusCodes.Forbidden | StatusCodes.NotFound;
  const phoneVerifyAtRegistration = (status: StatusType, phone: string) => {
    const actionsByStatus: Record<StatusType, () => void> = {
      [StatusCodes.BadRequest]: () => movingToNextStage(phone),
      [StatusCodes.Forbidden]: () => setError('phone', { message: ERROR_MESSAGES.accountBlocked }),
      [StatusCodes.NotFound]: () => setError('phone', { message: ERROR_MESSAGES.applyForAccount }),
    };

    actionsByStatus[status]();
  };

  const [phoneVerification] = useLazyPhoneVerificationQuery();
  const clickHandle: SubmitHandler<FormValues> = (data): void => {
    if (!isValid) return setError('phone', { message: ERRORS.LENGTH_NUMBER });

    const phoneNumber = formatPhone(data.phone);

    if (stepperName === 'reset') {
      phoneVerification(phoneNumber)
        .unwrap()
        .then(() => {
          movingToNextStage(phoneNumber);
        })
        .catch((error) => {
          const message = errorHandler.phoneVerification(error.status);
          setError('phone', { message });
        });
    }

    if (stepperName === 'registration') {
      phoneVerification(phoneNumber)
        .unwrap()
        .then(() => {
          setError('phone', { message: ERROR_MESSAGES.userExists });
        })
        .catch((error) => {
          phoneVerifyAtRegistration(error.status, phoneNumber);
        });
    }
  };

  const handleClickReset = (): void => resetField('phone');

  const onChangePhone = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const isValidPhone =
      value.replace(/\D/g, '').length === 0 || value.replace(/\D/g, '').length === 11;

    if (isValidPhone) {
      clearErrors('phone');
    } else {
      setError('phone', { message: ERRORS.LENGTH_NUMBER });
    }
  };

  return (
    <>
      {stepperName === 'reset' && (
        <Text tag={'h1'} weight={'bold'} className={styles.step__title}>
          Восстановление пароля
        </Text>
      )}
      <form onSubmit={handleSubmit(clickHandle)}>
        <Controller
          name='phone'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <InputBox className={styles.step__input}>
              <Input.Tel
                label='Номер телефона'
                mask='+7 (***) *** ****'
                isError={Boolean(errors.phone)}
                clearable={{ onClear: handleClickReset }}
                {...register('phone', {
                  onChange: onChangePhone,
                })}
                {...field}
              />
              {errors.phone?.message && <InputErrorMessage message={errors.phone.message} />}
            </InputBox>
          )}
        />

        {stepperName === 'registration' && (
          <Text tag={'p'} size={'xs'} className={styles.step__caption}>
            Нажав кнопку «Далее», вы соглашаетесь с{' '}
            <Link to={PATH_PAGE.rulesRBS} size={'xs'}>
              Правилами пользования СДБО
            </Link>{' '}
            и{' '}
            <Link to={PATH_PAGE.rulesPP} size={'xs'}>
              Политикой конфиденциальности
            </Link>{' '}
            и даёте согласие на сбор, обработку и{' '}
            <Link to={PATH_PAGE.rulesGDPR} size={'xs'}>
              Хранение ваших персональных данных
            </Link>
          </Text>
        )}
        <Button
          type='submit'
          width='max'
          size='l'
          className={styles.step__button}
          showDisabledClass={!isValid}
        >
          Далее
        </Button>
      </form>
    </>
  );
};
