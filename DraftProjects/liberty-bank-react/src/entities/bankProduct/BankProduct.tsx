import { FC, useEffect } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import {
  Button,
  Text,
  Icon,
  TSvgIconNames,
  CurrencyCode,
  Skeleton,
  SkeletonContainer,
  useLazyGetInfoCreditFormQuery,
  Tooltip,
  formatInterestRate,
} from '@/shared';
import { APPLICATION_PATH, CURRENCIES, INFO_PATH, TEXT } from './constants';
import { createSumValue } from './createSumValue';
import { GetInfoCreditForm } from './types';
import styles from './BankProduct.module.scss';

export interface IBankProduct {
  id: string | number;
  name: string;
  currencyCodes: CurrencyCode[];
  interestRate: number;
  amountMin: number;
  amountMax: number;
  minDurationMonths: number;
  maxDurationMonths: number;
  productDetails: string;
  serviceType: 'credit' | 'deposit';
  purpose?: string;
}

export const BankProduct: FC<IBankProduct> = ({
  id,
  name,
  currencyCodes,
  interestRate,
  amountMin,
  maxDurationMonths,
  productDetails,
  serviceType,
}) => {
  const navigate = useNavigate();
  const applicationPath = generatePath(APPLICATION_PATH[serviceType], { id });
  const infoPath = generatePath(INFO_PATH[serviceType], { id });

  const [getInfoForCredit, { isLoading, error }] =
    useLazyGetInfoCreditFormQuery<GetInfoCreditForm>();

  useEffect(() => {
    if (isCredit) {
      getInfoForCredit(String(id));
    }
  }, []);

  const handleButtonClick = () => {
    navigate(applicationPath);
  };

  const handleButtonViewMore = () => {
    navigate(infoPath);
  };

  const isCredit = serviceType === 'credit';
  const isButtonDisabled = error?.status === 429;

  return (
    <li className={styles.container}>
      <div className={styles.title}>
        <div className={styles.info}>
          <Text tag='h3' weight='bold' className={styles.info__name}>
            {name}
          </Text>
          <Text
            tag='p'
            size='xs'
            weight='regular'
            className={styles.term}
            data-testid='productDetails'
          >
            {productDetails}
          </Text>
        </div>
        <div>
          {currencyCodes.map((currency) => (
            <Icon
              key={currency}
              icon={CURRENCIES[currency] as TSvgIconNames}
              widthAndHeight='64px'
              className={styles.icon}
            />
          ))}
        </div>
      </div>
      <div className={styles.description}>
        <div className={styles.interestRate}>
          <div className={styles.ratesValue}>
            <Text tag='span' size='s' weight='medium' className={styles.ratesValue__text}>
              {TEXT.before}
            </Text>
            <Text
              tag='h3'
              weight='bold'
              className={styles.ratesValue__number}
              data-testid='interestRate'
            >
              {formatInterestRate(interestRate)}
              {TEXT.percentSign}
            </Text>
          </div>
          <Text tag='p' size='xs' weight='regular' className={styles.interestRate__text}>
            {TEXT.interestRate}
          </Text>
        </div>
        <div className={styles.amount}>
          <div className={styles.amountMin}>
            <Text tag='span' size='s' weight='medium' className={styles.amountMin__text}>
              {TEXT.from}
            </Text>
            <Text
              tag='h3'
              weight='bold'
              className={styles.amountMin__number}
              data-testid='amountMin'
            >
              {createSumValue(amountMin, currencyCodes)}
            </Text>
          </div>
          <Text tag='p' size='xs' weight='regular' className={styles.productAmount__text}>
            {isCredit ? TEXT.amountMinCredit : TEXT.amountMinDeposit}
          </Text>
        </div>
        <div className={styles.maxDurationMonths}>
          <div className={styles.numberOfMonths}>
            <Text tag='span' size='s' weight='medium' className={styles.numberOfMonths__text}>
              {TEXT.before}
            </Text>
            <Text
              tag='h3'
              weight='bold'
              className={styles.numberOfMonths__number}
              data-testid='maxDurationMonth'
            >
              {maxDurationMonths} {TEXT.months}
            </Text>
          </div>
          <Text tag='p' size='xs' weight='regular' className={styles.maxDurationMonths__text}>
            {isCredit ? TEXT.maxDurationMonthsCredit : TEXT.maxDurationMonthsDeposit}
          </Text>
        </div>
      </div>
      <div className={styles.navigationBlock}>
        <Button
          type='button'
          theme='secondary'
          className={styles.navigationBlock__button}
          onClick={handleButtonViewMore}
        >
          {TEXT.viewMore}
        </Button>
        {isLoading ? (
          <SkeletonContainer width='255px' height='56px' testId='skeleton'>
            <Skeleton theme='regular' className={styles.skeleton} testId='skeleton' />
          </SkeletonContainer>
        ) : isButtonDisabled ? (
          <Tooltip
            normalTextWrapping
            positionX='left'
            positionY='bottom'
            hideDelay={250}
            elementTooltip={
              <Button
                type='button'
                width='max'
                className={styles.navigationBlock__button}
                onClick={handleButtonClick}
                disabled={isButtonDisabled}
              >
                {TEXT.checkoutButton}
              </Button>
            }
          >
            <Text tag='span' size='s'>
              {TEXT.tooltipText}
            </Text>
          </Tooltip>
        ) : (
          <Button
            type='button'
            width='max'
            className={styles.navigationBlock__button}
            onClick={handleButtonClick}
            disabled={isButtonDisabled}
          >
            {TEXT.checkoutButton}
          </Button>
        )}
      </div>
    </li>
  );
};
