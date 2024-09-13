import styles from '../../../shared/styles/styles.module.scss';
import { ADD_DRIVER, BACK_BUTTON, SEND_CALCULATE_BUTTON } from '../../../shared/index';
import { useNavigate } from 'react-router-dom';
import { Controller, FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Button, Input, VehicleCalculationDto, Driver } from '@/shared';
import { ErrorMessage } from '../../errorMessage/ErrorMessage';
import { DriversFrame } from '@/features/calculateInsuranceProduct/components/driversFrame/DriversFrame';
import { FC, useEffect } from 'react';

interface FormValues {
  startingDate: string;
  endingDate: string;
  duration: string;
  yearOfRelease: string;
  mileage: string;
  drivers: Driver[];
}

interface CalculateOsagoProps {
  calculationsPolicy: (data: VehicleCalculationDto) => void;
}

export const Osago: FC<CalculateOsagoProps> = ({ calculationsPolicy }) => {
  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    defaultValues: {
      startingDate: '',
      endingDate: '',
      duration: '',
      yearOfRelease: '',
      mileage: '',
      drivers: [
        {
          age: '',
          experience: '',
          yearWithoutAccident: '',
        },
      ],
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
    watch,
    handleSubmit,
  } = methods;

  const { fields, append } = useFieldArray({
    name: 'drivers',
    control,
  });

  const startDate = watch('startingDate');
  const endDate = watch('endingDate');

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
        ? setError('duration', { type: 'manual', message: 'Неправильно заполнена дата' })
        : setValue('duration', String(daysCount));
    }
  }, [startDate, endDate]);

  const onSubmitHandler: SubmitHandler<FormValues> = (data) => {
    calculationsPolicy({
      type: 'VEHICLE',
      vehicleCalculationDto: {
        osagoCalculationDto: {
          mileage: data.mileage,
          duration: data.duration,
          yearOfRelease: data.yearOfRelease,
          drivers: data.drivers,
        },
      },
    });
  };

  const handleButtonClick = () => navigate(-1);

  return (
    <div className={styles['wrapper']}>
      <FormProvider {...methods}>
        <form className={styles['form']}>
          <div className={styles['form__container']}>
            <div className={styles['form__body']}>
              <div className={styles['form__row']}>
                <div className={styles['form__controller']}>
                  <Controller
                    name='startingDate'
                    rules={{
                      required: 'Укажите дату начала действия договора',
                      validate: (v: Date) => {
                        if (v > new Date()) return 'Дата не должна быть позже текущей даты';
                      },
                    }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                      <>
                        <Input.Date
                          label='Дата начала действия договора'
                          className={styles['form__input']}
                          isError={!!error}
                          value={value && new Date(value)}
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

                <div className={styles['form__controller']}>
                  <Controller
                    name='endingDate'
                    rules={{
                      required: 'Укажите дату окончания действия договора',
                      validate: (v: Date) => {
                        if (v <= new Date())
                          return 'Дата не должна быть раньше или равна текущей дате';
                      },
                    }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                      <>
                        <Input.Date
                          label='Дата завершения действия договора'
                          className={styles['form__input']}
                          isError={!!error}
                          value={value && new Date(value)}
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
                    name='yearOfRelease'
                    rules={{
                      required: 'Это поле обязательно для заполнения',
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Input.Number
                          label='Год выпуска'
                          className={styles['form__input']}
                          white
                          isError={!!error}
                          required
                          maxLength={4}
                          thousandsSeparator
                          {...field}
                        />
                        <ErrorMessage error={error} />
                      </>
                    )}
                  />
                </div>
                <div className={styles['form__controller']}>
                  <Controller
                    name='mileage'
                    rules={{
                      required: 'Это поле обязательно для заполнения',
                      validate: (value) =>
                        (parseFloat(value) > 0 && parseFloat(value) < 2000000) ||
                        'Значение должно быть в диапозоне от 0 до 2000000',
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Input.Number
                          label='Пробег'
                          className={styles['form__input']}
                          white
                          isError={!!error}
                          required
                          {...field}
                          contentRight={'км'}
                        />
                        <ErrorMessage error={error} />
                      </>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className={styles['form__drivers']}>
              {fields.map((item, index) => (
                <DriversFrame key={item.id} index={index} />
              ))}
            </div>
            <div className={styles['form__row']}>
              <Button
                theme='secondary'
                width='max'
                className={styles['form__button']}
                onClick={() => append({ age: '', experience: '', yearWithoutAccident: '' })}
              >
                {ADD_DRIVER}
              </Button>
            </div>
            <div className={styles['form__footer']}>
              <Button
                onClick={handleButtonClick}
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
