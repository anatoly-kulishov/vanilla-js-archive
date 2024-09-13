import classNames from 'classnames';
import { memo } from 'react';
import { Text, CURRENCY, Image, Icon, TSvgIconNames, CurrencyCode, PaymentSystem } from '../..';
import styles from './CardImage.module.scss';
import { createCardTypeName } from './lib';

export type TCardImageProps = {
  typeName: string;
  paymentSystem?: PaymentSystem;
  currency?: CurrencyCode;
};

export const CardImage = memo(function CardImage({
  typeName,
  paymentSystem,
  currency,
}: TCardImageProps) {
  const cardTypeName = createCardTypeName(typeName);

  return (
    <div className={styles['image-constructor']}>
      <Image
        image={cardTypeName}
        width='340px'
        height='203px'
        className={styles['image-constructor__image']}
      />
      <div className={styles['image-constructor__info-wrapper']}>
        {currency && (
          <Text
            tag='span'
            size='s'
            weight='semibold'
            className={styles['image-constructor__currency-text']}
            data-testid='card-currency'
          >
            {CURRENCY[currency].text}
          </Text>
        )}
        {paymentSystem && (
          <Icon
            icon={`ps-${paymentSystem.toLowerCase()}` as TSvgIconNames}
            className={classNames(styles['image-constructor__payment-system'], [
              styles[`image-constructor__payment-system_ps-${paymentSystem.toLowerCase()}`],
            ])}
          />
        )}
      </div>
    </div>
  );
});
