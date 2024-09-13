import { FC, memo } from 'react';
import { Icon, Image, TSvgIconNames, TSvgImageNames, Text } from '@/shared';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { formatNumber } from '@/shared/lib/formatNumber';
import { AnimatedTicker } from '@/shared/ui/animatedTicker';
import styles from './Ticker.module.scss';

interface TickerProps {
  name: string | TSvgImageNames;
  changedValue: number;
  changedValueInPercent: number;
  change: string;
  assetLink: string;
  action?: TSvgIconNames;
  actionClick?: () => void;
}
// TODO добавить разные варианты тикеров и сторибук
export const Ticker: FC<TickerProps> = memo(function TickerLine({
  name,
  changedValue,
  changedValueInPercent,
  change,
  assetLink,
  action,
  actionClick,
}) {
  return (
    <div className={styles.ticker}>
      <Link className={styles.tickerLink} key={name} to={assetLink + name}>
        <Image
          image={name.toLowerCase() as TSvgImageNames}
          width='45'
          height='45'
          className={styles.tickerLink__icon}
        />
        <div className={styles.tickerLink__info}>
          <Text tag={'p'} weight='medium' size='s'>
            {name}
          </Text>
          <AnimatedTicker currentValue={changedValueInPercent}>
            <Text
              tag={'p'}
              weight='regular'
              size='s'
              className={classnames(
                styles.tickerLink__change,
                changedValue > 0
                  ? styles.positive
                  : changedValue < 0
                  ? styles.negative
                  : styles.zero,
                styles[change],
              )}
            >
              {formatNumber(changedValueInPercent) + ' %'}
            </Text>
          </AnimatedTicker>
        </div>
      </Link>
      {action && (
        <Icon
          icon={action}
          width='35'
          height='35'
          className={styles.tickerLink__action}
          onClick={actionClick}
        />
      )}
    </div>
  );
});
