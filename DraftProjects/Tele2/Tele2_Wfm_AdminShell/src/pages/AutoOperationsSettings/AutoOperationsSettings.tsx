import {
  FC, useState,
} from 'react';
import { useQuery } from 'react-query';
import { TablePaginationConfig } from 'antd';

import AdminPanel from 'components/AdminPanel';
import Common from '@t2crm/wfm-utils/lib/types/common';
import { getAutoOperationsSettings } from 'utils/api/autoOperationsSettings';
import { tablePaginationConfig } from 'constants/tableConstants';
import { columns, filtersMap } from './constants';
import useFiltersItems from './hooks/useFiltersItems';
import AutoOperationsSettingsModal from './AutoOperationsSettingsModal';
import useOperationsSettingsMutations from './hooks/useOperationsSettingsMutations';
import './styles.less';

const AutoOperationsSettings: FC = () => {
  const [activeFilters, setActiveFilters] = useState<Common.KeyValue>({});
  const { filterItems } = useFiltersItems();
  const { deleteSettings } = useOperationsSettingsMutations();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    ...tablePaginationConfig,
    current: 1,
  });

  const operationsSettings = useQuery({
    queryKey: ['operations-settings', activeFilters, pagination.current],
    queryFn: () => getAutoOperationsSettings({
      ...activeFilters,
      pageSize: pagination.pageSize,
      pageIndex: pagination.current,
    })
      .then(({ data }) => {
        setPagination({ ...pagination, total: data.total });
        return data;
      }),
    enabled: !!activeFilters,
  });

  const onChangePage = (curPagination: TablePaginationConfig) => {
    setPagination(curPagination);
  };

  const onConfirmDelete = (record: Common.KeyValue) => {
    const { dealerId, employeeActivityId, autoOperationsTypeId } = record;
    deleteSettings.mutate({
      dealerId,
      employeeActivityId,
      autoOperationsTypeId,
    });
  };

  return (
    <AdminPanel
      filtersProps={{
        filterItems,
        filtersMap,
        filtersKey: 'operations-settings',
        updateActiveFilters: setActiveFilters,
      }}
      tableProps={{
        cardTitle: 'Настройки автоматических операций',
        dataSource: operationsSettings.data?.settings ?? [],
        columns,
        useEditAction: true,
        useDeleteAction: true,
        onConfirmDelete,
        loading: operationsSettings.isFetching,
        rowKey: ({ autoOperationsTypeId, dealerId, employeeActivityId }) => `${autoOperationsTypeId}-${dealerId}-${employeeActivityId}`,
        onChange: onChangePage,
        pagination,
      }}
      modalProps={{
        CustomModal: AutoOperationsSettingsModal,
      }}
    />
  );
};

export default AutoOperationsSettings;
