import styles from '../../../shared/styles/styles.module.scss';

import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button, AccidentCalculationDto } from '@/shared';
import { FC } from 'react';
import { NumberController, SelectController } from '@/entities';
import { BACK_BUTTON, SEND_CALCULATE_BUTTON } from '@/features';

interface FormValues {
  duration: string;
  age: string;
  activities: string;
  insuranceSum: string;
}

interface CalculateAccidentApplicationProps {
  calculationsPolicy: (data: AccidentCalculationDto) => void;
}

const OPTIONS = ['Работа в офисе', 'Плавание', 'Футбол'];

export const CalculateAccidentApplication: FC<CalculateAccidentApplicationProps> = ({
  calculationsPolicy,
}) => {
  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    defaultValues: {
      duration: undefined,
      age: undefined,
      activities: undefined,
      insuranceSum: undefined,
    },
    mode: 'onTouched',
    resetOptions: {
      keepErrors: false,
    },
  });

  const onSubmitHandler: SubmitHandler<FormValues> = (data) => {
    const accidentInfo = {
      duration: +data.duration,
      age: +data.age,
      activities: [OPTIONS.indexOf(data.activities) + 1],
      insuranceSum: data.insuranceSum,
    };
    calculationsPolicy({
      type: 'ACCIDENT',
      accidentCalculationDto: accidentInfo,
    });
  };

  const handleButtonClick = () => navigate(-1);

  return (
    <FormProvider {...methods}>
      <form className={styles['form']}>
        <div className={styles['form__container']}>
          <div className={styles['form__body']}>
            <div className={styles['form__row']}>
              <NumberController
                name='duration'
                rules={{
                  required: 'Укажите длительность полиса',
                  max: { value: 365, message: 'Допустимое значение от 1 до 365' },
                  min: { value: 1, message: 'Допустимое значение от 1 до 365' },
                }}
                label='Длительность полиса'
              />
              <SelectController
                name='insuranceSum'
                rules={{
                  required: 'Укажите страховую сумму',
                }}
                label='Страховая сумма полиса'
                options={['100000', '200000', '300000', '400000', '500000']}
                required
              />
            </div>
            <div className={styles['form__row']}>
              <NumberController
                name='age'
                rules={{
                  required: 'Укажите возраст',
                  max: { value: 65, message: 'Возраст страхуемого не может быть больше 65 лет' },
                }}
                label='Возраст страхуемого лица'
              />
              <SelectController
                name='activities'
                rules={{
                  required: 'Это поле обязательно для заполнения',
                }}
                label='Предполагаемая сфера деятельности'
                options={OPTIONS}
                required={true}
              />
            </div>
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
