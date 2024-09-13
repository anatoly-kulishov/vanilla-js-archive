import { FC } from 'react';
import styles from './MyProductsCard.module.scss';
import { Icon, Text } from '@/shared';
import { Link } from 'react-router-dom';

interface IMyProductsCard {
  type: string;
  sum: string;
  bonus: string;
  svgCur: JSX.Element;
  svgCard: JSX.Element;
  date: string;
}

interface IMyProductsCardProps {
  item: IMyProductsCard;
  key: number;
  href: string;
}

const MyProductsCard: FC<IMyProductsCardProps> = ({ item, key, href }) => {
  return (
    <Link to={href}>
      <li key={key} className={styles['card']}>
        <div className={styles['top']}>
          {item.svgCur}
          <div className={styles['texts']}>
            <div className={styles['text']}>
              <Text tag='p' weight='medium' size='m'>
                {item.sum}
              </Text>
              <Text tag='span' weight='medium' size='xs' className={styles['type']}>
                {item.type}
              </Text>
            </div>
            <div className={styles['bonus']}>
              <Icon icon={'bonus'} widthAndHeight={'16px'} />
              <Text tag='p' weight='medium' size='s' className={styles['bonus-text']}>
                {item.bonus}
              </Text>
            </div>
          </div>
        </div>
        <div className={styles['bottom']}>
          {item.svgCard}
          <Text tag='span' size='xs' className={styles['date']}>
            {item.date}
          </Text>
        </div>
      </li>
    </Link>
  );
};

export default MyProductsCard;
