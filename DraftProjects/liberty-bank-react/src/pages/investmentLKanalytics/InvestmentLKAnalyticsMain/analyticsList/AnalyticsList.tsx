import { EArticleType, IArticle } from '@/shared/api/investmentApi/types';
import styles from './AnalyticsList.module.scss';
import AnalyticsItem from './analyticsItem/AnalyticsItem';
import { Fragment } from 'react';

interface IAnalyticsList {
  analyticsList: IArticle[];
}

const AnalyticsList = ({ analyticsList }: IAnalyticsList) => {
  return (
    <div className={styles['analytics-list']}>
      {analyticsList.map((item) => {
        const date = new Date(item.instant);
        return (
          <Fragment key={item.id}>
            <AnalyticsItem
              id={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
              tagType={item.tagType}
              instant={date}
              articleType={EArticleType['ANALYTICS']}
            />
          </Fragment>
        );
      })}
    </div>
  );
};

export default AnalyticsList;
