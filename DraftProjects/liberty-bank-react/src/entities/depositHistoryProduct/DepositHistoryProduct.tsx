import { FC } from 'react';
import {
  Text,
  IDepositHistoryProduct,
  formatNumberWithSpaces,
  CURRENCY,
  StatusLabel,
  formatInterestRate,
} from '@/shared';
import { formatDateWithLocale } from './utils';
import { TEXT } from './constants';
import styles from './DepositHistoryProduct.module.scss';

export const DepositHistoryProduct: FC<IDepositHistoryProduct> = (depositProduct) => {
  const {
    name,
    openDate,
    closeDate,
    withdrawalDate,
    initialAmount,
    moneyProfit,
    finalSum,
    isCapitalization,
    interestRate,
    currencyCode,
  } = depositProduct;

  return (
    <li className={styles.container}>
      <div className={styles.title}>
        <div className={styles.info}>
          <Text tag='h3' weight='medium' className={styles.info__name} data-testid='depositName'>
            {name}
          </Text>
          {isCapitalization && (
            <StatusLabel
              text={TEXT.isCapitalization}
              type='info'
              size='m'
              data-testid='capitalization'
            />
          )}
        </div>
      </div>
      <div className={styles.description}>
        <div className={styles.description__element}>
          <Text tag='span' weight='regular' className={styles.description__element_title}>
            {TEXT.initialAmount}
          </Text>
          <Text
            tag='span'
            size='m'
            weight='medium'
            className={styles.description__element_value}
            data-testid='initialAmount'
          >
            {formatNumberWithSpaces(initialAmount, 2)} {CURRENCY[currencyCode].text}
          </Text>
        </div>
        <div className={styles.description__element}>
          <Text tag='span' weight='regular' className={styles.description__element_title}>
            {TEXT.interestRate}
          </Text>
          <Text
            tag='span'
            size='m'
            weight='medium'
            className={styles.description__element_value}
            data-testid='interestRate'
          >
            {formatInterestRate(interestRate)} %
          </Text>
        </div>
        <div className={styles.description__element}>
          <Text tag='span' weight='regular' className={styles.description__element_title}>
            {TEXT.openDate}
          </Text>
          <Text
            tag='span'
            size='m'
            weight='medium'
            className={styles.description__element_value}
            data-testid='openDate'
          >
            {formatDateWithLocale(openDate)}
          </Text>
        </div>
        <div className={styles.description__element}>
          <Text tag='span' weight='regular' className={styles.description__element_title}>
            {TEXT.closeDate}
          </Text>
          <Text
            tag='span'
            size='m'
            weight='medium'
            className={styles.description__element_value}
            data-testid='closeDate'
          >
            {formatDateWithLocale(closeDate)}
          </Text>
        </div>
        <div className={styles.description__element}>
          <Text tag='span' weight='regular' className={styles.description__element_title}>
            {TEXT.withdrawalDate}
          </Text>
          <Text
            tag='span'
            size='m'
            weight='medium'
            className={styles.description__element_value}
            data-testid='withdrawDate'
          >
            {formatDateWithLocale(withdrawalDate)}
          </Text>
        </div>
        <div className={styles.description__element}>
          <Text tag='span' weight='regular' className={styles.description__element_title}>
            {TEXT.moneyProfit}
          </Text>
          <Text
            tag='span'
            size='m'
            weight='medium'
            className={styles.description__element_value}
            data-testid='profitAmount'
          >
            {formatNumberWithSpaces(moneyProfit, 2)} {CURRENCY[currencyCode].text}
          </Text>
        </div>
        <div className={styles.description__element}>
          <Text tag='span' weight='regular' className={styles.description__element_title}>
            {TEXT.finalSum}
          </Text>
          <Text
            tag='span'
            size='m'
            weight='medium'
            className={styles.description__element_value}
            data-testid='finishAmount'
          >
            {formatNumberWithSpaces(finalSum, 2)} {CURRENCY[currencyCode].text}
          </Text>
        </div>
      </div>
    </li>
  );
};
