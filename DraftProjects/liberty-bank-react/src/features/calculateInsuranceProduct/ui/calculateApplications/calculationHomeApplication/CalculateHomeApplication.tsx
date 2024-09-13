import styles from '../../../shared/styles/styles.module.scss';
import { BACK_BUTTON, CHECKBOX_HOME_VALUES, SEND_CALCULATE_BUTTON } from '../../../shared/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { BuildingCalculationDto, Button, Input, Text } from '@/shared';
import { ErrorMessage } from '../../errorMessage/ErrorMessage';
import { SwitchButtonForm } from '@/features/calculateInsuranceProduct/components/switchButtonForm/switchButtonForm';
import { FC } from 'react';

interface FormValues {
  estimatedValue: string;
  squareFootage: string;
  riskOther: boolean;
  riskWater: boolean;
  riskFire: boolean;
  riskNature: boolean;
}

interface CalculateKaskoProps {
  calculationsPolicy: (data: BuildingCalculationDto) => void;
}

export const CalculateHomeApplication: FC<CalculateKaskoProps> = ({ calculationsPolicy }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const methods = useForm<FormValues>({
    defaultValues: {
      estimatedValue: '',
      squareFootage: '',
      riskWater: false,
      riskFire: false,
      riskOther: false,
      riskNature: false,
    },
    mode: 'onTouched',
    resetOptions: {
      keepErrors: false,
    },
  });

  const {
    formState: { isValid },
  } = methods;

  const onSubmitHandler: SubmitHandler<FormValues> = (data) => {
    calculationsPolicy({
      type: 'BUILDING',
      buildingCalculationDto: {
        buildingType: 'HOUSE',
        ...data,
      },
    });
  };

  const handleButtonClick = () => navigate(-1);

  return (
    <div className={styles['wrapper']}>
      <Text tag='h2' weight='bold' size='l'>
        {location?.state}
      </Text>
      <FormProvider {...methods}>
        <form className={styles['form']}>
          <div className={styles['form__container']}>
            <div className={styles['form__body']}>
              <div className={styles['form__row']}>
                <div className={styles['form__controller']}>
                  <Controller
                    name='estimatedValue'
                    rules={{
                      required: 'Это поле обязательно для заполнения',
                      validate: (value) =>
                        parseFloat(value) <= 0 ? 'не может быть меньше или равно 0' : true,
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Input.Number
                          label='Стоимость строения'
                          className={styles['form__input']}
                          white
                          isError={!!error}
                          required
                          {...field}
                          contentRight='₽'
                        />
                        <ErrorMessage error={error} />
                      </>
                    )}
                  />
                </div>
                <div className={styles['form__controller']}>
                  <Controller
                    name='squareFootage'
                    rules={{
                      required: 'Это поле обязательно для заполнения',
                      validate: (value) =>
                        parseFloat(value) <= 0 ? 'не может быть меньше или равно 0' : true,
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Input.Number
                          label='Площадь строения'
                          className={styles['form__input']}
                          white
                          isError={!!error}
                          required
                          thousandsSeparator
                          {...field}
                          contentRight={'м2'}
                        />
                        <ErrorMessage error={error} />
                      </>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className={styles['form__checkboxes']}>
              {CHECKBOX_HOME_VALUES.map((item) => (
                <SwitchButtonForm key={item} name={item} />
              ))}
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
