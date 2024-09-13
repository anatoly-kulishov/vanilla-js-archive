import { useNavigate } from 'react-router-dom';
import {
  Button,
  CatalogFilters,
  IAssetsFavorites,
  Icon,
  PATH_PAGE,
  Preloader,
  Text,
  deleteFromFavoritesTickersToLS,
  getBrokerAccStatus,
  getFavoritesByCategory,
  setFavoritesTickersToLS,
  useGetBondsQuery,
} from '@/shared';
import { SortButton } from '../SortButton/SortButton';
import { TABLE_HEADERS_TEXT, TICKERS_IN_BRIEFCASE, TICKER_URL } from '../../constants';
import styles from './CatalogLists.module.scss';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatNumber } from '@/shared/lib/formatNumber';

interface IProps {
  catalogFilter: CatalogFilters;
  // favoriteBonds: string[];
}

export const BondsList: FC<IProps> = ({ catalogFilter }) => {
  const navigate = useNavigate();
  const { data: bonds, isLoading } = useGetBondsQuery();
  const [data, setData] = useState<string[][]>([]);
  const status = useSelector(getBrokerAccStatus);
  const [favorites, setFavorites] = useState(getFavoritesByCategory('bonds'));

  useEffect(() => {
    if (bonds) {
      switch (catalogFilter) {
        case CatalogFilters.withAllAssets: {
          setData(bonds);
          break;
        }
        case CatalogFilters.withSelectedAssets: {
          setData(bonds.filter((el) => favorites.includes(el[0])));
          break;
        }
        case CatalogFilters.withBriefcase: {
          setData(bonds.filter((el) => TICKERS_IN_BRIEFCASE.bonds.includes(el[0]))); // TODO Как сделают покупку акций добавить фильтрацию по портфелю
          break;
        }
        default:
          break;
      }
    }
  }, [bonds, catalogFilter]);
  const handleFavorites = (ticker: string) => {
    setFavoritesTickersToLS(ticker, 'bonds' as keyof IAssetsFavorites);
  };
  const handleDeleteFavorites = (ticker: string) => {
    deleteFromFavoritesTickersToLS(ticker, 'bonds' as keyof IAssetsFavorites);
  };

  return (
    <div className={styles['catalog-container-div']}>
      <ul className={styles['bonds-list']}>
        <li className={styles['bonds-list-header']}>
          <Text tag='p' size='l' weight='bold' className={styles['bonds-list-header-text']}>
            {TABLE_HEADERS_TEXT.bonds[0]}
          </Text>
          <Text tag='p' size='l' weight='bold' className={styles['bonds-list-header-text']}>
            {TABLE_HEADERS_TEXT.bonds[1]}
          </Text>
          <SortButton setFunc={setData} array={data} sortParam={2}>
            {TABLE_HEADERS_TEXT.bonds[2]}
          </SortButton>
          <SortButton setFunc={setData} array={data} sortParam={4}>
            {TABLE_HEADERS_TEXT.bonds[3]}
          </SortButton>
        </li>
        {isLoading && <Preloader minimized={true} />}
        {catalogFilter === CatalogFilters.withSelectedAssets && !favorites.length ? (
          <Text tag='h3'>
            У вас нет избранных облигаций. Настройте их в вкладке дополнительные опции &gt; по
            выбранным активам
          </Text>
        ) : (
          data?.map((el, i) => {
            const closeDate = new Date(String(el[3]));
            const isFavorite = favorites.includes(el[0]);
            const isInBriefcase = TICKERS_IN_BRIEFCASE.bonds.includes(el[0]);
            return (
              <li key={i} className={styles['bonds-item']}>
                {isInBriefcase && (
                  <Icon
                    icon={'briefcase'}
                    widthAndHeight='20px'
                    className={styles['icon-briefcase']}
                  />
                )}
                <Text
                  tag='p'
                  size='m'
                  className={styles['bonds-name']}
                >{`${el[1]} (${el[0]})`}</Text>
                <Text tag='p' size='m'>
                  {closeDate.toLocaleDateString()} г.
                </Text>
                <Text tag='p' size='m'>
                  {formatNumber(Number(el[2]), false)}%
                </Text>
                <Text tag='p' size='m'>
                  {formatNumber(Number(el[4]), false)}₽
                </Text>
                <div className={styles['btn-favorites-block']}>
                  <Button
                    onClick={() => {
                      !isFavorite ? handleFavorites(el[0]) : handleDeleteFavorites(el[0]);
                      setFavorites(getFavoritesByCategory('bonds'));
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
                      status
                        ? navigate(`${TICKER_URL}${el[0]}`)
                        : navigate(PATH_PAGE.investmentLK.startNonRegistered);
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
