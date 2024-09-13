import styles from '../../../../pages/insuranceClaim/InsuranceClaim.module.scss';
import { Input } from '@/shared';
import { ErrorMessage } from '@/features/createInsuranceApplicationRequest/ui/createHomeContentsInsuranceApplication/errorMessage';
import { Controller, useFormContext } from 'react-hook-form';
import { FIELDS, thingsOptions } from '@/entities/insuranceClaimInfo/constants.ts';
import classNames from 'classnames';
import { VALIDATION_RULES } from '@/features/createInsuranceApplicationRequest/constants';

export const PropertyClaim = () => {
  const { control } = useFormContext();

  return (
    <div className={styles['form__column']}>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.thingsName}
          rules={{
            required: 'Укажите вид имущества',
            maxLength: { value: 100, message: 'Не более 100 символов' },
          }}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text white label='Вид имущества' isError={!!error} required {...field} />
              <ErrorMessage error={error} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={FIELDS.thingsEventType}
          rules={{ required: 'Выберите тип события' }}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Select
                size='m'
                options={thingsOptions}
                label='Тип события'
                white
                isError={!!error}
                required
                onMySelect={onChange}
                onBlur={onBlur}
                value={value}
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
      </div>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.thingsDate}
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
          name={FIELDS.thingLocation}
          rules={VALIDATION_RULES.fullAddress}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text
                label='Адрес расположения имущества'
                isError={!!error}
                required
                white
                {...field}
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
      </div>
      <Controller
        control={control}
        name={FIELDS.thingsDescription}
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
