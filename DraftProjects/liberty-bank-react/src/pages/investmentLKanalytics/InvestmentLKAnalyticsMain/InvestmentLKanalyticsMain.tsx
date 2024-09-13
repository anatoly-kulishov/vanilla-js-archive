import { PATH_PAGE, Text, useGetTickersQuery } from '@/shared';
import { PARAMS, TICKERS } from './constants';
import styles from './InvestmentLKanalyticsMain.module.scss';
import AnalyticsList from './analyticsList/AnalyticsList';
import { Shedule } from '@/widgets/investment/schedule';
import { TickerList } from '@/widgets/investment/tickerList';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TickerLine } from '@/widgets/investment/tickerLine';
import { useLazyGetInvestmentArticlesFeedQuery } from '@/shared/api/investmentApi';
import { IArticle } from '@/shared/api/investmentApi/types';

const InvestmentLKanalyticsMain = () => {
  const { data = [], refetch: refetchTickers } = useGetTickersQuery(PARAMS);
  const [getInvestUserInfo, { data: analyticData, isSuccess }] =
    useLazyGetInvestmentArticlesFeedQuery();
  const navigate = useNavigate();
  const [activeTicker, setActiveTicker] = useState(TICKERS[0]);
  const [localAnalyticData, setLocalAnalyticData] = useState<IArticle[]>([]);

  useEffect(() => {
    const s = setInterval(() => {
      refetchTickers();
    }, 2000);

    return () => clearInterval(s);
  }, []);

  useEffect(() => {
    getInvestUserInfo({ articleType: 'ANALYTICS' }).then((data) => {
      if ('error' in data) {
        navigate(PATH_PAGE.error, {
          state: { error: data.error, path: PATH_PAGE.news },
        });
      }
    });
  }, [analyticData]);

  useEffect(() => {
    if (isSuccess && analyticData) {
      setLocalAnalyticData(analyticData);
    }
  }, [isSuccess, analyticData]);

  return (
    <>
      <TickerLine tickers={data} />
      <Text tag='h1' size='xl' weight='bold' className={styles['sub-title']}>
        Обзоры и аналитика
      </Text>
      <div className={styles['analytics-container']}>
        <div className={styles['analytics-reviews']}>
          <AnalyticsList analyticsList={localAnalyticData} />
        </div>
        <div className={styles['analytics-news']}>
          <Shedule activeTicker={activeTicker} />
          <TickerList
            tickers={data}
            changeActiveTicker={setActiveTicker}
            activeTicker={activeTicker}
          />
        </div>
      </div>
    </>
  );
};

export default InvestmentLKanalyticsMain;
