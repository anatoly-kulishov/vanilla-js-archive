import { useNavigate, useParams } from 'react-router-dom';
import { MyCardInfo, CardsInfoCategories } from '@/widgets';
import {
  BackButton,
  PATH_PAGE,
  Tabs,
  getAccessToken,
  getCustomerId,
  useGetMyCardInfoQuery,
} from '@/shared';
import { TEXT } from './constants.ts';
import styles from './MyCardPage.module.scss';

const MyCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const customerId = getCustomerId(accessToken!);
  const { data: card } = useGetMyCardInfoQuery({ cardId: id ?? '', customerId });

  const tabs = [
    {
      label: TEXT.infoCardLabel,
      content: card && (
        <>
          <MyCardInfo cardInfo={card} />
          <CardsInfoCategories card={card} cardId={id ?? ''} />
        </>
      ),
    },
    {
      label: TEXT.historyTransactionsLabel,
      content: <p />,
    },
  ];

  const handleBackButtonClick = () => navigate(PATH_PAGE.myCards);

  // TODO Добавить обработчик ошибок - error boundary или компонент

  return (
    <div className={styles['my-card-page']}>
      <div className={styles['my-card-page__back-btn']}>
        <BackButton
          click={handleBackButtonClick}
          text={TEXT.back}
          theme='blue'
          height='24'
          width='24'
          name='arrow-left-blue'
        />
      </div>
      <div className={styles['my-cards-page__tabs']}>{card && <Tabs tabs={tabs} />}</div>
    </div>
  );
};

export default MyCardPage;
