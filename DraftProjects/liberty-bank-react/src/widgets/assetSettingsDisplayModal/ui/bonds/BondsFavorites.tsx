import { Icon, Preloader, TSvgImageNames, Text, useGetBondsQuery } from '@/shared';
import { FC, useEffect, useState } from 'react';
import style from './BondsFavorites.module.scss';
import { CURRENT_TICKERS, ASSET_LINK, POSSIBLE_TICKERS } from '../../constants';
import { ITickerFull, TickerFull } from '@/entities';

interface IBondsFavoritesProps {
  bondsFavoritesNames: string[];
  setBondsFavoritesNames: (stocks: string[]) => void;
  setIsHasChanges: (state: boolean) => void;
}

export const BondsFavorites: FC<IBondsFavoritesProps> = ({
  bondsFavoritesNames,
  setBondsFavoritesNames,
  setIsHasChanges,
}) => {
  const [favoritesBonds, setFavoritesBonds] = useState<ITickerFull[]>([]);
  const [otherBonds, setOtherBonds] = useState<ITickerFull[]>([]);

  const { data: allBonds, isLoading } = useGetBondsQuery();

  useEffect(() => {
    if (allBonds) {
      const favorites: ITickerFull[] = [];
      const other: ITickerFull[] = [];
      allBonds.map((el) => {
        const obj = {
          name: el[0] as TSvgImageNames,
          id: el[1],
          closeData: new Date(String(el[3])).toLocaleDateString(),
          incomePercent: el[2],
          price: el[4],
          assetLink: ASSET_LINK + el[0],
        };
        -1 !== bondsFavoritesNames.findIndex((item) => item === el[0])
          ? favorites.push(obj)
          : other.push(obj);
      });
      setFavoritesBonds(favorites);
      setOtherBonds(other);
    }
  }, [allBonds]);

  function addToFavorite(ticker: ITickerFull) {
    setFavoritesBonds([...favoritesBonds, ticker]);
    setOtherBonds(otherBonds.filter((el) => el !== ticker));
    setBondsFavoritesNames([...bondsFavoritesNames, ticker.name]);
    setIsHasChanges(true);
  }

  function deleteToFavorite(ticker: ITickerFull) {
    setOtherBonds([...otherBonds, ticker]);
    setFavoritesBonds(favoritesBonds.filter((el) => el !== ticker));
    setBondsFavoritesNames(bondsFavoritesNames.filter((el) => el !== ticker.name));
    setIsHasChanges(true);
  }

  return (
    <>
      <Text tag='h5' size='m'>
        {CURRENT_TICKERS}
      </Text>
      <ul>
        {isLoading ? (
          <Preloader />
        ) : (
          favoritesBonds?.map((item) => (
            <li key={item.id} className={style.tickerLine}>
              <TickerFull
                name={item.name}
                id={item.id}
                closeData={item.closeData}
                incomePercent={item.incomePercent}
                price={item.price}
                assetLink={item.assetLink}
              />
              <Icon
                icon='cross'
                width='50'
                height='50'
                className={style.tickerLink__action}
                onClick={() => {
                  deleteToFavorite(item);
                }}
              />
            </li>
          ))
        )}
      </ul>
      <Text tag='h5' size='m'>
        {POSSIBLE_TICKERS}
      </Text>
      <ul>
        {isLoading ? (
          <Preloader />
        ) : (
          otherBonds?.map((item) => (
            <li key={item.id} className={style.tickerLine}>
              <TickerFull
                name={item.name}
                id={item.id}
                closeData={item.closeData}
                incomePercent={item.incomePercent}
                price={item.price}
                assetLink={item.assetLink}
              />
              <Icon
                icon='plus'
                width='50'
                height='50'
                className={style.tickerLink__action}
                onClick={() => {
                  addToFavorite(item);
                }}
              />
            </li>
          ))
        )}
      </ul>
    </>
  );
};
