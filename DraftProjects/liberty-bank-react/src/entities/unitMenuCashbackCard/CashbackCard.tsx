import { FC } from 'react';
import classNames from 'classnames';
import { Text, Icon } from '@/shared';
import styles from './CashbackCard.module.scss';

interface ICashbackCard {
  title: string;
  text: string;
  img: string;
  bgStyle: string;
}

interface ICashbackCardProps {
  item: ICashbackCard;
  key: string;
}

const CashbackCard: FC<ICashbackCardProps> = ({ item }) => {
  return (
    <li key={item.title}>
      <div className={classNames(styles.container, styles[`background_${item.bgStyle}`])}>
        <div>
          <Text tag='h4' weight='medium' className={styles.title}>
            {item.title}
          </Text>
          <Text tag='p' size='xs' weight='regular'>
            {item.text}
          </Text>
        </div>
        <Icon icon={'cashback'} widthAndHeight={'36px'} />
        <img src={item.img} className={styles.bgImg} />
      </div>
    </li>
  );
};

export default CashbackCard;
