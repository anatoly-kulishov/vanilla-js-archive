import { Link, Text } from '@/shared';
import { IShortArticle } from '@/shared/api/investmentApi/types';
import { formattedDate } from '../lib/formattedDate';
import { PATH } from '../../../constants';
import styles from './AnalyticsItem.module.scss';

const AnalyticsItem = ({ id, image, title, description, tagType, instant }: IShortArticle) => {
  return (
    <div className={styles['analytics-item']}>
      <img src={image} alt='My Image' className={styles['image']} />
      <div className={styles['info-block']}>
        <Text tag='h4' weight='medium' size='m' className={styles['analytics-item-title']}>
          {title}
        </Text>

        <div className={styles['analytics-item-text-block']}>
          <Text tag='p' weight='regular' size='s' className={styles['analytics-item-text']}>
            {description}
          </Text>
          <Link to={`${PATH.singleNews}${id}`} className={styles['analytics-item-text-continue']}>
            <Text tag='p' weight='regular' size='s'>
              Продолжить
            </Text>
          </Link>
        </div>
        <div className={styles['info-block-under']}>
          <Text tag='span' className={styles['analytics-item-date']}>
            {formattedDate(instant)}
          </Text>
          <Text tag='span' className={styles['analytics-item-tag']}>
            {tagType}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsItem;
