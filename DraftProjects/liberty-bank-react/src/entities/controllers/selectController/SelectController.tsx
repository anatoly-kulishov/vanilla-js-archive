import { ErrorMessage } from '@/features/createInsuranceApplicationRequest/ui/createHomeContentsInsuranceApplication/errorMessage';
import { Input } from '@/shared';
import { useFormContext, Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import styles from './SelectController.module.scss';
import { FC } from 'react';
import { TOption } from '../types';

interface SelectControllerProps {
  name: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined;
  options: TOption[];
  label: string;
  required?: boolean;
  size?: 'l' | 's' | 'm';
}

// TODO сделать разные варианты стилей инпуту
export const SelectController: FC<SelectControllerProps> = ({
  name,
  options,
  rules,
  label,
  required = true,
  size = 'm',
}) => {
  const { control } = useFormContext();

  return (
    <div className={styles['controller']}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input.Select
              options={options}
              id={name}
              className={styles['bg_primary']}
              label={label}
              required={required}
              white
              onMySelect={field.onChange}
              size={size}
              isError={Boolean(error)}
              {...field}
            />
            <ErrorMessage error={error} />
          </>
        )}
      />
    </div>
  );
};
