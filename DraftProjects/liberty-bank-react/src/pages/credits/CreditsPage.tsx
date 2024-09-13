import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { NavBar } from '@/widgets';
import { BackButton, PATH_PAGE, Wrapper, useGetUserCreditRequestsCountQuery } from '@/shared';
import { NAV_LINKS } from './constants';
import styles from './CreditsPage.module.scss';

const CreditsPage = () => {
  const { data: creditRequestsCount } = useGetUserCreditRequestsCountQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    if (location.pathname === PATH_PAGE.credits) {
      navigate(PATH_PAGE.myCredits, { replace: true });
    }
  }, [location]);

  const navLinksWithCount = NAV_LINKS.map((link) =>
    link.title === 'Поданные заявки' ? { ...link, count: creditRequestsCount } : { ...link },
  );

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
        <NavBar links={navLinksWithCount} type='content' />
        <Outlet />
      </div>
    </Wrapper>
  );
};

export default CreditsPage;
