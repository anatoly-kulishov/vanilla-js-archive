import { Controller, useFormContext } from 'react-hook-form';
import styles from '../../../shared/styles/styles.module.scss';
import {
  HC_CLIENT,
  VALIDATION_RULES,
} from '@/features/createInsuranceApplicationRequest/constants';
import { Input } from '@/shared';
import { ErrorMessage } from '@/features/createInsuranceApplicationRequest/ui/createHomeContentsInsuranceApplication/errorMessage';
import { FC } from 'react';

type ClientInfoFieldProps = {
  namePrefix?: string;
};

type NamesType = {
  [key: string]: string;
};

export const ClientInfoField: FC<ClientInfoFieldProps> = ({ namePrefix }) => {
  const { control, watch, trigger } = useFormContext();
  const names: NamesType = {
    dateOfBirth: 'dateOfBirth',
    surname: 'surname',
    name: 'name',
    patronymic: 'patronymic',
  };

  if (namePrefix) {
    for (const key in names) {
      names[key] = `${namePrefix}.${key}`;
    }
  }

  const dateOfBirth = watch(names.dateOfBirth);

  return (
    <div className={styles['form__column']}>
      <div className={styles['form__row']}>
        <div className={styles['form__field']}>
          <Controller
            control={control}
            name={names.name}
            rules={VALIDATION_RULES.firstName}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input.Text
                  white
                  size='m'
                  label='Имя'
                  isError={Boolean(error)}
                  required
                  {...field}
                />
                {<ErrorMessage error={error} />}
              </>
            )}
          />
        </div>
        <div className={styles['form__field']}>
          <Controller
            control={control}
            name={names.surname}
            rules={VALIDATION_RULES.lastName}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input.Text
                  white
                  size='m'
                  label='Фамилия'
                  isError={Boolean(error)}
                  required
                  {...field}
                />
                <ErrorMessage error={error} />
              </>
            )}
          />
        </div>
      </div>
      <div className={styles['form__row']}>
        <div className={styles['form__field']}>
          <Controller
            control={control}
            name={names.dateOfBirth}
            rules={VALIDATION_RULES.dateOfBirth}
            render={({ field: { name, onChange, value, onBlur }, fieldState: { error } }) => (
              <>
                <Input.Date
                  className={styles['bg_primary']}
                  label={HC_CLIENT.dateOfBirth}
                  size='m'
                  isError={Boolean(error)}
                  required
                  white
                  onChange={(e) => {
                    onChange(e);
                    if (dateOfBirth) trigger('dateOfIssue');
                  }}
                  {...{ name, onBlur, value }}
                />
                {<ErrorMessage error={error} />}
              </>
            )}
          />
        </div>
        <div className={styles['form__field']}>
          <Controller
            control={control}
            name={names.patronymic}
            rules={VALIDATION_RULES.patronymic}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input.Text white size='m' label='Отчество' isError={Boolean(error)} {...field} />
                <ErrorMessage error={error} />
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};
