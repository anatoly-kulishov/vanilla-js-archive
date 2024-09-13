import { FC } from 'react';
import { NavLink as NavLinkRouter } from 'react-router-dom';
import classNames from 'classnames';
import styles from './NavLink.module.scss';

export interface INavLink {
  title: string;
  path: string;
  isContentType: boolean;
  count?: number;
  isReplace?: boolean;
  testid?: string;
}

export const NavLink: FC<INavLink> = ({
  title,
  path,
  isContentType,
  count = 0,
  isReplace = false,
  testid,
}) => {
  return (
    <NavLinkRouter
      to={path}
      className={({ isActive }) =>
        classNames(styles.link, { [styles['link--active']]: isActive && isContentType })
      }
      replace={isReplace}
      data-testid={testid}
    >
      <p>{title}</p>
      {count > 0 && <span className={styles.count}>{count}</span>}
    </NavLinkRouter>
  );
};
