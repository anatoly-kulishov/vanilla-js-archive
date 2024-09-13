import { BackButton } from '@/shared';
import styles from './BackNavBar.module.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface BackNavBarProps {
  links: NavLink[];
}
interface NavLink {
  title: string;
  path: string;
}

export const BackNavBar: FC<BackNavBarProps> = ({ links }) => {
  return (
    <div className={styles['navbar']}>
      {links.map((item) => (
        <Link to={item.path} key={item.title}>
          <BackButton
            text={item.title}
            theme='blue'
            name='arrow-left-blue'
            height='24'
            width='24'
            className={styles['back- button']}
            click={() => {}}
          />
        </Link>
      ))}
    </div>
  );
};
