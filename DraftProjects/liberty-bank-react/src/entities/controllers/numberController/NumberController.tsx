import { ErrorMessage } from '@/features/createInsuranceApplicationRequest/ui/createHomeContentsInsuranceApplication/errorMessage';
import { Input } from '@/shared';
import { useFormContext, Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import styles from './NumberController.module.scss';
import { FC } from 'react';

interface NumberControllerProps {
  name: string;
  label: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined;
  maxLength?: number;
  required?: boolean;
  size?: 'l' | 's' | 'm';
  thousandsSeparator?: boolean;
}

// TODO сделать разные варианты стилей инпуту
export const NumberController: FC<NumberControllerProps> = ({
  name,
  rules,
  label,
  maxLength,
  required = true,
  size = 'm',
  thousandsSeparator = false,
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
            <Input.Number
              label={label}
              className={styles['input']}
              white
              isError={!!error}
              required={required}
              maxLength={maxLength}
              // FIXME переделать разделитель работает некорректно
              thousandsSeparator={thousandsSeparator}
              size={size}
              {...field}
            />
            <ErrorMessage error={error} />
          </>
        )}
      />
    </div>
  );
};
