import styles from '@/pages/insuranceClaim/InsuranceClaim.module.scss';
import { Icon, Input, TSvgIconNames } from '@/shared';
import { ErrorMessage } from '@/features/createInsuranceApplicationRequest/ui/createHomeContentsInsuranceApplication/errorMessage';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import {
  Currencies,
  CurrencyNumericCode,
  FIELDS,
} from '@/entities/insuranceClaimInfo/constants.ts';
import { useEffect } from 'react';

export const ContractInfo = () => {
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
          name={FIELDS.agreementNumber}
          rules={{
            required: 'Введите номер договора',
            pattern: { value: /^(?![0])[А-ЯЁа-яё\s"(),\-.№0-9]*$/, message: 'Недопустимый формат' },
          }}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text
                label='Номер договора'
                white
                isError={!!error}
                required
                {...field}
                disabled
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={FIELDS.startDate}
          rules={{
            validate: (v: Date) => {
              if (!v) return 'Укажите дату подписания договора';
              if (v > new Date()) return 'Дата не должна быть позже текущей даты';
            },
          }}
          render={({ fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Date label='Договор от' isError={!!error} required white disabled />
              <ErrorMessage error={error} />
            </div>
          )}
        />
      </div>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.startDate}
          rules={{
            validate: (v: Date) => {
              if (!v) return 'Укажите дату начала действия договора';
              if (v > new Date()) return 'Дата не должна быть позже текущей даты';
            },
          }}
          render={({ fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Date
                label='Дата начала действия договора'
                isError={!!error}
                required
                white
                disabled
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={FIELDS.expirationDate}
          rules={{ required: 'Укажите дату завершения действия договора' }}
          render={({ fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Date
                label='Дата завершения действия договора'
                isError={!!error}
                required
                white
                disabled
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
      </div>
      <div className={styles['form__row']}>
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
                label='Страховая сумма'
                isError={!!error}
                {...field}
                contentRight={<Icon icon={`${Currencies[currency]}-small` as TSvgIconNames} />}
                disabled
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
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
    </div>
  );
};
