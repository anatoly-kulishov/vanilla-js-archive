import {
  useCallback, useMemo, useState,
} from 'react';
import useStorageFilters from '@t2crm/wfm-utils/lib/hooks/useStorageFilters';

import useDictionaries from 'hooks/useDictionaries';
import AdminPanelNamespace from 'types/adminPanel';
import { filtersMap } from '../constants';

const useFiltersItems = () => {
  const {
    employeeActivities,
    autoOperationsTypes,
  } = useDictionaries(['employee-activities', 'auto-operations-types']);

  const [initialStorageState] = useStorageFilters('operations-settings', filtersMap);

  const [
    selectedPartnerId,
    setSelectedPartnerId,
  ] = useState<number | null>(initialStorageState?.partnerId ?? null);

  const { dealers } = useDictionaries(['dealers'], selectedPartnerId ? { partnerId: selectedPartnerId } : undefined);

  const handleChangePartnerId = useCallback((value: number) => {
    setSelectedPartnerId(value);
  }, [setSelectedPartnerId]);

  const filterItems: AdminPanelNamespace.FilterItems = useMemo(() => [
    {
      type: AdminPanelNamespace.FormItemTypes.PartnerSelect,
      formItemProps: {
        name: 'partnerId',
        label: 'Партнер',
        getValueProps: (value) => {
          if (!value && !!selectedPartnerId) {
            setTimeout(() => {
              setSelectedPartnerId(null);
            }, 0);
          }

          return value;
        },
      },
      controlProps: {
        onChange: handleChangePartnerId,
        onClear: () => setSelectedPartnerId(null),
        placeholder: 'Выберите партнера',
      },
    },
    {
      type: AdminPanelNamespace.FormItemTypes.Select,
      formItemProps: {
        name: 'dealerIdList',
        label: 'Дилер',
      },
      controlProps: {
        loading: dealers.isFetching,
        options: dealers.data,
        mode: 'multiple',
        maxTagCount: 'responsive',
        placeholder: 'Выберите дилера',
      },
    },
    {
      type: AdminPanelNamespace.FormItemTypes.Select,
      formItemProps: {
        name: 'employeeActivityIdList',
        label: 'Активность',
      },
      controlProps: {
        loading: employeeActivities.isFetching,
        options: employeeActivities.data,
        mode: 'multiple',
        maxTagCount: 'responsive',
        placeholder: 'Выберите активность',
      },
    },
    {
      type: AdminPanelNamespace.FormItemTypes.Select,
      formItemProps: {
        name: 'autoOperationsTypeIdList',
        label: 'Тип операции',
      },
      controlProps: {
        loading: autoOperationsTypes.isFetching,
        options: autoOperationsTypes.data,
        mode: 'multiple',
        maxTagCount: 'responsive',
        placeholder: 'Выберите тип операции',
      },
    },
  ], [
    handleChangePartnerId,
    dealers,
    employeeActivities,
    autoOperationsTypes,
    selectedPartnerId,
  ]);

  return { filterItems };
};

export default useFiltersItems;
