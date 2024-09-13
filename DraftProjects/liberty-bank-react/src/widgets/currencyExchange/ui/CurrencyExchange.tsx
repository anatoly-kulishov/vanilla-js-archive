import { FC } from 'react';
import { Icon, Text, TSvgIconNames } from '@/shared';
import styles from './CurrencyExchange.module.scss';

interface ICurrencyExchange {
  country?: string;
  buy?: number;
  sale?: number;
  name?: string;
  svg: string;
  currency?: string;
  code?: string;
  rateCBRF?: number;
  compareCurrencyExchange?: number;
}

interface ICurrencyExchangeProps {
  items: readonly ICurrencyExchange[];
  converter?: boolean;
  showConverter?: boolean;
}

function getIcon(difference: number | undefined) {
  if (!difference) return null;
  return difference === 0 ? null : <Icon icon={difference === 1 ? 'arrow-green' : 'arrow-red'} />;
}

export const CurrencyExchange: FC<ICurrencyExchangeProps> = ({
  items,
  converter,
  showConverter = true,
}) => {
  return (
    <ul className={styles.currencyExchange__block}>
      {items.map((item) => (
        <li key={item.country} className={styles.currencyExchange__wrapper}>
          <div className={styles.currencyExchange__item}>
            {!converter && (
              <div className={styles.item_head}>
                <Icon icon={item.svg as TSvgIconNames} widthAndHeight={'32px'} />
                <Text tag='h4' weight='regular'>
                  1 {item.name} {item.country}
                </Text>
              </div>
            )}
            {converter && (
              <div className={styles.item_head}>
                <Text tag='h4' weight='bold'>
                  {item.currency}
                </Text>
              </div>
            )}
            {showConverter ? (
              <div className={styles.currencyExchange__item_sale}>
                <div className={styles.item__content}>
                  <div className={styles.item__sale}>
                    <Text tag='h4' weight='medium' className={styles.item__sale}>
                      {item.buy}
                    </Text>
                    {getIcon(item.compareCurrencyExchange)}
                  </div>
                  <Text className={styles.item__text} tag='h5'>
                    Покупка
                  </Text>
                </div>
                <div className={styles.item__content}>
                  <div className={styles.item__sale}>
                    <Text tag='h4' weight='medium' className={styles.item__sale}>
                      {item.buy}
                    </Text>
                    {getIcon(item.compareCurrencyExchange)}
                  </div>
                  <Text className={styles.item__text} tag='h5'>
                    Продажа
                  </Text>
                </div>
              </div>
            ) : (
              <div className={styles.currencyExchange__item_sale}>
                <div className={styles.item__content}>
                  <div className={styles.item__sale}>
                    <Text tag='p' weight='medium' className={styles.item__sale}>
                      {item.rateCBRF}
                    </Text>
                    {getIcon(item.compareCurrencyExchange)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
