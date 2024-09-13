import styles from '../../../shared/styles/styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ApartmentCalculationDto, Button, Input } from '@/shared';
import { FC } from 'react';
import {
  BACK_BUTTON,
  CHECKBOX_HOME_VALUES,
  SEND_CALCULATE_BUTTON,
  SwitchButtonForm,
} from '@/features';
import classNames from 'classnames';
import { ErrorMessage } from '../../errorMessage/ErrorMessage';

interface FormValues {
  estimatedValue: string;
  squareFootage: string;
  riskFire: boolean;
  riskWater: boolean;
  riskOther: boolean;
  riskNature: boolean;
}

interface CalculateApartmentApplicationProps {
  calculationsPolicy: (data: ApartmentCalculationDto) => void;
}

export const CalculateApartmentApplication: FC<CalculateApartmentApplicationProps> = ({
  calculationsPolicy,
}) => {
  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    defaultValues: {
      estimatedValue: undefined,
      squareFootage: undefined,
      riskFire: false,
      riskWater: false,
      riskOther: true,
      riskNature: false,
    },
    mode: 'onChange',
    resetOptions: {
      keepErrors: false,
    },
  });

  const onSubmitHandler: SubmitHandler<FormValues> = (data) => {
    calculationsPolicy({
      type: 'BUILDING',
      buildingCalculationDto: { ...data, buildingType: 'APARTMENT' },
    });
  };

  const handleButtonClick = () => navigate(-1);

  return (
    <FormProvider {...methods}>
      <form className={styles['form']}>
        <div className={styles['form__container']}>
          <div className={classNames(styles['form__row'], styles['width-550'])}>
            <div className={styles['form__field']}>
              <Controller
                name='estimatedValue'
                rules={{
                  required: 'Не должно быть пустым',
                  validate: (s: string) => {
                    if (+s <= 0) {
                      return 'Не должна быть меньше 0';
                    }
                  },
                  pattern: { value: /^(?![0])/, message: 'Не должна начинаться с 0' },
                  max: {
                    value: 100000000,
                    message: 'Не должна быть больше 100 000 000',
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Text
                      white
                      size='m'
                      className={styles['form__input']}
                      isError={Boolean(error)}
                      label='Стоимость квартиры'
                      {...field}
                      required
                      chars={/\d/}
                      onBlur={(e) => {
                        if (error?.message) {
                          field.onChange(e.target.value);
                        }
                      }}
                      contentRight='₽'
                    />
                    {<ErrorMessage error={error} />}
                  </>
                )}
              />
            </div>
            <div className={styles['form__field']}>
              <Controller
                name='squareFootage'
                rules={{
                  required: 'Введите площадь строения',
                  min: {
                    value: 0,
                    message: 'Не должна быть меньше 0',
                  },
                  pattern: { value: /^(?![0])/, message: 'Не должна начинаться с 0' },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Text
                      white
                      size='m'
                      className={styles['form__input']}
                      isError={Boolean(error)}
                      label='Площадь строения'
                      {...field}
                      required
                      chars={/\d/}
                      onBlur={(e) => {
                        if (error?.message) {
                          field.onChange(e.target.value);
                        }
                      }}
                      contentRight='м2'
                    />
                    {<ErrorMessage error={error} />}
                  </>
                )}
              />
            </div>
          </div>
          <div className={styles['form__checkboxes']}>
            {CHECKBOX_HOME_VALUES.map((item) => (
              <SwitchButtonForm key={item} name={item} />
            ))}
          </div>
          <div className={styles['form__footer']}>
            <Button onClick={handleButtonClick} theme='third' className={styles['form__back-btn']}>
              {BACK_BUTTON}
            </Button>
            <Button
              type='button'
              theme='primary'
              size='m'
              onClick={methods.handleSubmit(onSubmitHandler)}
              disabled={!methods.formState.isValid}
            >
              {SEND_CALCULATE_BUTTON}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
