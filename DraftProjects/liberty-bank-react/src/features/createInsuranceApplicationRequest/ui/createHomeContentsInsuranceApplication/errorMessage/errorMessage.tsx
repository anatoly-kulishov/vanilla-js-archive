import { FC } from 'react';
import styles from './errorMessage.module.scss';
import { FieldError } from 'react-hook-form';
import { Text } from '@/shared';

interface Props {
  error?: FieldError;
}

export const ErrorMessage: FC<Props> = ({ error }) =>
  error && (
    <Text tag='p' className={styles['form__error']}>
      {`${error.message}`}
    </Text>
  );
