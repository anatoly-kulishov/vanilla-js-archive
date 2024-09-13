import styles from '../../../../pages/insuranceClaim/InsuranceClaim.module.scss';
import { Input } from '../../../../shared';
import { ErrorMessage } from '../../../../features/createInsuranceApplicationRequest/ui/createHomeContentsInsuranceApplication/errorMessage';
import { Controller, useFormContext } from 'react-hook-form';
import { eventOptions, FIELDS } from '../../constants.ts';
import classNames from 'classnames';
import { VALIDATION_RULES } from '@/features/createInsuranceApplicationRequest/constants/index.ts';

export const OsagoClaim = () => {
  const { control } = useFormContext();

  return (
    <div className={styles['form__column']}>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.vehicleFullName}
          rules={{ required: 'Укажите наименование автомобиля' }}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text
                white
                label='Наименование автомобиля'
                isError={!!error}
                required
                {...field}
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={FIELDS.vehicleEvent}
          rules={{ required: 'Выберите тип события' }}
          render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Select
                size='m'
                options={eventOptions}
                label='Тип события'
                white
                isError={!!error}
                required
                onMySelect={onChange}
                onBlur={onBlur}
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
      </div>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.vehicleDate}
          rules={{
            validate: (v: Date) => {
              if (!v) return 'Укажите дату события';
              if (v > new Date()) return 'Дата не должна быть позже текущей даты';
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Date label='Дата события' isError={!!error} required white {...field} />
              <ErrorMessage error={error} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={FIELDS.vehicleAddress}
          rules={VALIDATION_RULES.vehicleAddress}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text label='Адрес ДТП' isError={!!error} required white {...field} />
              <ErrorMessage error={error} />
            </div>
          )}
        />
      </div>
      <Controller
        control={control}
        name={FIELDS.vehicleDescription}
        render={({ field, fieldState: { error } }) => (
          <div className={styles['form__textArea']}>
            <textarea
              className={classNames(styles.form__textArea_input, { [styles.error]: false })}
              placeholder='Обстоятельства происшествия'
              {...field}
            />
            <ErrorMessage error={error} />
          </div>
        )}
      />
    </div>
  );
};
