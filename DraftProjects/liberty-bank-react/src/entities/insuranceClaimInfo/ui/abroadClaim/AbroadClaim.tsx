import styles from '../../../../pages/insuranceClaim/InsuranceClaim.module.scss';
import { Input, Icon, TSvgIconNames } from '@/shared';
import { ErrorMessage } from '@/features/createInsuranceApplicationRequest/ui/createHomeContentsInsuranceApplication/errorMessage';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import {
  abroadOptions,
  FIELDS,
  Currencies,
  CurrencyNumericCode,
} from '@/entities/insuranceClaimInfo/constants';
import classNames from 'classnames';
import { useEffect } from 'react';

export const AbroadClaim = () => {
  const { control, setValue } = useFormContext();
  const currency = useWatch({ name: FIELDS.currencyNumericCode });

  useEffect(() => {
    setValue(FIELDS.currencyNumericCode, CurrencyNumericCode['643']);
  }, []);

  return (
    <div className={styles['form__column']}>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.abroad}
          rules={{ required: 'Выберите тип события' }}
          render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Select
                size='m'
                options={abroadOptions}
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
        <Controller
          control={control}
          name={FIELDS.abroadDate}
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
      </div>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.country}
          rules={{ required: 'Укажите страну в которой произошел страховой случай' }}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text label='Страна пребывания' white isError={!!error} required {...field} />
              <ErrorMessage error={error} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={FIELDS.startDate}
          rules={{
            validate: (v: Date) => {
              if (!v) return 'Укажите дату начала поездки';
              if (v > new Date()) return 'Дата не должна быть позже текущей даты';
            },
          }}
          render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Date
                label='Дата начала поездки'
                isError={!!error}
                required
                white
                value={value && new Date(value)}
                onBlur={onBlur}
                onChange={onChange}
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
      </div>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.expirationDate}
          rules={{
            validate: (v: Date) => {
              if (!v) return 'Укажите дату завершения поездки';
              if (v > new Date()) return 'Дата не должна быть позже текущей даты';
            },
          }}
          render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Date
                label='Дата завершения поездки'
                isError={!!error}
                required
                white
                value={value && new Date(value)}
                onBlur={onBlur}
                onChange={onChange}
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={FIELDS.insuranceSum}
          rules={{
            required: '',
            max: { value: 1000000, message: 'Не более 1 000 000' },
            min: { value: 0, message: 'Не менее 0' },
          }}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text
                required
                white
                label='Страховая расходов'
                isError={!!error}
                {...field}
                contentRight={<Icon icon={`${Currencies[currency]}-small` as TSvgIconNames} />}
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
      </div>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.currencyNumericCode}
          rules={{ required: 'Выберите валюту' }}
          render={({ field: { value, onBlur, onChange }, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Select
                size='m'
                options={['RUB', 'USD', 'EUR']}
                white
                label='Валюта'
                isError={!!error}
                required
                onMySelect={onChange}
                onBlur={onBlur}
                value={CurrencyNumericCode[value]}
                defaultOptionSelected={'RUB'}
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
      </div>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.injuryDescription}
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
    </div>
  );
};
