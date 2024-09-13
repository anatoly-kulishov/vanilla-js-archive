import { FC, useState, useEffect, useMemo } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import {
  Button,
  Input,
  InputErrorMessage,
  Text,
  setCurrentCity,
  Icon,
  usePopularCitiesQuery,
  useSearchCitiesQuery,
} from '@/shared';
import { useDebounce } from '@/shared/hooks/useDebounce';
import styles from './SearchCityModal.module.scss';
import { useDispatch } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/dist/query';

interface ICity {
  cityId: number;
  cityName: string;
  isDefault: boolean;
}

interface ISearchCityModalProps {
  currentCity: string;
  citiesList: ICity[];
  closeSearchModal: () => void;
}

interface ISearchData {
  city: string;
}

export const SearchCityModal: FC<ISearchCityModalProps> = (props) => {
  const { currentCity, citiesList, closeSearchModal } = props;
  const { data: popularCities } = usePopularCitiesQuery();
  const dispatch = useDispatch();

  const filteredPopularCities = popularCities
    ? popularCities.items.filter((city) => city.cityName !== currentCity)
    : [];

  const { control, handleSubmit, watch } = useForm({
    defaultValues: { city: '' },
  });

  const [searchError, setSearchError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const changeSearchInput = useDebounce(watch('city'), 500);
  const {
    data: rawFoundCities,
    isSuccess,
    isLoading,
  } = useSearchCitiesQuery(changeSearchInput || skipToken);
  const foundCities = useMemo(() => [...new Set(rawFoundCities)], [rawFoundCities]);

  useEffect(() => {
    if (searchError) {
      setSearchError(false);
    }
  }, [watch('city')]);

  useEffect(() => {
    function arrowHandler(evt: KeyboardEvent) {
      if (evt.key === 'ArrowDown') {
        evt.preventDefault();
        setActiveIndex((old) => (old + 1) % foundCities.length);
      }
      if (evt.key === 'ArrowUp') {
        evt.preventDefault();
        setActiveIndex((old) => (old === 0 ? foundCities.length - 1 : old - 1));
      }
    }

    if (foundCities && foundCities[0] === 'Такого города нету') {
      setSearchError(true);
    } else {
      setActiveIndex(0);
    }

    document.addEventListener('keydown', arrowHandler);
    return () => document.removeEventListener('keydown', arrowHandler);
  }, [foundCities]);

  const selectCity = (city: ICity) => {
    dispatch(setCurrentCity(city));
    closeSearchModal();
  };

  const searchCity: SubmitHandler<ISearchData> = (searchData): void => {
    const foundCity = citiesList.find(
      (city) => city.cityName === searchData.city || city.cityName === foundCities[activeIndex],
    );
    if (foundCity) {
      selectCity(foundCity);
    } else {
      setSearchError(true);
    }
  };

  const cityButtons = useMemo(
    () => (
      <div className={styles.cityButtons}>
        {foundCities.map((city, index) => {
          const buttonCity = citiesList.find((listedCity) => listedCity.cityName === city);
          if (!buttonCity) return null;
          return (
            <Button
              type='button'
              theme={index === activeIndex ? 'primary' : 'third'}
              key={city}
              onClick={() => selectCity(buttonCity)}
              className={styles.cityButtons}
            >
              {city}
            </Button>
          );
        })}
      </div>
    ),
    [rawFoundCities, activeIndex],
  );

  return (
    <div className={styles.modal}>
      <Button theme='icon' className={styles.closeButton} onClick={closeSearchModal}>
        <Icon icon={'close'} widthAndHeight={'10px'} fill={'none'} />
      </Button>
      <div className={styles.container}>
        <div className={styles.currentCity}>
          <Text tag='p' weight='regular' size='s' className={styles.title}>
            Вы здесь:
          </Text>
          <Button theme='tertiary' onClick={closeSearchModal}>
            {currentCity}
          </Button>
        </div>
        <form onSubmit={handleSubmit(searchCity)}>
          <Controller
            control={control}
            name='city'
            render={({ field }) => (
              <Input.Search
                placeholder='Поиск'
                size='s'
                {...field}
                onSearch={handleSubmit(searchCity)}
                isError={searchError}
                autoComplete='off'
              />
            )}
          />
          {searchError && <InputErrorMessage message='В данном городе отделений банка нет' />}
        </form>
      </div>

      {watch('city') && isSuccess && !isLoading && !searchError && cityButtons}
      {!watch('city') && (
        <div className={styles.container}>
          <Text tag='h3' weight='medium'>
            Популярные города
          </Text>
          <ul className={styles.popularCities}>
            {filteredPopularCities.map((city) => (
              <Button key={city.cityId} theme='third' size='s' onClick={() => selectCity(city)}>
                {city.cityName}
              </Button>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
