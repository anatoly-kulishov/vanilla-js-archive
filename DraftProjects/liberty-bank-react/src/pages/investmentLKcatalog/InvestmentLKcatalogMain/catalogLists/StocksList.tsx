import {
  Button,
  CatalogFilters,
  IAssetsFavorites,
  Icon,
  Image,
  PATH_PAGE,
  Preloader,
  TPngImageNames,
  Text,
  deleteFromFavoritesTickersToLS,
  getBrokerAccStatus,
  getFavoritesByCategory,
  setFavoritesTickersToLS,
  useGetStocksQuery,
} from '@/shared';
import { formatNumber } from '@/shared/lib/formatNumber';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NAME_STOCKS, TABLE_HEADERS_TEXT, TICKERS_IN_BRIEFCASE, TICKER_URL } from '../../constants';
import { SortButton } from '../SortButton/SortButton';
import { saveLastToLocal } from '../utils/saveLastToLocal';
import styles from './CatalogLists.module.scss';

interface IProps {
  catalogFilter: CatalogFilters;
}

export const StocksList: FC<IProps> = ({ catalogFilter }) => {
  const [data, setData] = useState<string[][]>([]);
  const { data: stocks, isLoading } = useGetStocksQuery();
  const status = useSelector(getBrokerAccStatus);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(getFavoritesByCategory('stocks'));

  useEffect(() => {
    if (stocks) {
      switch (catalogFilter) {
        case CatalogFilters.withAllAssets: {
          setData(stocks);
          break;
        }
        case CatalogFilters.withSelectedAssets: {
          setData(stocks.filter((el) => favorites.includes(el[0])));
          break;
        }
        case CatalogFilters.withBriefcase: {
          setData(stocks.filter((el) => TICKERS_IN_BRIEFCASE.stocks.includes(el[0]))); // TODO Как сделают покупку акций добавить фильтрацию по портфелю
          break;
        }
        default:
          break;
      }
    }
  }, [stocks, catalogFilter]);
  const handleFavorites = (ticker: string) => {
    setFavoritesTickersToLS(ticker, 'stocks' as keyof IAssetsFavorites);
  };
  const handleDeleteFavorites = (ticker: string) => {
    deleteFromFavoritesTickersToLS(ticker, 'stocks' as keyof IAssetsFavorites);
  };
  const handleLink = (ticker: string) => {
    saveLastToLocal(ticker);
    status
      ? navigate(`${TICKER_URL}${ticker}`)
      : navigate(PATH_PAGE.investmentLK.startNonRegistered);
  };
  const handleLinkToNotify = (ticker: string) => {
    saveLastToLocal(ticker);
    navigate(`${TICKER_URL}${ticker}/priceNotification`);
  };

  return (
    <div className={styles['catalog-container-div']}>
      <ul className={styles['stock-list']}>
        <li className={styles['stock-list-header']}>
          <Text tag='p' size='l' weight='bold' className={styles['stock-list-header-text']}>
            {TABLE_HEADERS_TEXT.stocks[0]}
          </Text>
          <SortButton setFunc={setData} array={data} sortParam={2}>
            {TABLE_HEADERS_TEXT.stocks[1]}
          </SortButton>
          <SortButton setFunc={setData} array={data} sortParam={4}>
            {TABLE_HEADERS_TEXT.stocks[2]}
          </SortButton>
        </li>
        {isLoading && <Preloader minimized={true} />}
        {catalogFilter === CatalogFilters.withSelectedAssets && !favorites.length ? (
          <Text tag='h3'>
            У вас нет избранных акций. Настройте их в вкладке дополнительные опции &gt; по выбранным
            активам
          </Text>
        ) : (
          data?.map((el, i) => {
            const isPlus = el[1] && Number(el[1]) >= 0;
            const name = NAME_STOCKS.get(el[0]);
            const currentPrice = el[2] ? el[2] : el[3];
            const isFavorite = favorites.includes(el[0]);
            const isInBriefcase = TICKERS_IN_BRIEFCASE.stocks.includes(el[0]);
            return (
              <li key={i} className={styles['stock-item']}>
                {isInBriefcase && (
                  <Icon
                    icon={'briefcase'}
                    widthAndHeight='20px'
                    className={styles['icon-briefcase']}
                  />
                )}
                <div className={styles['stock-item-name-block']}>
                  <Image
                    className={styles['svg-icon']}
                    image={el[0] as TPngImageNames}
                    height='30px'
                    width='30px'
                  />
                  <Text tag='p' size='m'>{`${name} (${el[0]})`}</Text>
                </div>
                <Text tag='p' size='m'>
                  {formatNumber(Number(currentPrice), false)} ₽
                </Text>
                <Text tag='p' size='m' className={isPlus ? styles['green'] : styles['red']}>
                  {`${formatNumber(Number(el[4])) || 0}₽ (${formatNumber(Number(el[1]))}%)`}
                </Text>
                <div className={styles['btn-favorites-block']}>
                  <Button
                    onClick={() => {
                      !isFavorite ? handleFavorites(el[0]) : handleDeleteFavorites(el[0]);
                      setFavorites(getFavoritesByCategory('stocks'));
                    }}
                    theme='icon'
                  >
                    <Icon
                      icon={'star-empty'}
                      widthAndHeight='30px'
                      className={isFavorite ? styles['icon-active'] : styles['icon']}
                    />
                  </Button>
                  <Button onClick={() => handleLinkToNotify(el[0])} theme='icon'>
                    <Icon icon={'bell'} widthAndHeight='30px' className={styles['icon-bell']} />
                  </Button>
                </div>
                <div className={styles['buy-btn-div']}>
                  <Button
                    size='s'
                    className={styles['buy-btn']}
                    onClick={() => {
                      handleLink(el[0]);
                    }}
                  >
                    Купить
                  </Button>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};
