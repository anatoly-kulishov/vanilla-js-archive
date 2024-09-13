import styles from '../../shared/styles/styles.module.scss';
import { Text, Input } from '@/shared';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '../../ui/errorMessage/ErrorMessage';
import { FC } from 'react';
import { DriverFrameProps } from '../../shared';

export const DriversFrame: FC<DriverFrameProps> = ({ index }) => {
  const inputRules = {
    required: 'Это поле обязательно для заполнения',
    validate: (value: string) => parseFloat(value) >= 0,
  };
  return (
    <div className={styles['form__driver']}>
      <Text tag='p' size='s' weight='semibold' className={styles['form__driver_title']}>
        {`Водитель №${index + 1}`}
      </Text>
      <div className={styles['form__row']}>
        <div className={styles['form__controller']}>
          <Controller
            name={`drivers.${index}.age`}
            rules={{
              required: 'Это поле обязательно для заполнения',
              validate: (value: string) => parseFloat(value) >= 18,
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input.Number
                  label='Возраст водителя'
                  className={styles['form__input']}
                  width='auto'
                  white
                  isError={!!error}
                  required
                  {...field}
                />
                <ErrorMessage error={error} />
              </>
            )}
          />
        </div>
        <div className={styles['form__controller']}>
          <Controller
            name={`drivers.${index}.experience`}
            rules={inputRules}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input.Number
                  label='Стаж водителя'
                  className={styles['form__input']}
                  white
                  isError={!!error}
                  required
                  {...field}
                />
                <ErrorMessage error={error} />
              </>
            )}
          />
        </div>
        <div className={styles['form__controller']}>
          <Controller
            name={`drivers.${index}.yearWithoutAccident`}
            rules={inputRules}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input.Number
                  label='Без аварий'
                  className={styles['form__input']}
                  white
                  isError={!!error}
                  required
                  {...field}
                  contentRight={'лет'}
                />
                <ErrorMessage error={error} />
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};
