import { FC } from 'react';
import { Text } from '@/shared';
import { AnimatedTicker } from '@/shared/ui/animatedTicker';
import { formatNumber } from '@/shared/lib/formatNumber';
import { ITickerItem } from '../model/types';
import styles from './TickerList.module.scss';

export const TickerItem: FC<ITickerItem> = ({ item }) => {
  return (
    <>
      <Text tag={'span'} size={'m'} weight={'bold'} className={styles.tickerList__ticker}>
        {item.name}
      </Text>
      <AnimatedTicker currentValue={item.changedValue} style={styles.tickerList__value}>
        <Text
          tag={'span'}
          size={'m'}
          className={styles.tickerList__value + ' ' + styles.tickerList__text}
        >
          {formatNumber(item.currentValue, false)}
        </Text>
      </AnimatedTicker>
      <Text
        tag={'span'}
        size={'m'}
        className={
          styles.tickerList__text +
          ` ${
            item.changedValue > 0
              ? styles.positive
              : item.changedValue < 0
              ? styles.negative
              : styles.zero
          }`
        }
      >
        {formatNumber(item.changedValue || 0)}
      </Text>
      <Text
        tag={'span'}
        size={'m'}
        className={
          styles.tickerList__text +
          ` ${
            item.changedValue > 0
              ? styles.positive
              : item.changedValue < 0
              ? styles.negative
              : styles.zero
          }`
        }
      >
        {formatNumber(item.changedValueInPercent) + '%'}
      </Text>
    </>
  );
};
