import { INavLink, NavLink } from '@/shared/ui/navLink';
import classNames from 'classnames';
import { FC } from 'react';
import styles from './NavBar.module.scss';

interface INavBar {
  type: 'header' | 'content';
  links: Omit<INavLink, 'isContentType'>[];
  isReplace?: boolean;
  className?: string;
}

export const NavBar: FC<INavBar> = ({ type, links, isReplace, className }) => {
  return (
    <ul className={classNames(styles.list, styles[type], className)}>
      {links.map((link, index) => (
        <NavLink
          key={link.path}
          title={link.title}
          path={link.path}
          count={link.count}
          isContentType={type === 'content'}
          isReplace={isReplace}
          testid={`nav-link-${index}`}
        />
      ))}
    </ul>
  );
};
