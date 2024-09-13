import styles from './SelectedPaymentCard.module.scss';
import { Icon, TSvgIconNames, Text } from '../../shared';
import { FC } from 'react';
import classNames from 'classnames';

interface ICard {
  paymentName: string;
  description?: string;
  icon?: string;
  width?: 'selected' | 'ordinary';
  onClick?: () => void;
  active?: boolean;
}

export const SelectedPaymentCard: FC<ICard> = ({
  icon = 'radio-button-off',
  paymentName,
  width = 'ordinary',
  description,
  onClick = () => {},
  active = false,
}) => {
  return (
    <div
      className={classNames(styles['card'], styles[`card_${width}`], {
        [styles['card_active']]: active,
      })}
      onClick={onClick}
    >
      <Icon icon={icon as TSvgIconNames} widthAndHeight='44px' />
      <div>
        <Text tag='h4' weight='medium'>
          {paymentName}
        </Text>
        <Text tag='span' weight='medium' size='s' className={styles['card_description']}>
          {description}
        </Text>
      </div>
    </div>
  );
};
