import { FC } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import styles from '../../../shared/styles/styles.module.scss';

import { HC_CONTRACT, HC_DURATION, VALIDATION_RULES } from '../../../constants';

import classNames from 'classnames';

import { Input, Text } from '@/shared';
import { ShowDaysInput } from '@/features/createInsuranceApplicationRequest/shared/components/showDaysInput/showDaysInput';
import { ErrorMessage } from '@/features/createInsuranceApplicationRequest/ui/createHomeContentsInsuranceApplication/errorMessage';
import { DurationType } from '@/features/createInsuranceApplicationRequest/model/types';

type PropsType = {
  duration: DurationType;
};

export const DurationField: FC<PropsType> = ({ duration }) => {
  const { control, getValues, trigger } = useFormContext();

  const defineMonths = (maxMonths: number) => {
    switch (maxMonths) {
      case 12:
        return VALIDATION_RULES.durationAbroad;
      case 60:
        return VALIDATION_RULES.durationApartment;
      case 120:
        return VALIDATION_RULES.durationHome;
    }
  };

  const getInput = () => {
    switch (duration.type) {
      case 'DatePicker':
        return (
          <>
            <div
              className={styles['form__field']}
              onBlur={() => {
                trigger('startDate');
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
                        if (getValues('endDate') === undefined) {
                          return;
                        }
                        trigger('endDate');
                      }}
                      onBlur={onBlur}
                    />
                    {<ErrorMessage error={error} />}
                  </>
                )}
              />
            </div>
            <div
              className={styles['form__field']}
              onBlur={() => {
                trigger('endDate');
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
                    const checkDate = getValues('startDate')
                      ? new Date(getValues('startDate'))
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
          </>
        );
      case 'Input':
        return (
          <div className={classNames(styles['form__field'], styles['width-550'])}>
            <Controller
              control={control}
              name='duration'
              rules={defineMonths(duration.maxMonths)}
              render={({ field: { name, onChange, value, onBlur }, fieldState: { error } }) => (
                <>
                  <Input.Number
                    white
                    size='m'
                    required
                    isError={Boolean(error)}
                    label={HC_CONTRACT.insuranceTerm}
                    className={styles['required-field']}
                    value={value}
                    {...{ name, onChange, onBlur }}
                  />
                  <ErrorMessage error={error} />
                </>
              )}
            />
          </div>
        );
      case 'StartDate':
        return (
          <>
            <div className={classNames(styles['form__field'])}>
              <Controller
                control={control}
                name='duration'
                rules={defineMonths(duration.maxMonths)}
                render={({ field: { name, onChange, value, onBlur }, fieldState: { error } }) => (
                  <>
                    <Input.Number
                      white
                      size='m'
                      required
                      isError={Boolean(error)}
                      label={HC_CONTRACT.insuranceTerm}
                      className={styles['required-field']}
                      {...{ name, value, onChange, onBlur }}
                    />
                    <ErrorMessage error={error} />
                  </>
                )}
              />
            </div>
            <div className={classNames(styles['form__field'])}>
              <Controller
                control={control}
                name='startDate'
                rules={{
                  required: 'Укажите дату окончания действия договора',
                  validate: (v: Date) => {
                    if (v <= new Date()) return 'Дата не должна быть раньше или равна текущей дате';
                  },
                }}
                render={({ field: { name, onChange, value, onBlur }, fieldState: { error } }) => (
                  <>
                    <Input.Date
                      label={HC_DURATION.startDate}
                      value={value && new Date(value)}
                      required
                      isError={Boolean(error)}
                      size='m'
                      white
                      onChange={onChange}
                      {...{ name, onBlur }}
                    />
                    <ErrorMessage error={error} />
                  </>
                )}
              />
            </div>
          </>
        );
      default:
        return (
          <div className={classNames(styles['form__field'], styles['width-550'])}>
            <Controller
              control={control}
              name='duration'
              rules={defineMonths(duration.maxMonths)}
              render={({ field: { name, onChange, value, onBlur }, fieldState: { error } }) => (
                <>
                  <Input.Number
                    white
                    size='m'
                    required
                    isError={Boolean(error)}
                    label={HC_CONTRACT.insuranceTerm}
                    className={styles['required-field']}
                    {...{ name, value, onChange, onBlur }}
                  />
                  <ErrorMessage error={error} />
                </>
              )}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className={classNames(styles['form__field'])} id='durationField'>
        {duration.title && (
          <label htmlFor='durationField' className={styles['form__field-label']}>
            <Text tag='p' size='s' weight='medium'>
              {duration.title}
            </Text>
          </label>
        )}
        <div className={styles['form__row']}>{getInput()}</div>
      </div>
      {duration.type === 'DatePicker' && <ShowDaysInput />}
    </>
  );
};
