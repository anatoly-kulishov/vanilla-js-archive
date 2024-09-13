import { BranchCard } from '@/entities/BranchCard/BranchCard';
import { Button, CityBranch, FilterButtons, ICity, Input, Text, Wrapper } from '@/shared';
import { useEffect, useRef, useState } from 'react';
import styles from './MapControls.module.scss';
import { BRANCHES, IN_CITY } from './const';
import { MapControlsFilter } from './ui/MapControlsFilter/MapControlsFilter';
import { BranchServes, Schedule, Service } from './ui/MapControlsFilter/types';

export type TabsType = 'LOCAL_BRANCH' | 'ATM' | 'TERMINAL';
export type TabsValue = 'Отделения' | 'Банкоматы' | 'Терминалы';

interface Props {
  filters: {
    branchServes: BranchServes[];
    schedule: Schedule[];
    services: Service[];
    onReset: () => void;
    onApply: () => void;
  };
  tabProps: {
    activeTab: TabsType;
    setActiveTab: (tab: TabsType) => void;
  };
  filteredBranches: CityBranch[] | null;
  currentCity: ICity;
  selectBranch: (branch: CityBranch) => void;
  isMoreInfoOpen: boolean;
  setIsSearchModalOpen: (value: boolean) => void;
}

export const MapControls = (props: Props) => {
  const {
    filters,
    tabProps,
    filteredBranches,
    currentCity,
    selectBranch,
    isMoreInfoOpen,
    setIsSearchModalOpen,
  } = props;
  const { branchServes, schedule, services, onReset, onApply } = filters;
  const { activeTab, setActiveTab } = tabProps;

  const ref = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState('');
  const [searchListOpen, setSearchListOpen] = useState(false);

  useEffect(() => {
    const handlerClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLDivElement) && !isMoreInfoOpen) {
        setSearchListOpen(false);
      }
    };
    if (searchListOpen) {
      document.body.addEventListener('mousedown', handlerClick);
      return () => {
        document.body.removeEventListener('mousedown', handlerClick);
      };
    }
  }, [ref, searchListOpen, isMoreInfoOpen]);

  const handlerFilterChange = (item: TabsValue) => {
    setActiveTab(BRANCHES[BRANCHES.findIndex(({ value }) => value === item)].type);
  };

  const handlerInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    setSearchListOpen(true);
  };

  const searchList = filteredBranches?.filter(({ branchAddress, cityName, branchNumber }) => {
    const str = inputValue.toLocaleLowerCase();
    return (
      branchAddress.toLocaleLowerCase().includes(str) ||
      cityName.toLocaleLowerCase().includes(str) ||
      String(branchNumber).includes(str)
    );
  });

  return (
    <Wrapper size='l' className={styles.wrapper}>
      <div className={styles.body}>
        <div className={styles.filter}>
          <div className={styles.filter_wrapper}>
            <MapControlsFilter
              branchServes={branchServes}
              schedule={schedule}
              services={services}
              onReset={onReset}
              onApply={onApply}
            />
          </div>
          <div className={styles.filterButton_wrapper}>
            <FilterButtons<TabsValue>
              filter={BRANCHES.map(({ value }) => value)}
              filterChange={handlerFilterChange}
              activeTab={BRANCHES.findIndex(({ type }) => type === activeTab)}
            />
          </div>
        </div>
        <div className={styles.search}>
          <div className={styles.input_wrapper}>
            <div className={styles.input_title}>
              <Text tag='h3' weight='medium'>
                {BRANCHES.find(({ type }) => type === activeTab)?.value}
                {' в '}
              </Text>
              <Button theme='tertiary' onClick={() => setIsSearchModalOpen(true)}>
                <Text tag='h3' weight='medium'>
                  {IN_CITY.find((inCity) => inCity[0] === currentCity.cityName)?.[1] ||
                    currentCity.cityName}
                </Text>
              </Button>
            </div>
            <Input.Search
              size='s'
              placeholder='Поиск по адресу или названию'
              value={inputValue}
              onChange={handlerInputChange}
              onFocus={() => setSearchListOpen(true)}
            />
          </div>
          <div className={styles.cards_list} ref={ref} onClick={(e) => e.stopPropagation()}>
            {searchListOpen &&
              (searchList?.length
                ? searchList.map((branch) => (
                    <BranchCard key={branch.id} selectBranch={selectBranch} cityBranch={branch} />
                  ))
                : null)}
            {/* TODO */}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
