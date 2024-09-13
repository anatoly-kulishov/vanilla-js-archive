import { BackButton, Spinner, Wrapper, useGetTickerQuery } from '@/shared';
import { InvestmentPriceNotificationsForm } from '@/widgets/investmentPriceNotificationForm/InvestmentPriceNotificationForm';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PARAMS } from '../constants';
import styles from './investmentLKcatalogPriceNotification.module.scss';

const InvestmentLKcatalogPriceNotification = () => {
  const navigate = useNavigate();
  const { ticker } = useParams<{ ticker: string }>();
  const {
    data: price,
    refetch: refetchTickers,
    isLoading: isPriceLoading,
  } = useGetTickerQuery({ ...PARAMS, securities: ticker! });
  useEffect(() => {
    const s = setInterval(() => {
      refetchTickers();
    }, 2000);

    return () => clearInterval(s);
  }, []);

  if (isPriceLoading) return <Spinner />;

  return (
    <Wrapper size='l' className={styles.main}>
      <BackButton
        click={() => {
          navigate(-1);
        }}
        text={'Назад'}
        theme={'blue'}
        className={styles.backButton}
        width='24'
        height='24'
        name='arrow-left-blue'
      />
      <InvestmentPriceNotificationsForm ticker={ticker!} tickerPrice={price!} />
    </Wrapper>
  );
};

export default InvestmentLKcatalogPriceNotification;
