import styles from '@/pages/insuranceClaim/InsuranceClaim.module.scss';
import { Input } from '@/shared';
import { ErrorMessage } from '@/features/createInsuranceApplicationRequest/ui/createHomeContentsInsuranceApplication/errorMessage';
import { Controller, useFormContext } from 'react-hook-form';
import { accidentOptions, FIELDS } from '../../constants.ts';
import classNames from 'classnames';

export const AccidentClaim = () => {
  const { control } = useFormContext();

  return (
    <div className={styles['form__column']}>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.injury}
          rules={{ required: 'Выберите тип события' }}
          render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Select
                options={accidentOptions}
                onMySelect={onChange}
                label='Тип события'
                size='m'
                isError={!!error}
                onBlur={onBlur}
                white
                required
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={FIELDS.injuryDate}
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
  );
};
