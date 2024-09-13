import { useState, useCallback, useMemo } from 'react';

import useStorageFilters from '@t2crm/wfm-utils/lib/hooks/useStorageFilters';

import useDictionaries from 'hooks/useDictionaries';
import { filtersMap } from 'pages/AutoOperationsSettings/constants';
import AdminPanelNamespace from 'types/adminPanel';
import { notificationStatuses } from '../constants';

const useNotificationSettingsFilters = () => {
  const {
    notificationConditions,
  } = useDictionaries(['notification-conditions']);

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
        allowClear: true,
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
        name: 'notificationConditionIdList',
        label: 'Условие',
      },
      controlProps: {
        loading: notificationConditions.isFetching,
        options: notificationConditions.data,
        mode: 'multiple',
        maxTagCount: 'responsive',
        placeholder: 'Выберите условие',
      },
    },
    {
      type: AdminPanelNamespace.FormItemTypes.Select,
      formItemProps: {
        name: 'isActive',
        label: 'Статус',
        initialValue: 'all',
      },
      controlProps: {
        options: notificationStatuses,
        placeholder: 'Выберите статус',
      },
    },
  ], [
    handleChangePartnerId,
    dealers,
    notificationConditions,
    selectedPartnerId,
  ]);

  return { filterItems };
};

export default useNotificationSettingsFilters;
