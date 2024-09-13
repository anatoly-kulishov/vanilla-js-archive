import { FC, useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { TablePaginationConfig } from 'antd';

import AdminPanel from 'components/AdminPanel';
import { getNotificationSettings } from 'utils/api/notificationSettings';
import Common from '@t2crm/wfm-utils/lib/types/common';
import { tablePaginationConfig } from 'constants/tableConstants';
import { notificationsFiltersMap, notificationsSettingsColumns } from './constants';
import useNotificationSettingsFilters from './hooks/useNotificationSettingsFilters';
import NotificationSettingsModal from './NotificationSettingsModal';
import './styles.less';

const NotificationsSettings: FC = () => {
  const [activeFilters, setActiveFilters] = useState<Common.KeyValue>({});
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    ...tablePaginationConfig,
    current: 1,
  });

  const { filterItems } = useNotificationSettingsFilters();

  const notificationSettings = useQuery({
    queryKey: ['notification-settings', activeFilters, pagination.current],
    queryFn: () => getNotificationSettings({
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

  const updateActiveFilters = useCallback((filters: Common.KeyValue) => {
    const { isActive, ...restFilters } = filters;
    setActiveFilters(isActive === 'all' ? restFilters : filters);
  }, [setActiveFilters]);

  return (
    <AdminPanel
      filtersProps={{
        filtersKey: 'notifications-settings',
        filtersMap: notificationsFiltersMap,
        filterItems,
        updateActiveFilters,
      }}
      tableProps={{
        cardTitle: 'Настройки уведомлений',
        dataSource: notificationSettings.data?.settings ?? [],
        loading: notificationSettings.isFetching,
        columns: notificationsSettingsColumns,
        rowKey: ({ dealerId, notificationSettingsId }) => `${dealerId}-${notificationSettingsId}`,
        useEditAction: true,
        onChange: setPagination,
        pagination,
      }}
      modalProps={{
        CustomModal: NotificationSettingsModal,
      }}
    />
  );
};

export default NotificationsSettings;
