import { generatePath, useNavigate } from 'react-router-dom';
import {
  Text,
  PaymentSystem,
  CurrencyCode,
  Button,
  CardImage,
  PATH_PAGE,
  Icon,
  TSvgIconNames,
} from '@/shared';
import { TEXT } from './constants';
import utils from './lib';
import styles from './CardProduct.module.scss';

export interface ICardProduct {
  id?: string;
  typeName: string;
  paymentSystem: PaymentSystem[];
  currency: CurrencyCode[];
  name?: string;
  costPerMonth?: number[];
  validityTerm?: number;
  maxSum?: number[];
  interestRate?: number;
  inList?: boolean;
}

export const CardProduct = ({
  id,
  typeName,
  paymentSystem,
  currency,
  name,
  costPerMonth,
  validityTerm,
  maxSum,
  interestRate,
  inList,
}: ICardProduct) => {
  const navigate = useNavigate();
  const urlToDebitCardProduct = encodeURIComponent(typeName);
  const isCardCredit = !!maxSum && !!interestRate;

  const handleMoreInfoClick = (isCardCredit: boolean) => {
    navigate(
      isCardCredit && id
        ? generatePath(PATH_PAGE.creditCardProduct, { id })
        : generatePath(PATH_PAGE.cardProduct, { productType: urlToDebitCardProduct }),
    );
  };

  const handleGetCardClick = (isCardCredit: boolean) => {
    navigate(
      isCardCredit
        ? generatePath(PATH_PAGE.creditCardFormCardsSection, { id })
        : `${PATH_PAGE.orderCard}?productType=${urlToDebitCardProduct}`,
    );
  };

  return (
    <div className={styles['card']}>
      <div className={styles['image']}>
        <CardImage typeName={typeName} />
      </div>
      <div className={styles['info']}>
        <div className={styles['info__header']}>
          <Text tag='h2' size='xl' weight='bold' data-testid='card-product-title'>
            {isCardCredit ? name : typeName}
          </Text>
          <div className={styles['info__ps-wrapper']} data-testid='payment-system-logo'>
            {paymentSystem.length &&
              paymentSystem.map((item) => (
                <Icon
                  icon={`ps-${item.toLowerCase()}-react` as TSvgIconNames}
                  key={item}
                  width='69px'
                  height='30px'
                />
              ))}
          </div>
        </div>
        <Text tag='p' size='s' weight='regular' className={styles['info__card-number']}>
          {isCardCredit && name
            ? utils.getCardDescription(name, isCardCredit)
            : utils.getCardDescription(typeName)}
        </Text>
        <div className={styles['info__body']}>
          <div className={styles['info__item-wrapper']} data-testid='card-validity-term'>
            <Text tag='span' size='m' weight='medium'>
              {isCardCredit
                ? utils.createInterestRateValue(interestRate)
                : validityTerm && utils.createValidityTermValue(validityTerm)}
            </Text>
            <Text tag='span' size='xs' weight='regular' className={styles['info__item-text']}>
              {isCardCredit ? TEXT.content.interestRate : TEXT.content.validityTerm}
            </Text>
          </div>
          <div className={styles['info__item-wrapper']} data-testid='card-cost-per-month'>
            <Text tag='span' size='m' weight='medium'>
              {isCardCredit
                ? utils.createMaxSumValue(currency, maxSum)
                : costPerMonth && utils.createCostPerMonthValue(costPerMonth, currency)}
            </Text>
            <Text tag='span' size='xs' weight='regular' className={styles['info__item-text']}>
              {isCardCredit ? TEXT.content.maxSum : TEXT.content.costPerMonth}
            </Text>
          </div>
          <div className={styles['info__item-wrapper']} data-testid='card-currency'>
            <Text tag='span' size='m' weight='medium'>
              {utils.createCurrencyValue(currency)}
            </Text>
            <Text tag='span' size='xs' weight='regular' className={styles['info__item-text']}>
              {TEXT.content.currency}
            </Text>
          </div>
        </div>
        <div className={styles['info__footer']}>
          <Button
            onClick={() => handleGetCardClick(isCardCredit)}
            theme='primary'
            className={styles['info__got-card-btn']}
            data-testid='got-card-btn'
          >
            {TEXT.button.gotCard}
          </Button>
          {inList && (
            <Button
              onClick={() => handleMoreInfoClick(isCardCredit)}
              theme='secondary'
              className={styles['info__info-btn']}
              data-testid='more-info-btn'
            >
              {TEXT.button.moreInfo}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
