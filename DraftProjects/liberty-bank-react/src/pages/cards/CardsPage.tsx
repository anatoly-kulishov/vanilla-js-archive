import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { NavBar } from '@/widgets';
import { BackButton, PATH_PAGE, Wrapper, useGetCreditCardRequestsQuery } from '@/shared';
import { CARDS_NAV_LINKS, TEXT } from './constants';
import styles from './CardsPage.module.scss';

const CardsPage = () => {
  const location = useLocation();
  const isCardProductPage = location.pathname.includes('Liberty');
  const navigate = useNavigate();
  const isCreditCardProductPage = location.pathname.startsWith('/cards/my-cards/credit-cards');

  const handleBackButtonClick = () => navigate(PATH_PAGE.cardProducts);
  const { data: cardRequests } = useGetCreditCardRequestsQuery();

  const navLinksWithCount = CARDS_NAV_LINKS.map((link) =>
    link.title === TEXT.deliveredApplication
      ? { ...link, count: cardRequests?.length }
      : { ...link },
  );

  return (
    <Wrapper size='l' className={styles['cards-page']}>
      {isCardProductPage && (
        <BackButton
          click={handleBackButtonClick}
          text={TEXT.back}
          theme='blue'
          height='24'
          width='24'
          name='arrow-left-blue'
        />
      )}
      {!isCreditCardProductPage && (
        <div className={styles['nav-wrapper']}>
          <NavBar links={navLinksWithCount} type='content' isReplace />
        </div>
      )}
      <Outlet />
    </Wrapper>
  );
};

export default CardsPage;
