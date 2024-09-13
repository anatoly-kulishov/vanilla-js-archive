import { FieldError } from 'react-hook-form';
import { Text } from '@/shared';
import s from './ErrorMessage.module.scss';

interface Props {
  error?: FieldError;
}

export const ErrorMessage = ({ error }: Props) => {
  return (
    error && (
      <Text tag='p' size='xs' weight='regular' className={s.error}>
        {error.message}
      </Text>
    )
  );
};
