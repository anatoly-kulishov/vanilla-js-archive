import { PATH } from '../constants';
import { Link, Text } from '@/shared';
import { FC } from 'react';
import styles from './InfiniteScroll.module.scss';
import { IArticle } from '@/shared/api/investmentApi/types';

export interface IInfiniteScrollProps {
  filteredNews: IArticle[];
}

const InfiniteScroll: FC<IInfiniteScrollProps> = ({ filteredNews }) => {
  return (
    <div>
      {filteredNews.map((item) => {
        const date = new Date(item.instant);
        return (
          <div className={styles.news} key={item.id}>
            <img className={styles.img} src={item.image} alt='text' />
            <div>
              <Text tag={'h3'} weight={'bold'} className={styles.title}>
                {item.title}
              </Text>
              <div>
                <Text tag='p' weight='regular' size='s' className={styles.text}>
                  {item.description}
                </Text>
                <Link to={`${PATH.singleNews}${item.id}`} className={styles.link}>
                  <Text tag='p' weight='regular' size='s'>
                    Продолжить
                  </Text>
                </Link>
              </div>
              <div className={styles.wrapper}>
                <Text
                  tag='span'
                  size='s'
                >{`${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`}</Text>
                <Text tag={'p'}>{item.tagType.join(', ')}</Text>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InfiniteScroll;
