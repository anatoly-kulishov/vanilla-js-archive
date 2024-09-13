import { Preloader, TSvgImageNames, Text, useGetStocksQuery } from '@/shared';
import { FC, useEffect, useState } from 'react';
import style from './StockFavorites.module.scss';
import { CURRENT_TICKERS, ASSET_LINK, POSSIBLE_TICKERS } from '../../constants';
import { Ticker } from '@/entities';

interface IStockFavoritesProps {
  stockFavoritesNames: string[];
  setStockFavoritesNames: (stocks: string[]) => void;
  setIsHasChanges: (state: boolean) => void;
}

export interface ITicker {
  name: TSvgImageNames;
  currentValue: number;
  changedValue: number;
  changedValueInPercent: number;
  change: string;
}

export const StockFavorites: FC<IStockFavoritesProps> = ({
  stockFavoritesNames,
  setStockFavoritesNames,
  setIsHasChanges,
}) => {
  const [favoritesStock, setFavoritesStock] = useState<ITicker[]>([]);
  const [otherStock, setOtherStock] = useState<ITicker[]>([]);

  const { data: allStocks, isLoading } = useGetStocksQuery();

  useEffect(() => {
    if (allStocks) {
      const favorites: ITicker[] = [];
      const other: ITicker[] = [];
      allStocks.map((el) => {
        const obj = {
          name: el[0] as TSvgImageNames,
          currentValue: +el[2],
          changedValue: +el[3],
          changedValueInPercent: +el[1],
          change: el[4],
        };
        -1 !== stockFavoritesNames.findIndex((item) => item === el[0])
          ? favorites.push(obj)
          : other.push(obj);
      });
      setFavoritesStock(favorites);
      setOtherStock(other);
    }
  }, [allStocks]);

  function addToFavorite(ticker: ITicker) {
    setFavoritesStock([...favoritesStock, ticker]);
    setOtherStock(otherStock.filter((el) => el !== ticker));
    setStockFavoritesNames([...stockFavoritesNames, ticker.name]);
    setIsHasChanges(true);
  }

  function deleteToFavorite(ticker: ITicker) {
    setOtherStock([...otherStock, ticker]);
    setFavoritesStock(favoritesStock.filter((el) => el !== ticker));
    setStockFavoritesNames(stockFavoritesNames.filter((el) => el !== ticker.name));
    setIsHasChanges(true);
  }

  return (
    <>
      <Text tag='h5' size='m'>
        {CURRENT_TICKERS}
      </Text>
      <div className={style.tickerLine}>
        {isLoading ? (
          <Preloader />
        ) : (
          favoritesStock?.map((item) => {
            return (
              <Ticker
                key={item.name}
                name={item.name}
                assetLink={ASSET_LINK + item.name}
                changedValueInPercent={item.changedValueInPercent}
                changedValue={item.changedValue}
                change={item.change}
                action='cross'
                actionClick={() => {
                  deleteToFavorite(item);
                }}
              />
            );
          })
        )}
      </div>
      <Text tag='h5' size='m'>
        {POSSIBLE_TICKERS}
      </Text>
      <div className={style.tickerLine}>
        {isLoading ? (
          <Preloader />
        ) : (
          otherStock?.map((item) => {
            return (
              <Ticker
                key={item.name}
                name={item.name}
                assetLink={ASSET_LINK + item.name}
                changedValueInPercent={item.changedValueInPercent}
                changedValue={item.changedValue}
                change={item.change}
                action='plus'
                actionClick={() => {
                  addToFavorite(item);
                }}
              />
            );
          })
        )}
      </div>
    </>
  );
};
