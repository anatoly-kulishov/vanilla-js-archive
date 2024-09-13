import { useState } from 'react';
import { useSelector } from 'react-redux';
import { filters, specializations } from './const';
import styles from './WorkPageFilters.module.scss';
import { SearchCityModal } from '@/entities/searchCityModal/SearchCityModal';
import {
  Button,
  Checkbox,
  Icon,
  Input,
  Modal,
  Text,
  useCitiesListQuery,
  getCurrentCity,
} from '@/shared';

const WorkPageFilters = () => {
  const currentCity = useSelector(getCurrentCity);
  const { data: citiesList, isSuccess } = useCitiesListQuery();
  const [isActive, setIsActive] = useState(false);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeSearchModal = () => setIsSearchModalOpen(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles['filter-wrapper']}>
      <div className={styles['filter-button-content']}>
        <Icon icon={'filterIcon'} widthAndHeight={'16'} fill={'#000'} />
        Фильтр
      </div>
      <form className={styles['form']}>
        {filters.map((elem, i) => (
          <div key={i} className={styles['filter-content']}>
            <Text tag='p' size='s' weight='bold'>
              {elem.value}
            </Text>
            <ul className={styles['filter-list']}>
              {elem.options.map((item, i) => (
                <li key={i} className={styles['filter-list-item']}>
                  <Checkbox
                    name={item.value}
                    checked={item.checked}
                    onChange={() => setIsActive(!isActive)}
                  />
                  {item.value}
                </li>
              ))}
            </ul>
            {(elem.value === 'Город' || elem.value === 'Специализации') && (
              <Button
                theme='tertiary'
                href='#'
                onClick={
                  elem.value === 'Город'
                    ? () => setIsSearchModalOpen(true)
                    : () => setIsModalOpen(true)
                }
              >
                {elem.value === 'Город' ? 'Выбрать город' : 'Выбрать еще'}
              </Button>
            )}
          </div>
        ))}
        <div className={styles['button-container']}>
          <Button type='submit'>Применить фильтр</Button>
          <Button theme='secondary' type='button'>
            Сбросить
          </Button>
        </div>
      </form>
      {isSuccess && (
        <Modal isOpen={isSearchModalOpen} setIsOpen={setIsSearchModalOpen}>
          <SearchCityModal
            currentCity={currentCity.cityName}
            citiesList={citiesList.items}
            closeSearchModal={closeSearchModal}
          />
        </Modal>
      )}
      <Modal className={styles['modal']} isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <>
          <div className={styles['modal-title']}>
            <Text tag={'h2'} size='ml' weight='medium' className={styles['description']}>
              Специализация
            </Text>
            <Button theme='icon' className={styles['closeButton']} onClick={closeModal}>
              <Icon icon={'close'} widthAndHeight={'10px'} fill={'none'} />
            </Button>
          </div>
          <Input.Search className={styles['input']} placeholder='Быстрый поиск' size='s' />
          <ul className={styles['list-container']}>
            {specializations.map((data) => (
              <li key={data.value} className={styles['list-item']}>
                <Checkbox
                  name={data.value}
                  checked={data.checked}
                  onChange={() => setIsActive(!isActive)}
                />
                {data.value}
              </li>
            ))}
          </ul>
          <div className={styles['button-container']}>
            <Button type='submit'>Применить фильтр</Button>
            <Button theme='secondary' type='button'>
              Сбросить
            </Button>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default WorkPageFilters;
