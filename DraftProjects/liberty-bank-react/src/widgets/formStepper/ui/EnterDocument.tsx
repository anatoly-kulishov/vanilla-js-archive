import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useAppDispatch,
  InputErrorMessage,
  Button,
  Link,
  InputBox,
  Text,
  Input,
  documentSchema,
  PATH_PAGE,
} from '@/shared';
import { FC } from 'react';
import { FormStepperSliceState, FormStepProps, addToStepperState } from '../model';
import styles from './Step.module.scss';

export const EnterDocument: FC<FormStepProps> = ({ setNextStep, stepperName }) => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: { document: '' },
    resolver: yupResolver(documentSchema),
  });

  const clickHandle = (data: Pick<FormStepperSliceState, 'document'>): void => {
    dispatch(addToStepperState(data));
    setNextStep();
  };

  const handleClickReset = (): void => resetField('document');

  return (
    <>
      <Text tag={'h1'} weight={'bold'} className={styles.step__title}>
        Введите номер документа
      </Text>
      <form onSubmit={handleSubmit(clickHandle)}>
        <Controller
          name='document'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <InputBox className={styles.step__input}>
              <Input.Tel
                label='Серия и номер паспорта/ВНЖ'
                isError={Boolean(errors.document)}
                clearable={{ onClear: handleClickReset }}
                {...field}
              />
              {errors.document?.message && <InputErrorMessage message={errors.document.message} />}
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
          width='max'
          type='submit'
          onClick={handleSubmit(clickHandle)}
          className={styles.step__button}
          disabled={Boolean(errors.document)}
        >
          Далее
        </Button>
      </form>
    </>
  );
};
