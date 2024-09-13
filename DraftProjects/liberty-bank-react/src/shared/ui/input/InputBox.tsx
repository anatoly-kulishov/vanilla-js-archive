import styles from './Input.module.scss';
import classNames from 'classnames';
import { FC } from 'react';
import { InputBoxProps } from './model/types.ts';

export const InputBox: FC<InputBoxProps> = ({ children, className, dataTestid }) => {
  return (
    <div
      data-testid={dataTestid}
      className={classNames(styles.inputBox, { [className as string]: className })}
    >
      {children}
    </div>
  );
};
