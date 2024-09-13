import { ExchangeRateCBRF, ExchangeRateOnline } from '@/entities';
import { Tabs, Text, Wrapper } from '@/shared';
import { FC } from 'react';
import styles from './Rate.module.scss';

const Rate: FC = () => {
  const tabs = [
    {
      label: 'Онлайн',
      content: <ExchangeRateOnline />,
    },
    {
      label: 'ЦБРФ',
      content: <ExchangeRateCBRF />,
    },
  ];

  return (
    <main className={styles.main}>
      <Wrapper size='l'>
        <Text tag='h1' weight='bold' className={styles.title}>
          Курсы валют
        </Text>
        <Tabs tabs={tabs} marginBottom='m' />
      </Wrapper>
    </main>
  );
};

export default Rate;
