import { FC, ReactNode, ReactElement } from 'react';
import { Link as LinkTo } from 'react-router-dom';
import classnames from 'classnames';
import styles from './Link.module.scss';

interface ILink {
  to: string;
  children: ReactNode;
  size?: 'm' | 'xs';
  icon?: ReactElement;
  nowrap?: boolean;
  theme?: 'button';
  className?: string;
}

export const Link: FC<ILink> = ({
  to,
  children,
  size = 'm',
  icon,
  nowrap = false,
  theme,
  className,
}) => {
  return (
    <LinkTo
      to={to}
      className={classnames(
        styles[`link-size_${size}`],
        {
          [styles.link]: !icon,
          [styles.link_withIcon]: !!icon,
          [styles.nowrap]: nowrap,
          [styles[`theme_${theme}`]]: theme,
        },
        className,
      )}
    >
      {children}
      {icon ?? null}
    </LinkTo>
  );
};
