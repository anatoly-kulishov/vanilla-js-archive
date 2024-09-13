import styles from './ExchangeRate.module.scss';
import { Text, Link, Icon } from '@/shared';

export const ARRAY_EXCHANGE_RATE = [
  { country: 'eur', buy: 97.5, sale: 102.5 },
  { country: 'usd', buy: 90.5, sale: 95.5 },
];

export const ExchangeRate = () => {
  return (
    <div className={styles.content__total_exchangeRate}>
      <Link to={'/'}>
        <div className={styles.exchangeRate}>
          <Text tag={'h2'} className={styles.exchangeRate__title}>
            Курсы валют
          </Text>
          <div className={styles.exchangeRate__name}>
            <Text tag={'h4'} size={'s'} className={styles.exchangeRate__name_title}>
              Валюта
            </Text>
            <div className={styles.exchangeRate__name_number}>
              <Text tag={'h4'} size={'s'} className={styles.number__title}>
                Покупка
              </Text>
              <Text tag={'h4'} size={'s'} className={styles.number__title}>
                Продажа
              </Text>
            </div>
          </div>
          <div className={styles.exchangeRate__content}>
            <ul className={styles.exchangeRate__content_list}>
              {ARRAY_EXCHANGE_RATE.map((item, index) => {
                return (
                  <li className={styles.list__item} key={index}>
                    <div className={styles.list__item_text}>
                      {item.country === 'eur' && <Icon icon={'eur'} widthAndHeight={'32'} />}
                      {item.country === 'usd' && <Icon icon={'usd'} widthAndHeight={'32'} />}
                      <Text tag={'span'} size={'s'} className={styles.text__country}>
                        {item.country.toLocaleUpperCase()}
                      </Text>
                    </div>
                    <div className={styles.list__item_number}>
                      <Text tag={'p'} className={styles.number__data} size={'s'}>
                        {item.buy}
                      </Text>
                      <Text tag={'p'} className={styles.number__data} size={'s'}>
                        {item.sale}
                      </Text>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
};
