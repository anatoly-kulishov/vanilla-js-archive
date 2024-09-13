import { FC, useMemo } from 'react';
import { generatePath } from 'react-router-dom';
import classNames from 'classnames';
import {
  ACCOUNT_STATUS_TYPE,
  Text,
  StatusLabel,
  CardImage,
  Button,
  ICard,
  ICreditCard,
  PATH_PAGE,
} from '@/shared';
import { CARD_BLOCK_TEXT, CARD_STATUS_TEXT } from './constants';
import { getCardFields } from './utils';
import styles from './CardBlock.module.scss';

export const CardBlock: FC<ICard | ICreditCard> = (props) => {
  const { id, lastFourNumbers, paymentSystem, currency } = props;

  const { cardName, typeName, closedAt, expiredAt, cardStatus, favourite, balance, type } =
    getCardFields(props);

  const accountStatus = useMemo(
    () => ACCOUNT_STATUS_TYPE[cardStatus.toLocaleLowerCase() as keyof typeof ACCOUNT_STATUS_TYPE],
    [cardStatus],
  );

  const expirationDate = useMemo(() => {
    if (closedAt) {
      return closedAt;
    }
    if (expiredAt && !closedAt) {
      return expiredAt;
    }

    return CARD_BLOCK_TEXT.noData;
  }, [closedAt, expiredAt]);

  const cardInfoPath =
    type === 'credit'
      ? generatePath(PATH_PAGE.myCreditCardInfo, { id })
      : generatePath(PATH_PAGE.myCardInfo, { id });

  return (
    <li className={styles['card']}>
      <div className={styles['image']}>
        <CardImage typeName={typeName} paymentSystem={paymentSystem} currency={currency} />
      </div>
      <div className={styles['info']}>
        <div className={styles['info__header']}>
          <Text tag='h2' size='xl' weight='bold'>
            {cardName}
          </Text>
          <div className={styles['info__statuses-wrapper']}>
            {favourite && <StatusLabel type='info' text={CARD_STATUS_TEXT.MAIN} size='m' />}
            <StatusLabel type={accountStatus} text={CARD_STATUS_TEXT[cardStatus]} size='m' />
          </div>
        </div>
        <Text tag='p' size='s' weight='regular' className={styles['info__card-number']}>
          {CARD_BLOCK_TEXT.maskNumbers}
          {lastFourNumbers}
        </Text>
        <div className={styles['info__body']}>
          <div
            className={classNames(
              styles['info__item-wrapper'],
              styles['info__item-wrapper_type_date'],
            )}
          >
            <Text tag='span' size='m' weight='medium'>
              {expirationDate}
            </Text>
            <Text tag='span' size='xs' weight='regular' className={styles['info__item-text']}>
              {CARD_BLOCK_TEXT.closeDate}
            </Text>
          </div>
          <div
            className={classNames(
              styles['info__item-wrapper'],
              styles['info__item-wrapper_type_balance'],
            )}
          >
            <Text tag='span' size='m' weight='medium'>
              {balance !== null && !isNaN(balance)
                ? balance.toLocaleString('ru-RU', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: currency,
                  })
                : CARD_BLOCK_TEXT.noData}
            </Text>
            <Text tag='span' size='xs' weight='regular' className={styles['info__item-text']}>
              {CARD_BLOCK_TEXT.balance}
            </Text>
          </div>
          <div
            className={classNames(
              styles['info__item-wrapper'],
              styles['info__item-wrapper_type_currency'],
            )}
          >
            <Text tag='span' size='m' weight='medium'>
              {currency}
            </Text>
            <Text tag='span' size='xs' weight='regular' className={styles['info__item-text']}>
              {CARD_BLOCK_TEXT.currencyBill}
            </Text>
          </div>
        </div>
        <Button href={cardInfoPath} className={styles['info__detail-btn']}>
          {CARD_BLOCK_TEXT.infoButton}
        </Button>
      </div>
    </li>
  );
};
