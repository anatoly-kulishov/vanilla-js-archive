import {
  BackButton,
  Button,
  Link,
  Spinner,
  Text,
  AnimatedTicker,
  useGetTickerQuery,
  useGetInvestmentAssetQuery,
  useGetHalfYearProfitQuery,
} from '@/shared';
import { Shedule } from '@/widgets/investment/schedule';
import { useNavigate, useParams } from 'react-router-dom';
import { BACKBTN_TEXT, BUYBTN_TEXT, COLUMNS, PARAMS } from './constants';
import { getParams } from './lib/getParams';
import { useEffect, useMemo } from 'react';
import styles from './InvestmentLKcatalogAsset.module.scss';
import { formatNumber } from '@/shared/lib/formatNumber';

const InvestmentLKcatalogAsset = () => {
  const navigate = useNavigate();
  const { ticker } = useParams<{ ticker: string }>();
  const params = useMemo(() => getParams(), [ticker]);
  const { data: asset, isLoading: isAssetLoading } = useGetInvestmentAssetQuery(ticker);
  const {
    data: price,
    refetch: refetchTickers,
    isLoading: isPriceLoading,
  } = useGetTickerQuery({ ...PARAMS, securities: ticker! });
  const { data: halfYearProfit, isLoading: ishalfYearProfitLoading } = useGetHalfYearProfitQuery({
    params,
    ticker,
  });

  useEffect(() => {
    const s = setInterval(() => {
      refetchTickers();
    }, 2000);

    return () => clearInterval(s);
  }, []);

  if (isAssetLoading || isPriceLoading || ishalfYearProfitLoading || !asset) return <Spinner />;

  return (
    <>
      <BackButton
        click={() => {
          navigate(-1);
        }}
        text={BACKBTN_TEXT}
        theme={'blue'}
        className={styles.backbutton}
        width='24'
        height='24'
        name='arrow-left-blue'
      />
      <div className={styles.container}>
        <div>
          <div className={styles.head_columns + ` ${styles.head_columns_line}`}>
            <div className={styles.companyName + ` ${styles.head_item}`}>
              <img src={asset.logo} alt={'logo'} />
              <Text tag={'h2'} weight={'bold'} size={'xl'}>
                {asset.name}
              </Text>
            </div>
            <div className={styles.tickerName + ` ${styles.head_item}`}>
              <Text tag={'span'} size={'s'} className={styles.field}>
                {COLUMNS.ticker}
              </Text>
              <Text tag={'h2'} weight={'bold'} size={'xl'}>
                {asset.ticker}
              </Text>
            </div>
            <div className={styles.profitability + ` ${styles.head_item}`}>
              <Text tag={'span'} size={'s'} className={styles.field}>
                {COLUMNS.profitability}
              </Text>
              <Text
                tag={'h2'}
                weight={'bold'}
                size={'xl'}
                className={
                  halfYearProfit! > 0
                    ? styles.positive
                    : COLUMNS.value < 0
                    ? styles.negative
                    : styles.zero
                }
              >
                {formatNumber(Number(halfYearProfit))} %
              </Text>
            </div>
          </div>
          <div className={styles.head_columns}>
            <div className={` ${styles.head_item}`}>
              <Link to={asset.url}>{COLUMNS.site}</Link>
            </div>
            <Text tag={'span'} size={'s'} className={styles.field + ` ${styles.head_item}`}>
              {asset.type}
            </Text>
          </div>
          <Shedule activeTicker={ticker!} size='big' />
          <div>
            <Text tag={'h2'} weight={'bold'} size={'xl'} className={styles.aboutCompany}>
              {COLUMNS.title}
            </Text>
            <Text tag={'span'} size={'s'}>
              {asset.info}
            </Text>
          </div>
        </div>
        <div className={styles.price}>
          <Text tag={'span'} size={'s'} className={styles.field}>
            {COLUMNS.price}
          </Text>
          <AnimatedTicker currentValue={price!} style={styles.ticker}>
            <Text tag={'h2'} weight={'bold'} size={'xl'} className={styles.currentPrice}>
              {formatNumber(Number(price), false)} ₽
            </Text>
          </AnimatedTicker>
          <Button>{BUYBTN_TEXT}</Button>
        </div>
      </div>
    </>
  );
};

export default InvestmentLKcatalogAsset;
