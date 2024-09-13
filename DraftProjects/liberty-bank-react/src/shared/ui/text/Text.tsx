import { createElement, FC, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Text.module.scss';

interface TextProps extends HTMLAttributes<HTMLElement> {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children: ReactNode;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'ml' | 'xss' | 'sxs';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

  className?: string;
  'data-testid'?: string;
}

export const Text: FC<TextProps> = ({
  tag,
  children,
  weight,
  className,
  size,
  'data-testid': dataTestId,
}) => {
  const Text = ({ ...props }: HTMLAttributes<HTMLElement>) =>
    createElement(tag, { ...props, 'data-testid': dataTestId }, children);

  const textClasses = classNames(styles.text, styles[`text_${tag}`], {
    [styles[`text_${weight}`]]: weight,
    [styles[`text_${size}`]]: size,
    [className as string]: className,
  });

  return <Text className={textClasses}>{children}</Text>;
};
