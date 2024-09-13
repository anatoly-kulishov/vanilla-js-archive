import { Button, Image, Link, TPngImageNames, Text } from '@/shared';
import styles from './TickerCurrency.module.scss';
import { FC } from 'react';
import { NAME_CURRENCY } from '@/pages/investmentLKcatalog/constants';

export interface ITickerCurrency {
  name: string;
  price: string;
  priceChange: string;
  assetLink: string;
}

export const TickerCurrency: FC<ITickerCurrency> = ({ name, price, priceChange, assetLink }) => {
  return (
    <div key={name} className={styles['currency-item']}>
      <div className={styles['currency-item-name-block']}>
        <Image
          className={styles['svg-icon']}
          image={String(name.substring(0, 3).toLowerCase()) as TPngImageNames}
          height='40'
          width='40'
        />
        <Text tag='p' size='m'>{`${NAME_CURRENCY.get(name.toLowerCase())} (${name})`}</Text>
      </div>
      <Text tag='p' size='m'>
        {price} ₽
      </Text>
      <Text
        tag='p'
        size='m'
        className={priceChange.startsWith('+') ? styles['green'] : styles['red']}
      >
        {`${priceChange}`}
      </Text>
      <div className={styles['']}>
        <Link to={assetLink + name}>
          <Button size='m' className={styles['currency-item__button']}>
            Подробнее
          </Button>
        </Link>
      </div>
    </div>
  );
};
