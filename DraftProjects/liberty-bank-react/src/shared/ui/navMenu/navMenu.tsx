import { FC } from 'react';
import styles from './navMenu.module.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

interface IMenuItem {
  id: number;
  label: string;
  link: string;
}

interface INavMenuProps {
  items: readonly IMenuItem[];
  colorText?: 'primary' | 'action' | 'secondary';
  activeColorText?: 'action';
  weight?: 'regular' | 'medium';
  activePadding?: 'S' | 'M';
  disableActive?: boolean;
}

export const NavMenu: FC<INavMenuProps> = ({
  items,
  colorText = 'primary',
  disableActive = false,
  activeColorText,
  activePadding = 'S',
  weight = 'regular',
}) => {
  return (
    <nav className={styles.container}>
      {items.map((item) => (
        <NavLink
          className={({ isActive }) =>
            classNames(styles[`colorText_${colorText}`], styles[`textWeight_${weight}`], {
              [styles.active]: isActive && !disableActive,
              [styles[`activeColorText_${activeColorText}`]]:
                isActive && !disableActive && activeColorText,
              [styles[`activePadding_${activePadding}`]]: isActive && !disableActive,
            })
          }
          to={item.link}
          key={item.id}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};
