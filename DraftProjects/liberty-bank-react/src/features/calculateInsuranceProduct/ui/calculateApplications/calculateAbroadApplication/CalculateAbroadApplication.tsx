import styles from '../../../shared/styles/styles.module.scss';

import { useNavigate } from 'react-router-dom';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input, TravelCalculationDto, TravelCalculationPerson } from '@/shared';
import { FC } from 'react';
import {
  ABOARD_COUNTRY_GROUP,
  ABOARD_COUNTRY_GROUP_VALUES,
  BACK_BUTTON,
  CHECKBOX_ABOARD_VALUES,
  INSURANCE_SUM_GROUP,
  SEND_CALCULATE_BUTTON,
  SPORT_ACTIVITY_GROUP,
  SPORT_ACTIVITY_GROUP_VALUES,
  SwitchButtonForm,
} from '@/features';
import { VALIDATION_RULES } from '@/features/createInsuranceApplicationRequest/constants';
import { ErrorMessage } from '../../errorMessage/ErrorMessage';
import { CountyGroup } from '@/features/createInsuranceApplicationRequest/ui/components/countryGroup/countryGroup';
import { SportActivity } from '@/features/createInsuranceApplicationRequest/ui/components/sportActivity/sportActivity';
import dayjs from 'dayjs';
import { InsuranceSum } from '@/features/createInsuranceApplicationRequest/ui/components/insuranceSum/InsuranceSum';

interface FormValues extends TravelCalculationPerson {
  countryGroup: keyof typeof ABOARD_COUNTRY_GROUP_VALUES;
  startDate: string;
  endDate: string;
  insuranceSum: string;
  sportType: keyof typeof SPORT_ACTIVITY_GROUP_VALUES;
}

interface CalculateAbroadApplicationProps {
  calculationsPolicy: (data: TravelCalculationDto) => void;
}

export const CalculateAbroadApplication: FC<CalculateAbroadApplicationProps> = ({
  calculationsPolicy,
}) => {
  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    defaultValues: {
      countryGroup: undefined,
      startDate: undefined,
      endDate: undefined,
      insuranceSum: undefined,
      birthdate: undefined,
      travelCancellation: false,
      sportType: undefined,
      baggage: false,
    },
    mode: 'onTouched',
    resetOptions: {
      keepErrors: false,
    },
  });

  const onSubmitHandler: SubmitHandler<FormValues> = ({
    countryGroup,
    startDate,
    endDate,
    insuranceSum,
    ...data
  }) => {
    calculationsPolicy({
      type: 'TRAVEL',
      travelCalculationDto: {
        countryGroup: ABOARD_COUNTRY_GROUP_VALUES[countryGroup],
        startDate: dayjs(startDate).format('YYYY-MM-DD'),
        endDate: dayjs(endDate).format('YYYY-MM-DD'),
        insuranceSum,
        persons: [
          {
            ...data,
            birthdate: dayjs(data.birthdate).format('YYYY-MM-DD'),
            sportType: SPORT_ACTIVITY_GROUP_VALUES[data.sportType],
          },
        ],
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
              <div
                className={styles['form__controller']}
                onBlur={() => {
                  methods.trigger('startDate');
                }}
              >
                <Controller
                  name='startDate'
                  rules={VALIDATION_RULES.startDate}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <>
                      <Input.Date
                        label='Дата начала поездки'
                        isError={Boolean(error)}
                        value={value}
                        required
                        white
                        onChange={(e) => {
                          onChange(e);
                          if (methods.getValues('endDate') === undefined) {
                            return;
                          }
                          methods.trigger('endDate');
                        }}
                        onBlur={onBlur}
                      />
                      {<ErrorMessage error={error} />}
                    </>
                  )}
                />
              </div>
              <div
                className={styles['form__controller']}
                onBlur={() => {
                  methods.trigger('endDate');
                }}
              >
                <Controller
                  name='endDate'
                  rules={{
                    required: 'Это поле обязательно для заполнения',
                    min: {
                      value: new Date().setHours(0, 0, 0, 0),
                      message: 'Невозможно выбрать дату меньше сегодняшней',
                    },
                    validate: (v: Date) => {
                      const checkDate = methods.getValues('startDate')
                        ? new Date(methods.getValues('startDate'))
                        : new Date();
                      if (checkDate > v) return 'Не может быть раньше даты начала поездки';
                      checkDate.setFullYear(checkDate.getFullYear() + 1);
                      if (v > checkDate)
                        return 'Не может быть позже текущей даты или даты начала поездки более чем на 1 год';
                      return true;
                    },
                  }}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <>
                      <Input.Date
                        label='Дата завершения поездки'
                        isError={Boolean(error)}
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
              <CountyGroup countryGroup={ABOARD_COUNTRY_GROUP} />
              <SportActivity sportActivity={SPORT_ACTIVITY_GROUP} />
            </div>
            <div className={styles['form__row']}>
              <InsuranceSum insuranceSum={INSURANCE_SUM_GROUP} />
              <div
                className={styles['form__field']}
                onBlur={() => {
                  methods.trigger('birthdate');
                }}
              >
                <Controller
                  name='birthdate'
                  rules={VALIDATION_RULES.dateOfBirth}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <>
                      <Input.Date
                        label='Дата рождения страхуемого лица'
                        isError={Boolean(error)}
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
          {CHECKBOX_ABOARD_VALUES.map((item) => (
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
