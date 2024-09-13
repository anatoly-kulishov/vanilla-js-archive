import styles from '../../../shared/styles/styles.module.scss';
import { REQUIRED_FIELD_ERROR } from '../../../constants';
import { Controller, useFormContext } from 'react-hook-form';
import { FC } from 'react';
import { ErrorMessage } from '../../createHomeContentsInsuranceApplication/errorMessage';
import { Input } from '@/shared';

type sportActivityType = {
  label: string;
  options: string[];
};

interface PropsType {
  sportActivity: sportActivityType;
}

export const SportActivity: FC<PropsType> = ({ sportActivity }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles['form__field']}>
      <Controller
        control={control}
        name='sportType'
        rules={{
          required: REQUIRED_FIELD_ERROR,
        }}
        render={({ field: { name, onChange, value, onBlur }, fieldState: { error } }) => (
          <>
            <Input.Select
              name={name}
              options={sportActivity.options}
              id='sportActivity'
              required
              isError={!!errors.sportType}
              onMySelect={onChange}
              onBlur={onBlur}
              value={value}
              size='m'
              label={sportActivity.label}
              white
            />
            <ErrorMessage error={error} />
          </>
        )}
      />
    </div>
  );
};
