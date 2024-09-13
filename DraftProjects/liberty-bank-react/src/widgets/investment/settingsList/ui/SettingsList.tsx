import { FC, memo } from 'react';
import { Button, CatalogFilters, CurrencyValues, IInvestOptions } from '@/shared';
import styles from './SettingsList.module.scss';
import { SelectAssetsFilter, SelectCurrency, getInvestOptionsIntoStorage } from '@/features';
import { SelectNotifications } from '@/features/selectNotifications/selectNotifications';

interface SettingsListProps {
  saveChangesToStorage: () => void;
  isHasChanges: boolean;
  setIsAssetsOptionsModalOpen: (state: boolean) => void;
}

export const SettingsList: FC<SettingsListProps> = memo(function SettingsList({
  saveChangesToStorage,
  isHasChanges,
  setIsAssetsOptionsModalOpen,
}) {
  const investOptionsIntoStorage: IInvestOptions = JSON.parse(
    getInvestOptionsIntoStorage() || 'null',
  );

  const briefcaseCurrencyInStorage: CurrencyValues =
    investOptionsIntoStorage?.briefcaseCurrency || CurrencyValues.ruble;

  const catalogFilterInStorage: CatalogFilters =
    investOptionsIntoStorage?.catalogFilter || CatalogFilters.withAllAssets;

  return (
    <div className={styles.settings}>
      <SelectCurrency briefcaseCurrency={briefcaseCurrencyInStorage} />
      <SelectAssetsFilter
        catalogFilter={catalogFilterInStorage}
        setIsAssetsOptionsModalOpen={setIsAssetsOptionsModalOpen}
        isFromSettingsPage={true}
        inline={false}
        buttonTextWidth='m'
      />
      <SelectNotifications />
      <Button
        size='m'
        type='submit'
        width='auto'
        onClick={saveChangesToStorage}
        disabled={!isHasChanges}
      >
        Сохранить изменения
      </Button>
    </div>
  );
});
