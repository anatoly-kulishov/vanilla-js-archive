import { Icon, Preloader, Text, useGetCurrencyQuery } from '@/shared';
import { FC, useEffect, useState } from 'react';
import style from './CurrencyFavorites.module.scss';
import { CURRENT_TICKERS, ASSET_LINK, POSSIBLE_TICKERS } from '../../constants';
import { ITickerCurrency, TickerCurrency } from '@/entities';

interface ICurrencyFavoritesProps {
  currencyFavoritesNames: string[];
  setCurrencyFavoritesNames: (stocks: string[]) => void;
  setIsHasChanges: (state: boolean) => void;
}

export const CurrencyFavorites: FC<ICurrencyFavoritesProps> = ({
  currencyFavoritesNames,
  setCurrencyFavoritesNames,
  setIsHasChanges,
}) => {
  const [favoritesCurrency, setFavoritesCurrency] = useState<ITickerCurrency[]>([]);
  const [otherCurrency, setOtherCurrency] = useState<ITickerCurrency[]>([]);

  const { data: allCurrency, isLoading } = useGetCurrencyQuery();

  useEffect(() => {
    if (allCurrency) {
      const favorites: ITickerCurrency[] = [];
      const other: ITickerCurrency[] = [];
      allCurrency.map((el) => {
        const obj = {
          name: el[0],
          price: el[1],
          priceChange: el[2],
          assetLink: ASSET_LINK + el[0],
        };
        -1 !== currencyFavoritesNames.findIndex((item) => item === el[0])
          ? favorites.push(obj)
          : other.push(obj);
      });
      setFavoritesCurrency(favorites);
      setOtherCurrency(other);
    }
  }, [allCurrency]);

  function addToFavorite(ticker: ITickerCurrency) {
    setFavoritesCurrency([...favoritesCurrency, ticker]);
    setOtherCurrency(otherCurrency.filter((el) => el !== ticker));
    setCurrencyFavoritesNames([...currencyFavoritesNames, ticker.name]);
    setIsHasChanges(true);
  }

  function deleteToFavorite(ticker: ITickerCurrency) {
    setOtherCurrency([...otherCurrency, ticker]);
    setFavoritesCurrency(favoritesCurrency.filter((el) => el !== ticker));
    setCurrencyFavoritesNames(currencyFavoritesNames.filter((el) => el !== ticker.name));
    setIsHasChanges(true);
  }

  return (
    <>
      <Text tag='h5' size='m'>
        {CURRENT_TICKERS}
      </Text>
      <ul className={style.tickerList}>
        {isLoading ? (
          <Preloader />
        ) : (
          favoritesCurrency?.map((item) => (
            <li key={item.name} className={style.tickerLine}>
              <TickerCurrency
                name={item.name}
                price={item.price}
                priceChange={item.priceChange}
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
      <ul className={style.tickerList}>
        {isLoading ? (
          <Preloader />
        ) : (
          otherCurrency?.map((item) => (
            <li key={item.name} className={style.tickerLine}>
              <TickerCurrency
                name={item.name}
                price={item.price}
                priceChange={item.priceChange}
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
