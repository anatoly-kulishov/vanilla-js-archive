import styles from '../../../shared/styles/styles.module.scss';
import { Controller, useFormContext } from 'react-hook-form';
import { FC } from 'react';
import { ErrorMessage } from '../../createHomeContentsInsuranceApplication/errorMessage';
import { Input } from '@/shared';
import { OPTIONS } from '@/widgets/insuranceEditOrder/constant';
import classNames from 'classnames';

export const AccidentActivity: FC<OPTIONS> = ({ onlySum, optionInfo }) => {
  const { control } = useFormContext();

  return (
    <div className={styles['form__row']}>
      <div className={classNames(styles['form__field'], { [styles['width-550']]: onlySum })}>
        <Controller
          control={control}
          name={'sum'}
          render={({ field, fieldState: { error } }) => (
            <>
              <Input.Number
                label='Сумма страхования'
                width='max'
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
      {optionInfo && (
        <div className={styles['form__field']}>
          <Controller
            control={control}
            name={optionInfo.name}
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <>
                <Input.Select
                  placeholder={optionInfo?.placeholder}
                  options={optionInfo.options}
                  value={value}
                  white
                  width='max'
                  size='m'
                  onMySelect={onChange}
                  onBlur={onBlur}
                />
                <ErrorMessage error={error} />
              </>
            )}
          />
        </div>
      )}
    </div>
  );
};
