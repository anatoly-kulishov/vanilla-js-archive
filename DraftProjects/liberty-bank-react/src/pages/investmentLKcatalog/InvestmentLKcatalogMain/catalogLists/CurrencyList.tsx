import { useNavigate } from 'react-router-dom';
import {
  Button,
  Preloader,
  Text,
  Image,
  TPngImageNames,
  useGetCurrencyQuery,
  CatalogFilters,
  getBrokerAccStatus,
  PATH_PAGE,
  Icon,
  getFavoritesByCategory,
  IAssetsFavorites,
  setFavoritesTickersToLS,
  deleteFromFavoritesTickersToLS,
} from '@/shared';
import { SortButton } from '../SortButton/SortButton';
import {
  NAME_CURRENCY,
  TABLE_HEADERS_TEXT,
  TICKERS_IN_BRIEFCASE,
  TICKER_URL,
} from '../../constants';
import styles from './CatalogLists.module.scss';
import { FC, useEffect, useState } from 'react';
import { saveLastToLocal } from '../utils/saveLastToLocal';
import { formatNumber } from '@/shared/lib/formatNumber';
import { useSelector } from 'react-redux';

interface IProps {
  catalogFilter: CatalogFilters;
}

export const CurrencyList: FC<IProps> = ({ catalogFilter }) => {
  const { data: currency, isLoading } = useGetCurrencyQuery();
  const navigate = useNavigate();
  const [data, setData] = useState<string[][]>([]);
  const [favorites, setFavorites] = useState(getFavoritesByCategory('currency'));
  const status = useSelector(getBrokerAccStatus);

  useEffect(() => {
    if (currency) {
      switch (catalogFilter) {
        case CatalogFilters.withAllAssets: {
          setData(currency);
          break;
        }
        case CatalogFilters.withSelectedAssets: {
          setData(currency.filter((el) => favorites.includes(el[0])));
          break;
        }
        case CatalogFilters.withBriefcase: {
          setData(currency.filter((el) => TICKERS_IN_BRIEFCASE.currency.includes(el[0]))); // TODO Как сделают покупку акций добавить фильтрацию по портфелю
          break;
        }
        default:
          break;
      }
    }
  }, [currency, catalogFilter]);

  const handleLink = (ticker: string) => {
    saveLastToLocal(ticker);
    status
      ? navigate(`${TICKER_URL}${ticker}`)
      : navigate(PATH_PAGE.investmentLK.startNonRegistered);
  };

  const handleFavorites = (ticker: string) => {
    setFavoritesTickersToLS(ticker, 'currency' as keyof IAssetsFavorites);
  };
  const handleDeleteFavorites = (ticker: string) => {
    deleteFromFavoritesTickersToLS(ticker, 'currency' as keyof IAssetsFavorites);
  };

  return (
    <div className={styles['catalog-container-div']}>
      <ul className={styles['stock-list']}>
        <li className={styles['stock-list-header']}>
          <Text tag='p' size='l' weight='bold' className={styles['stock-list-header-text']}>
            {TABLE_HEADERS_TEXT.currency[0]}
          </Text>
          <SortButton setFunc={setData} array={data} sortParam={1}>
            {TABLE_HEADERS_TEXT.currency[1]}
          </SortButton>
          <Text tag='p' size='l' weight='bold' className={styles['stock-list-header-text']}>
            {TABLE_HEADERS_TEXT.currency[2]}
          </Text>
        </li>
        {isLoading && <Preloader minimized={true} />}
        {catalogFilter === CatalogFilters.withSelectedAssets && !favorites.length ? (
          <Text tag='h3'>
            У вас нет избранных валют. Настройте их в вкладке дополнительные опции &gt; по выбранным
            активам
          </Text>
        ) : (
          data?.map((el, i) => {
            const isFavorite = favorites.includes(el[0]);
            const isInBriefcase = TICKERS_IN_BRIEFCASE.currency.includes(el[0]);
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
                    image={String(el[0].substring(0, 3).toLowerCase()) as TPngImageNames}
                    height='30px'
                    width='30px'
                  />
                  <Text tag='p' size='m'>{`${NAME_CURRENCY.get(el[0].toLowerCase())} (${
                    el[0]
                  })`}</Text>
                </div>
                <Text tag='p' size='m'>
                  {formatNumber(Number(el[1]), false)}₽
                </Text>
                <Text
                  tag='p'
                  size='m'
                  className={el[2].startsWith('+') ? styles['green'] : styles['red']}
                >
                  {`${el[2]}`}
                </Text>
                <div className={styles['btn-favorites-block']}>
                  <Button
                    onClick={() => {
                      !isFavorite ? handleFavorites(el[0]) : handleDeleteFavorites(el[0]);
                      setFavorites(getFavoritesByCategory('currency'));
                    }}
                    theme='icon'
                  >
                    <Icon
                      icon={'star-empty'}
                      widthAndHeight='30px'
                      className={isFavorite ? styles['icon-active'] : styles['icon']}
                    />
                  </Button>
                  {isFavorite && (
                    <Button
                      onClick={() => {
                        alert('//TODO сделать форму для создания уведомлений');
                      }}
                      theme='icon'
                    >
                      <Icon
                        icon={'bell-empty'}
                        widthAndHeight='20px'
                        className={styles['icon-bell']}
                      />
                    </Button>
                  )}
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
