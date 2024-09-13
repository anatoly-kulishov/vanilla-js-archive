import { NavMenu, Wrapper } from '@/shared';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainBodyLayout.module.scss';
import { NAV_BODY_ITEM } from './constants';

const MainBodyLayout: FC = () => {
  return (
    <>
      <div className={styles.bgContainer}>
        <Wrapper size='l' className={styles.container}>
          <NavMenu
            items={NAV_BODY_ITEM}
            colorText='secondary'
            activeColorText='action'
            weight='medium'
            activePadding='M'
          />
          <button className={styles.moreButton}>Еще</button>
        </Wrapper>
      </div>

      <Outlet />
    </>
  );
};

export default MainBodyLayout;
