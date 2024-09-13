import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { CURRENCIES } from '@/entities';
import {
  CURRENCY,
  Chips,
  CurrencyCode,
  ICreditProductDetails,
  Icon,
  TSvgIconNames,
  Text,
  formatInterestRate,
} from '@/shared';
import { TEXT } from './constants';
import { formatOrDefault } from './utils';
import styles from './CalculatorResultCard.module.scss';

export interface ICreditCalculateResult {
  income?: number;
  maxPossibleSum?: number;
  monthlyTotalCreditPayment: number;
  totalPercentCreditPayment: number;
}

interface ICreditCalculateResultCard {
  result: ICreditCalculateResult;
  creditProductDetails: ICreditProductDetails;
}

export const CreditCalculateResultCard: FC<ICreditCalculateResultCard> = ({
  result,
  creditProductDetails,
}) => {
  const { income, maxPossibleSum, monthlyTotalCreditPayment, totalPercentCreditPayment } = result;
  const { register, getValues, setValue } = useFormContext();

  const { name, interestRate, currencyCodeList } = creditProductDetails;
  const currencyCode: CurrencyCode = getValues('currencyCode');

  useEffect(() => {
    if (creditProductDetails) {
      setValue('currencyCode', currencyCode ?? creditProductDetails.currencyCodeList[0]);
    }
  }, [creditProductDetails, setValue]);

  return (
    creditProductDetails && (
      <>
        <div className={styles.segmentResultOne}>
          <div className={styles.currencyBlock}>
            {currencyCode && (
              <Icon icon={CURRENCIES[currencyCode] as TSvgIconNames} widthAndHeight='64px' />
            )}
            <Text
              tag='h3'
              weight='medium'
              className={styles.currencyBlock__text}
              data-testid='currencyBlockText'
            >
              {name}
            </Text>
          </div>
          <div className={styles.resultBlock}>
            {maxPossibleSum && (
              <>
                <div className={styles.resultBlock__infoBlock}>
                  <Text tag='h2' weight='bold' size='xl' className={styles.resultBlock__text}>
                    {formatOrDefault(maxPossibleSum)} {currencyCode}
                  </Text>
                  <Text tag='h5'>{TEXT.maxSumCredit}</Text>
                </div>
                <div className={styles.resultBlock__infoBlock}>
                  <Text tag='h2' weight='bold' size='xl' className={styles.resultBlock__text}>
                    {formatOrDefault(totalPercentCreditPayment)} {currencyCode}
                  </Text>
                  <Text tag='h5'>{TEXT.interestForPeriod}</Text>
                </div>
              </>
            )}

            {typeof income === 'number' && (
              <>
                <div className={styles.resultBlock__infoBlock}>
                  <Text tag='h2' weight='bold' size='xl' className={styles.resultBlock__text}>
                    {formatOrDefault(income)} {currencyCode}
                  </Text>
                  <Text tag='h5'>{TEXT.minRequiredAmount}</Text>
                </div>
                <div className={styles.resultBlock__infoBlock}>
                  <Text tag='h2' weight='bold' size='xl' className={styles.resultBlock__text}>
                    {formatOrDefault(monthlyTotalCreditPayment)} {currencyCode}
                  </Text>
                  <Text tag='h5'>{TEXT.monthlyPaymentAmount}</Text>
                </div>
              </>
            )}
            <div className={styles.resultBlock__infoBlock__interestRate}>
              <Text tag='h2' weight='bold' size='xl' className={styles.resultBlock__text}>
                {formatInterestRate(interestRate)}%
              </Text>
              <Text tag='h5'>{TEXT.interestRate}</Text>
            </div>
          </div>
        </div>

        <div>
          {maxPossibleSum ? (
            <div>
              <Text tag='h5'>{TEXT.monthlyPaymentAmount}</Text>
              <Text tag='h3' weight='medium' className={styles.resultBlock__text}>
                {formatOrDefault(monthlyTotalCreditPayment)}{' '}
                {currencyCode && CURRENCY[currencyCode].text}
              </Text>
            </div>
          ) : (
            <div>
              <Text tag='h5'>{TEXT.interestForPeriod}</Text>
              <Text tag='h3' weight='medium' className={styles.resultBlock__text}>
                {formatOrDefault(totalPercentCreditPayment)}{' '}
                {currencyCode && CURRENCY[currencyCode].text}
              </Text>
            </div>
          )}
          {currencyCodeList.length > 1 && (
            <Chips
              values={currencyCodeList}
              type='radio'
              {...register('currencyCode')}
              viewType='dots'
            />
          )}
        </div>
      </>
    )
  );
};
