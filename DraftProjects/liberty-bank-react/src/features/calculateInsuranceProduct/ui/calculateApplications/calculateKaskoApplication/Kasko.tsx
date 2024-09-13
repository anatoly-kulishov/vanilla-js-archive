import styles from '../../../shared/styles/styles.module.scss';
import {
  ADD_DRIVER,
  BACK_BUTTON,
  CHECKBOX_VALUES,
  SEND_CALCULATE_BUTTON,
} from '../../../shared/index';
import { useNavigate } from 'react-router-dom';
import { Controller, FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Button, Input, VehicleCalculationDto, Driver } from '@/shared';
import { ErrorMessage } from '../../errorMessage/ErrorMessage';
import { SwitchButtonForm } from '@/features/calculateInsuranceProduct/components/switchButtonForm/switchButtonForm';
import { DriversFrame } from '@/features/calculateInsuranceProduct/components/driversFrame/DriversFrame';
import { FC } from 'react';

interface FormValues {
  price: string;
  yearOfRelease: string;
  mileage: string;
  drivers: Driver[];
  riskTheft: boolean;
  riskFire: boolean;
  riskNature: boolean;
}

interface CalculateKaskoProps {
  calculationsPolicy: (data: VehicleCalculationDto) => void;
}

export const Kasko: FC<CalculateKaskoProps> = ({ calculationsPolicy }) => {
  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    defaultValues: {
      yearOfRelease: '',
      mileage: '',
      price: '',
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
  } = methods;

  const { fields, append } = useFieldArray({
    name: 'drivers',
    control,
  });

  // TO DO: интеграции API
  const onSubmitHandler: SubmitHandler<FormValues> = (data) => {
    calculationsPolicy({
      type: 'VEHICLE',
      vehicleCalculationDto: {
        cascoCalculationDto: {
          ...data,
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
                    name='price'
                    rules={{
                      required: 'Это поле обязательно для заполнения',
                      validate: (value) => parseFloat(value) > 0,
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Input.Number
                          label='Стоимость автомобиля'
                          className={styles['form__input']}
                          white
                          isError={!!error}
                          required
                          {...field}
                        />
                        <ErrorMessage error={error} />
                      </>
                    )}
                  />
                </div>
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
              <Button
                theme='secondary'
                width='max'
                className={styles['form__button']}
                onClick={() => append({ age: '', experience: '', yearWithoutAccident: '' })}
              >
                {ADD_DRIVER}
              </Button>
            </div>

            {CHECKBOX_VALUES.map((item) => (
              <SwitchButtonForm key={item} name={item} />
            ))}

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
                onClick={methods.handleSubmit(onSubmitHandler)}
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
