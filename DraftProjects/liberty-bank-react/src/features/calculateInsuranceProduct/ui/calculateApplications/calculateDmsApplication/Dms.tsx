import styles from '../../../shared/styles/styles.module.scss';
import { BACK_BUTTON, GENERAL_INFO, SEND_CALCULATE_BUTTON } from '../../../shared/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input, HealthCalculationDto, Text } from '@/shared';
import { ErrorMessage } from '../../errorMessage/ErrorMessage';
import { FC, useEffect } from 'react';

interface CalculateDmsProps {
  calculationsPolicy: (data: HealthCalculationDto) => void;
}

const DtoAdapter: Record<string, string> = {
  Standart: 'STANDART',
  'Standart+': 'STANDART_PLUS',
  Premium: 'PREMIUM',
  VIP: 'VIP',
};

export const Dms: FC<CalculateDmsProps> = ({ calculationsPolicy }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const methods = useForm<HealthCalculationDto>({
    defaultValues: {
      type: 'HEALTH',
      healthCalculationDto: {
        startingDate: undefined,
        endingDate: undefined,
        duration: 0,
        insuredSum: undefined,
        insuredPersonAge: undefined,
      },
    },
    mode: 'onTouched',
    resetOptions: {
      keepErrors: false,
    },
  });

  const {
    formState: { isValid },
    control,
    setError,
    setValue,
    handleSubmit,
    watch,
  } = methods;

  const [startDate, endDate] = watch([
    'healthCalculationDto.startingDate',
    'healthCalculationDto.endingDate',
  ]);

  useEffect(() => {
    if (startDate && endDate) {
      const daysCount = Math.ceil(
        Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24),
      );
      const invalidPeriod =
        daysCount > 365 ||
        new Date(endDate) < new Date() ||
        new Date(startDate).getTime() === new Date(endDate).getTime();
      invalidPeriod
        ? setError('healthCalculationDto.duration', {
            type: 'manual',
            message: 'Неправильно заполнена дата',
          })
        : setValue('healthCalculationDto.duration', daysCount);
    }
  }, [startDate, endDate]);

  const onSubmitHandler: SubmitHandler<HealthCalculationDto> = (data) => {
    calculationsPolicy({
      type: 'HEALTH',
      healthCalculationDto: {
        insuredSum: data.healthCalculationDto.insuredSum,
        insuredPersonAge: data.healthCalculationDto.insuredPersonAge,
        duration: data.healthCalculationDto.duration,
        baseMedicineProgramm: DtoAdapter[location.state.split(' ').at(-1) as string],
      },
    });
  };

  return (
    <div className={styles['wrapper']}>
      <Text tag='h2' weight='bold' size='l'>
        {location?.state}
      </Text>

      <FormProvider {...methods}>
        <form className={styles['form']}>
          <div className={styles['form__container']}>
            <div className={styles['form__header']}>
              <Text tag='h3' weight='medium'>
                {GENERAL_INFO}
              </Text>
            </div>

            <div className={styles['form__body']}>
              <div className={styles['form__row']}>
                <div className={styles['form__controller']}>
                  <Controller
                    control={control}
                    name='healthCalculationDto.startingDate'
                    rules={{
                      required: 'Укажите дату начала действия договора',
                      validate: (v?: Date) => {
                        if (!v) return 'Укажите дату начала действия договора';
                        if (new Date(v) > new Date())
                          return 'Дата не должна быть позже текущей даты';
                      },
                    }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                      <>
                        <Input.Date
                          label='Дата начала действия договора'
                          className={styles['form__input']}
                          isError={!!error}
                          value={value}
                          required
                          white
                          onChange={onChange}
                          onBlur={onBlur}
                        />
                        <ErrorMessage error={error} />
                      </>
                    )}
                  />
                </div>
                <div className={styles['form__controller']}>
                  <Controller
                    control={control}
                    name='healthCalculationDto.endingDate'
                    rules={{
                      required: 'Укажите дату окончания действия договора',
                      validate: (v?: Date) => {
                        if (!v) return 'Укажите дату окончания действия договора';
                        if (new Date(v) <= new Date())
                          return 'Дата не должна быть раньше или равна текущей дате';
                      },
                    }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                      <>
                        <Input.Date
                          label='Дата завершения действия договора'
                          className={styles['form__input']}
                          isError={!!error}
                          value={value}
                          required
                          white
                          onChange={onChange}
                          onBlur={onBlur}
                        />
                        {<ErrorMessage error={error} />}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className={styles['form__row']}>
                <div className={styles['form__controller']}>
                  <Controller
                    control={control}
                    name='healthCalculationDto.insuredSum'
                    rules={{
                      required: 'Укажите сумму страхования',
                    }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                      <>
                        <Input.Text
                          type='number'
                          label='Сумма страхования'
                          className={styles['form__input']}
                          isError={!!error}
                          value={value}
                          required
                          white
                          onChange={onChange}
                          onBlur={onBlur}
                        />
                        <ErrorMessage error={error} />
                      </>
                    )}
                  />
                </div>

                <div className={styles['form__controller']}>
                  <Controller
                    control={control}
                    name='healthCalculationDto.insuredPersonAge'
                    rules={{
                      required: 'Укажите возраст страхователя',
                      min: { value: 3, message: 'Возраст должен быть не меньше 3 лет' },
                      max: { value: 60, message: 'Возраст должен быть не больше 60 лет' },
                    }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                      <>
                        <Input.Text
                          type='number'
                          label='Возраст страхователя'
                          className={styles['form__input']}
                          isError={!!error}
                          value={value}
                          required
                          white
                          onChange={onChange}
                          onBlur={onBlur}
                        />
                        {<ErrorMessage error={error} />}
                      </>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className={styles['form__footer']}>
              <Button
                onClick={() => navigate(-1)}
                theme='third'
                className={styles['form__back-btn']}
              >
                {BACK_BUTTON}
              </Button>
              <Button
                type='button'
                theme='primary'
                size='m'
                onClick={handleSubmit(onSubmitHandler)}
                disabled={!isValid}
              >
                {SEND_CALCULATE_BUTTON}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
