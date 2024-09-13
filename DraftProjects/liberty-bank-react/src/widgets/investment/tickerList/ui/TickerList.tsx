import { FC } from 'react';
import { TickerItem } from './TickerItem';
import styles from './TickerList.module.scss';

interface TickerListProps {
  tickers: {
    name: string;
    currentValue: number;
    changedValue: number;
    changedValueInPercent: number;
    change: string;
  }[];
  activeTicker: string;
  changeActiveTicker: (ticker: string) => void;
}

export const TickerList: FC<TickerListProps> = ({ tickers, activeTicker, changeActiveTicker }) => {
  if (tickers.length === 0) return;

  return (
    <ul className={styles.tickerList}>
      {tickers.map((item) => {
        return (
          <li
            className={
              styles.tickerList__item +
              ` ${activeTicker === item.name ? styles.tickerList__item_active : ''}`
            }
            key={item.name}
            onClick={() => changeActiveTicker(item.name)}
          >
            <TickerItem item={item} />
          </li>
        );
      })}
    </ul>
  );
};
