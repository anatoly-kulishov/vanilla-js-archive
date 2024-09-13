import styles from '../../../shared/styles/styles.module.scss';

import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button, ThingCalculationDto } from '@/shared';
import { FC } from 'react';
import { NumberController, SelectController } from '@/entities';
import {
  BACK_BUTTON,
  CHECKBOX_HOME_CONTENTS_VALUES,
  SEND_CALCULATE_BUTTON,
  SwitchButtonForm,
  TERM_MONTHS,
} from '@/features';
import {
  HC_BUILDING_MATERIAL,
  HC_LOCATION,
  VALIDATION_RULES,
} from '@/features/createInsuranceApplicationRequest/constants';

interface FormValues {
  cost: number;
  duration: string;
  constructionMaterial: keyof typeof HC_BUILDING_MATERIAL;
  floor: number;
  securitySystem: boolean;
  risk: boolean;
}

interface CalculateHomeContentsProps {
  calculationsPolicy: (data: ThingCalculationDto) => void;
}

export const CalculateHomeContents: FC<CalculateHomeContentsProps> = ({ calculationsPolicy }) => {
  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    defaultValues: {
      cost: undefined,
      duration: undefined,
      constructionMaterial: undefined,
      securitySystem: false,
      floor: undefined,
      risk: false,
    },
    mode: 'onTouched',
    resetOptions: {
      keepErrors: false,
    },
  });

  const onSubmitHandler: SubmitHandler<FormValues> = (data) => {
    calculationsPolicy({
      type: 'THING',
      thingCalculationDto: {
        ...data,
        constructionMaterial: HC_BUILDING_MATERIAL[data.constructionMaterial],
        duration: parseInt(data.duration),
      },
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
                name='cost'
                rules={VALIDATION_RULES.thingsCost}
                label='Оценочная стоимость объекта страхования'
              />
              <SelectController
                name='duration'
                rules={{
                  required: 'Это поле обязательно для заполнения',
                }}
                label='Длительность полиса'
                options={TERM_MONTHS}
                required={true}
              />
            </div>
            <div className={styles['form__row']}>
              <SelectController
                name='constructionMaterial'
                rules={{
                  required: 'Это поле обязательно для заполнения',
                }}
                label={HC_LOCATION.buildingMaterial}
                options={Object.keys(HC_BUILDING_MATERIAL)}
                required={true}
              />
              <NumberController name='floor' rules={VALIDATION_RULES.floor} label='Этаж строения' />
            </div>
          </div>

          {CHECKBOX_HOME_CONTENTS_VALUES.map((item) => (
            <SwitchButtonForm key={item} name={item} />
          ))}

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
