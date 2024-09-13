import styles from '../../../shared/styles/styles.module.scss';
import { REQUIRED_FIELD_ERROR } from '../../../constants';
import { Controller, useFormContext } from 'react-hook-form';
import { FC } from 'react';
import { ErrorMessage } from '../../createHomeContentsInsuranceApplication/errorMessage';
import { Input } from '@/shared';

type InsuranceSumType = {
  label: string;
  options: string[];
};

interface PropsType {
  insuranceSum: InsuranceSumType;
}

export const InsuranceSum: FC<PropsType> = ({ insuranceSum }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles['form__field']}>
      <Controller
        control={control}
        name='insuranceSum'
        rules={{
          required: REQUIRED_FIELD_ERROR,
        }}
        render={({ field: { name, onChange, value, onBlur }, fieldState: { error } }) => (
          <>
            <Input.Select
              name={name}
              options={insuranceSum.options}
              id='insuranceSum'
              required
              isError={!!errors.insuranceSum}
              onMySelect={onChange}
              onBlur={onBlur}
              value={value}
              size='m'
              label={insuranceSum.label}
              white
            />
            <ErrorMessage error={error} />
          </>
        )}
      />
    </div>
  );
};
