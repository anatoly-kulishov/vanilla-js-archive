import {
  Button,
  Wrapper,
  getBriefcaseCurrency,
  getCatalogFilter,
  getEnableNotifications,
  getIsSettingsChanged,
  getNotificationsPeriod,
  getNotificationsWithPeriodEnable,
  setInvestOptionsIntoStorage,
  setIsSettingsChanged,
} from '@/shared';

import InvestModal from '@/widgets/investModal/ui/InvestModal';
import { useEffect, useState } from 'react';
import styles from './InvestmentLKsettings.module.scss';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';
import { InvestOptionsModal, AssetSettingsDisplayModal, SettingsList } from '@/widgets';
import { useDispatch, useSelector } from 'react-redux';

const InvestmentLKsettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(true);
  const [isAssetsOptionsModalOpen, setIsAssetsOptionsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const briefcaseCurrency = useSelector(getBriefcaseCurrency);
  const catalogFilter = useSelector(getCatalogFilter);
  const isNotificationsEnabled = useSelector(getEnableNotifications);
  const isNotificationsWithPeriodEnabled = useSelector(getNotificationsWithPeriodEnable);
  const notificationsPeriod = useSelector(getNotificationsPeriod);
  const isHasChanges = useSelector(getIsSettingsChanged);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isHasChanges && currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    isModalOpen || isAssetsOptionsModalOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [isModalOpen, isAssetsOptionsModalOpen]);

  function saveChangesToStorage() {
    setInvestOptionsIntoStorage({
      briefcaseCurrency,
      catalogFilter,
      isNotificationsEnabled,
      isNotificationsWithPeriodEnabled,
      notificationsPeriod,
    });
    dispatch(setIsSettingsChanged(false));
  }

  return (
    <Wrapper className={styles.wrapper}>
      <SettingsList
        isHasChanges={isHasChanges}
        saveChangesToStorage={saveChangesToStorage}
        setIsAssetsOptionsModalOpen={setIsAssetsOptionsModalOpen}
      />

      <Button theme={'primary'} onClick={() => setIsModalOpen(true)} className={styles['button']}>
        закрыть счет
      </Button>
      {isModalOpen && <InvestModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
      {blocker.state === 'blocked' ? (
        <InvestOptionsModal
          isModalOpen={isOptionsModalOpen}
          setIsModalOpen={(state) => {
            setIsOptionsModalOpen(state);
            blocker.proceed();
          }}
          saveOptions={() => {
            saveChangesToStorage();
          }}
        />
      ) : null}
      {isAssetsOptionsModalOpen && (
        <AssetSettingsDisplayModal
          isModalOpen={isAssetsOptionsModalOpen}
          setIsModalOpen={setIsAssetsOptionsModalOpen}
        />
      )}
      {blocker.state === 'blocked' ? (
        <InvestOptionsModal
          isModalOpen={isOptionsModalOpen}
          setIsModalOpen={(state) => {
            setIsOptionsModalOpen(state);
            blocker.proceed();
          }}
          saveOptions={() => {
            saveChangesToStorage();
          }}
        />
      ) : null}
      {isAssetsOptionsModalOpen && (
        <AssetSettingsDisplayModal
          isModalOpen={isAssetsOptionsModalOpen}
          setIsModalOpen={setIsAssetsOptionsModalOpen}
        />
      )}
    </Wrapper>
  );
};

export default InvestmentLKsettings;
