import { CardTariffs } from '@/entities';
import { BackButton, getAccessToken, getCustomerId, useGetCardTariffsQuery } from '@/shared';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './MyCardTariff.module.scss';

const MyCardTariffs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const customerId = getCustomerId(accessToken!);
  const { data: tariffs } = useGetCardTariffsQuery({ customerId, cardId: id ?? '' });

  const handleBackButtonClick = () => navigate(`/cards/my-cards/${id}`);

  return (
    <section className={styles['my-card-page']} aria-label='Тариф'>
      <div className={styles['my-card-page__back-btn']}>
        <BackButton
          click={handleBackButtonClick}
          text='Назад'
          theme='blue'
          height='24'
          width='24'
          name='arrow-left-blue'
        />
      </div>
      <div className={styles['my-card-page__table']}>
        {tariffs && (
          <CardTariffs
            transferFee={tariffs.transferFee}
            withdrawalCashFee={tariffs.withdrawalCashFee}
            costPerMonth={[tariffs.costPerMonth]}
            freeCostFrom={[tariffs.freeCostFrom]}
            servicePrice={[tariffs.servicePrice]}
            cardReissue={[tariffs.cardReissueCost]}
            addCardCost={[tariffs.addCardCost]}
            cashback={tariffs.cashback}
            currency={[tariffs.currency]}
          />
        )}
      </div>
    </section>
  );
};

export default MyCardTariffs;
