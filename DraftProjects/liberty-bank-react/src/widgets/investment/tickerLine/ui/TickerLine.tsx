import { FC, memo } from 'react';
import { Image, TSvgImageNames, Text } from '@/shared';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { formatNumber } from '@/shared/lib/formatNumber';
import { AnimatedTicker } from '@/shared/ui/animatedTicker';
import { ASSET } from '../constants';
import styles from './TickerLine.module.scss';

interface TickerLineProps {
  tickers: {
    name: TSvgImageNames | string;
    currentValue: number;
    changedValue: number;
    changedValueInPercent: number;
    change: string;
  }[];
}

export const TickerLine: FC<TickerLineProps> = memo(function TickerLine({ tickers }) {
  if (tickers.length === 0) return;

  return (
    <div className={styles.tickerLine}>
      {tickers?.map((item) => {
        return (
          <Link className={styles.tickerLink} key={item.name} to={ASSET + item.name}>
            <Image
              image={item.name as TSvgImageNames}
              width='45'
              height='45'
              className={styles.tickerLink__icon}
            />
            <div className={styles.tickerLink__info}>
              <Text tag={'p'} weight='medium' size='s'>
                {item.name}
              </Text>
              <AnimatedTicker currentValue={item.changedValueInPercent}>
                <Text
                  tag={'p'}
                  weight='regular'
                  size='s'
                  className={cn(
                    styles.tickerLink__change,
                    item.changedValue > 0
                      ? styles.positive
                      : item.changedValue < 0
                      ? styles.negative
                      : styles.zero,
                    styles[item.change],
                  )}
                >
                  {formatNumber(item.changedValueInPercent) + ' %'}
                </Text>
              </AnimatedTicker>
            </div>
          </Link>
        );
      })}
    </div>
  );
});
