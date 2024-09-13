import { PATH_PAGE, Text, Tooltip, Wrapper } from '@/shared';
import { NavMenu } from '@/shared/ui/navMenu';
import { PAGES } from '@/shared/ui/navMenu/constants';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../shared/ui/icon/assets/images/logo.svg';
import styles from './Header.module.scss';

type HeaderProps = {
  children?: ReactNode;
};

export const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <div className={styles.bgContainer}>
      <Wrapper size={'l'}>
        <header className={styles.header}>
          <Link to={PATH_PAGE.root} className={styles.header__logo}>
            <Tooltip
              showDelay={400}
              elementTooltip={<img className={styles.logoImg} src={logo} alt='logo' />}
            >
              <Text tag='p' size='s' weight='regular'>
                На главную
              </Text>
            </Tooltip>
          </Link>

          <NavMenu items={PAGES} />
          {children}
        </header>
      </Wrapper>
    </div>
  );
};
