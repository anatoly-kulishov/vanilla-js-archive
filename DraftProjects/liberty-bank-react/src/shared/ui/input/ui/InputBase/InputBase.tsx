import { forwardRef } from 'react';
import { IInputBaseProps } from './types';
import styles from './InputBase.module.scss';

export const InputBase = forwardRef<HTMLInputElement, IInputBaseProps>((props, ref) => {
  const { dataTestId = 'inputBase', ...rest } = props;
  return <input ref={ref} className={styles.InputBase} data-testid={dataTestId} {...rest} />;
});

InputBase.displayName = 'InputBase';
