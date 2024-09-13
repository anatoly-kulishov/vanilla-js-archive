import { FC } from 'react';
import styles from './CustomerServiceCard.module.scss';
import { Icon, Text } from '../..';
import classNames from 'classnames';

interface ICardData {
  title: string;
  text: string;
  img: string;
  bgStyle: string;
}

interface ICustomerServiceCard {
  cardData: ICardData;
}

export const CustomerServiceCard: FC<ICustomerServiceCard> = (props) => {
  const { cardData } = props;
  return (
    <div className={classNames(styles.container, styles[`background_${cardData.bgStyle}`])}>
      <div>
        <Text tag='h4' weight='medium' className={styles.title}>
          {cardData.title}
        </Text>
        <Text tag='p' size='xs' weight='regular'>
          {cardData.text}
        </Text>
      </div>
      <Icon icon={'cashback'} widthAndHeight={'36'} />
      <img src={cardData.img} className={styles.bgImg} />
    </div>
  );
};
