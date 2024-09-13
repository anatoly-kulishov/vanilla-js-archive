import styles from '../../../shared/styles/styles.module.scss';
import { Input } from '@/shared';
import { REQUIRED_FIELD_ERROR } from '../../../constants';
import { Controller, useFormContext } from 'react-hook-form';
import { FC } from 'react';
import { ErrorMessage } from '../../createHomeContentsInsuranceApplication/errorMessage';

type CountyGroupType = {
  label: string;
  options: string[];
};

interface PropsType {
  countryGroup: CountyGroupType;
}

export const CountyGroup: FC<PropsType> = ({ countryGroup }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles['form__field']}>
      <Controller
        control={control}
        name='countryGroup'
        rules={{
          required: REQUIRED_FIELD_ERROR,
        }}
        render={({ field: { name, onChange, value, onBlur }, fieldState: { error } }) => (
          <>
            <Input.Select
              name={name}
              options={countryGroup.options}
              id='countryGroup'
              required
              isError={!!errors.countryGroup}
              onMySelect={onChange}
              onBlur={onBlur}
              value={value}
              size='m'
              label={countryGroup.label}
              white
            />
            <ErrorMessage error={error} />
          </>
        )}
      />
    </div>
  );
};
