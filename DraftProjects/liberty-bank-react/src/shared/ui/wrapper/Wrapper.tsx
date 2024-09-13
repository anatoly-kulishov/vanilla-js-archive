import { FC, ReactNode } from 'react';
import styles from './Wrapper.module.scss';
import classnames from 'classnames';

type WrapperProps = {
  children?: ReactNode;
  size?: 'm' | 'l';
  className?: string;
};

export const Wrapper: FC<WrapperProps> = ({ children, size = 'm', className }) => {
  return (
    <div className={classnames(className, styles.wrapper, styles[`wrapper_${size}`])}>
      {children}
    </div>
  );
};
