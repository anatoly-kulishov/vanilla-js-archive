import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { NavBar } from '@/widgets';
import { BackButton, PATH_PAGE, Wrapper } from '@/shared';
import { DEPOSIT_NAV_LINKS } from './constants';
import styles from './DepositsPage.module.scss';

const DepositsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    if (location.pathname === PATH_PAGE.deposits) {
      navigate(PATH_PAGE.myDeposits, { replace: true });
    }
  }, [location]);

  return (
    <Wrapper size='l'>
      {id && (
        <BackButton
          text='Назад'
          name='arrow-left-blue'
          theme='blue'
          height='24'
          width='24'
          className={styles.back_button}
        />
      )}
      <div className={styles.wrapper}>
        <NavBar links={DEPOSIT_NAV_LINKS} type='content' />
        <Outlet />
      </div>
    </Wrapper>
  );
};

export default DepositsPage;
