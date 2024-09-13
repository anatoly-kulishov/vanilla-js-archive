import { useNavigate, useParams } from 'react-router-dom';
import { BackButton, PATH_PAGE, Text } from '@/shared';
import styles from './investmentLKnewsSingleNews.module.scss';
import { useEffect, useState } from 'react';
import { useLazyGetInvestmentSingleArticleQuery } from '@/shared/api/investmentApi';
import { IArticle } from '@/shared/api/investmentApi/types';

export interface ISingleNews {
  title: string;
  text: string;
  tagType: string;
  instant: number;
  image: string;
}

const InvestmentLKnewsSingleNews = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id: string }>();
  const [getInvestSingleNews, { data, isSuccess }] = useLazyGetInvestmentSingleArticleQuery();
  const [singleNewsData, setSingleNewsData] = useState<IArticle | null>(null);

  useEffect(() => {
    getInvestSingleNews(id).then((data) => {
      if ('error' in data) {
        navigate(PATH_PAGE.error, {
          state: { error: data.error, path: PATH_PAGE.news },
        });
      }
    });
  }, [data]);

  useEffect(() => {
    if (isSuccess && data) {
      setSingleNewsData(data);
    }
  }, [isSuccess, data]);

  const handleBackButtonClick = () => navigate(-1);
  let date;
  if (singleNewsData) {
    date = new Date(singleNewsData.instant);
  }

  return (
    <div className={styles['news-container']}>
      <BackButton
        text='Назад'
        theme='blue'
        name='arrow-left-blue'
        className={styles.backBtn}
        click={handleBackButtonClick}
      />
      <Text tag='h1' size='xl' weight='bold' className={styles['news-title']}>
        {singleNewsData?.title}
      </Text>
      <div className={styles['news-text-div']}>
        <img src={singleNewsData?.image} alt='' className={styles['news-img']} />
        <p className={styles['news-info']}>
          <Text tag='span' size='s'>
            {date && `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`}
          </Text>
          <Text tag='span' size='s'>
            {singleNewsData?.tagType}
          </Text>
        </p>
        <Text tag='p' size='s' weight='regular' className={styles['news-text']}>
          {singleNewsData?.text}
        </Text>
      </div>
    </div>
  );
};

export default InvestmentLKnewsSingleNews;
