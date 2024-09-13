import { FC } from 'react';
import classNames from 'classnames';
import styles from './InputErrorMessage.module.scss';
import { Icon } from '../icon';

interface InputErrorMessageProps {
  message: string;
  isValid?: boolean;
  classNameProp?: string;
}

export const InputErrorMessage: FC<InputErrorMessageProps> = ({
  message,
  isValid,
  classNameProp,
  ...rest
}) => {
  if (!message) return null;

  return (
    <p
      className={
        classNameProp ??
        classNames(styles.inputErrorMessage, {
          [styles.inputErrorMessage_valid]: isValid,
        })
      }
      {...rest}
    >
      {isValid !== undefined && (
        <Icon icon={isValid ? 'success' : 'alert'} widthAndHeight={'16px'} />
      )}
      {message}
    </p>
  );
};
