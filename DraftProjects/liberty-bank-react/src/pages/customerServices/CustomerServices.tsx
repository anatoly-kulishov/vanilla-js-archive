import { FC } from 'react';
import { CustomerServiceCard, Text } from '@/shared';
import health from '@/shared/ui/icon/assets/images/health.png';
import product from '@/shared/ui/icon/assets/images/product.png';
import styles from './CustomerServices.module.scss';

const mockdata = [
  {
    title: 'Здоровье',
    text: 'Кэшбек 4%',
    img: health,
    bgStyle: 'health',
  },
  {
    title: 'Свой',
    text: 'Кэшбек 5%',
    img: product,
    bgStyle: 'product',
  },
  {
    title: 'Свой',
    text: 'Кэшбек 6%',
    img: product,
    bgStyle: 'product',
  },
  {
    title: 'Здоровье',
    text: 'Кэшбек 3%',
    img: health,
    bgStyle: 'health',
  },
];

const CustomerServices: FC = () => {
  return (
    <>
      <Text tag='h3' weight='medium' className={styles.title}>
        Пакеты сервисов
      </Text>
      <ul className={styles.cardList}>
        {mockdata.map((card, index) => (
          <li key={String(Symbol(index))}>
            <CustomerServiceCard cardData={card} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default CustomerServices;
