import React, { ReactNode, FC, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'xs' | 's' | 'm' | 'l';
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  theme?: 'primary' | 'icon' | 'secondary' | 'tertiary' | 'third';
  disabled?: boolean;
  showDisabledClass?: boolean;
  className?: string;
  width?: 'auto' | 'max';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    size = 'm',
    type = 'button',
    href = '',
    theme = 'primary',
    disabled = false,
    showDisabledClass = false,
    className,
    width = 'auto',
    onClick,
    ...rest
  } = props;

  const isDisabled = disabled || showDisabledClass;

  const buttonElement = (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={isDisabled}
      className={classNames(
        styles.btn,
        styles[`theme_${theme}`],
        styles[`btn-size_${size}`],
        styles[`btn-width_${width}`],
        {
          [styles['btn-disabled']]: isDisabled,
        },
        className,
      )}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
  return href ? <Link to={href}>{buttonElement}</Link> : buttonElement;
};
