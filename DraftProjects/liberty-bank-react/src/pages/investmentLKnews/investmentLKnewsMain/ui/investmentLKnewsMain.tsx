import styles from './investmentLKnewsMain.module.scss';
import { PATH_PAGE, Tabs, Text } from '@/shared';
import { NEWS_TITLE, FILTER_TEXT, TabType, TAGFILTER } from '../constants';
import { useLazyGetInvestmentArticlesFeedQuery } from '@/shared/api/investmentApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IArticle } from '@/shared/api/investmentApi/types';
import InfiniteScroll from '@/widgets/InfiniteScroll/ui/InfiniteScroll';

const InvestmentLKAllNews = () => {
  const [getInvestNews, { data, isSuccess }] = useLazyGetInvestmentArticlesFeedQuery();
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState<IArticle[]>([]);
  const [tag, setTag] = useState('');

  useEffect(() => {
    getInvestNews({ articleType: 'NEWS', tag }).then((data) => {
      if ('error' in data) {
        navigate(PATH_PAGE.error, {
          state: { error: data.error, path: PATH_PAGE.news },
        });
      }
    });
  }, [data, tag]);

  useEffect(() => {
    if (isSuccess && data) {
      setNewsData(data);
    }
  }, [isSuccess, data]);

  const onFilterChange = (index: number) => {
    setTag(TAGFILTER[index]);
  };

  const tabs = (FILTER_TEXT as TabType[]).map((tab) => {
    return {
      label: tab,
      content: <InfiniteScroll key={tab} filteredNews={newsData} />,
    };
  });

  return (
    <div>
      <div>
        <Text tag='h1' size='xl' weight='bold'>
          {NEWS_TITLE}
        </Text>
        <hr className={styles.hr} />
        <Tabs
          theme={'black'}
          tabs={tabs}
          marginBottom='m'
          onClick={(index) => onFilterChange(index)}
        />
      </div>
    </div>
  );
};

export default InvestmentLKAllNews;
