import { FC, memo } from 'react';
import { Text, Image, TSvgImageNames } from '@/shared';
import styles from './AnalyticsNews.module.scss';
import { Link } from 'react-router-dom';

interface AnalyticsNewsProps {
  articles: {
    articlesNewsId: string;
    title: string;
    description?: string;
    tagType: string;
    createdAt: string;
    image: string | TSvgImageNames;
  }[];
}

export const AnalyticsNews: FC<AnalyticsNewsProps> = memo(function AnalyticsNews({ articles }) {
  return (
    <div className={styles.articles}>
      {articles.map((article, index) => {
        return (
          <article className={styles.article} key={article.articlesNewsId}>
            <Link to={`../news/${article.articlesNewsId}`} className={styles.article__link}>
              <Image image={article.image as TSvgImageNames} className={styles.article__img} />
            </Link>
            <Text
              tag={'h2'}
              weight='medium'
              size='m'
              className={styles[`article__title${index === 0 ? '__big' : ''}`]}
            >
              {article.title}
            </Text>
            {article.description && (
              <Text tag={'p'} size='s' className={styles.article__text}>
                {article?.description}
              </Text>
            )}
          </article>
        );
      })}
    </div>
  );
});
