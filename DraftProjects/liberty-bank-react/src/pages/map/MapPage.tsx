import { ConfirmCityModal, SearchCityModal } from '@/entities';
import { MoreInfoAboutBranch } from '@/entities/moreInfoAboutBranch';
import {
  CityBranch,
  Map,
  Modal,
  getCurrentCity,
  setCurrentCity,
  useAppDispatch,
  useBankBranchQuery,
  useCitiesListQuery,
} from '@/shared';
import { MapControls } from '@/widgets/mapControls';
import { TabsType } from '@/widgets/mapControls/const';
import { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './MapPage.module.scss';
import { DEFAULT_FILTER_SCHEDULE, DEFAULT_FILTER_SERVICES } from './const';
import { BranchServesTypes } from './model';
import { createBranchServesProps, createScheduleProps, createServicesProps } from './utils';
import { filteringBranches } from './utils/filteringBranches';

const MapPage: FC = () => {
  const dispatch = useAppDispatch();

  const currentCity = useSelector(getCurrentCity);

  const { data: citiesList, isSuccess } = useCitiesListQuery();
  const { data: cityBranches } = useBankBranchQuery(currentCity.cityId || 1);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(
    currentCity.isDefault === undefined,
  );
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<CityBranch | null>(null);
  const [activeTab, setActiveTab] = useState<TabsType>('LOCAL_BRANCH');

  // TODO REFACTOR
  const [filterBranchServes, setFilterBranchServes] = useState<BranchServesTypes>('all');
  const [filterSchedule, setFilterSchedule] = useState(DEFAULT_FILTER_SCHEDULE);
  const [filterServices, setFilterServices] = useState(DEFAULT_FILTER_SERVICES);
  // TODO REFACTOR

  const defaultCity = citiesList?.items.find((city) => city.isDefault);

  useEffect(() => {
    if (currentCity.isDefault === undefined && defaultCity) {
      dispatch(setCurrentCity(defaultCity));
    }
  }, [currentCity, defaultCity]);

  const hideConfirmModal = () => setIsConfirmModalOpen(false);
  const openSearchModel = () => {
    hideConfirmModal();
    setIsSearchModalOpen(true);
  };
  const closeSearchModal = () => setIsSearchModalOpen(false);

  // TODO REFACTOR
  const branchServes = useMemo(
    () => createBranchServesProps(filterBranchServes, setFilterBranchServes),
    [filterBranchServes],
  );
  const schedule = useMemo(
    () => createScheduleProps(filterSchedule, setFilterSchedule),
    filterSchedule,
  );
  const services = useMemo(
    () => createServicesProps(filterServices, setFilterServices),
    filterServices,
  );
  // TODO REFACTOR

  const onReset = () => {
    setFilterBranchServes('all');
    setFilterSchedule(DEFAULT_FILTER_SCHEDULE);
    setFilterServices(DEFAULT_FILTER_SERVICES);
  };

  const onApply = () => null;

  const selectBranch = (branch: CityBranch) => {
    setSelectedBranch(branch);
    setIsMoreInfoOpen(true);
  };

  const filters = { branchServes, schedule, services, onReset, onApply };

  const filteredBranches = filteringBranches(
    activeTab,
    {
      branchServes: filterBranchServes,
      schedule: filterSchedule,
      services: filterServices,
    },
    cityBranches,
  );

  return (
    <main>
      <MoreInfoAboutBranch
        bankInfo={selectedBranch}
        isOpen={isMoreInfoOpen}
        setIsOpen={setIsMoreInfoOpen}
      />
      <MapControls
        filters={filters}
        tabProps={{ activeTab, setActiveTab }}
        filteredBranches={filteredBranches}
        currentCity={currentCity}
        selectBranch={selectBranch}
        isMoreInfoOpen={isMoreInfoOpen}
        setIsSearchModalOpen={setIsSearchModalOpen}
      />
      <Map currentCity={currentCity} cityBranches={filteredBranches} />
      <Modal
        isOpen={isConfirmModalOpen}
        setIsOpen={setIsConfirmModalOpen}
        className={styles.modal}
        position='free'
      >
        <ConfirmCityModal
          city={currentCity.cityName}
          handleConfirmButtonClick={hideConfirmModal}
          handleCancleButtonClick={openSearchModel}
        />
      </Modal>
      {isSuccess && (
        <Modal isOpen={isSearchModalOpen} setIsOpen={setIsSearchModalOpen}>
          <SearchCityModal
            currentCity={currentCity.cityName}
            citiesList={citiesList.items}
            closeSearchModal={closeSearchModal}
          />
        </Modal>
      )}
    </main>
  );
};

export default MapPage;
