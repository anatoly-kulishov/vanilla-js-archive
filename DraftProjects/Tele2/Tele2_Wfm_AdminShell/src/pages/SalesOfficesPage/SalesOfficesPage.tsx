import {
  FC,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Card, TablePaginationConfig } from 'antd';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import type Common from '@t2crm/wfm-utils/lib/types/common';
import useToggleModal from '@t2crm/wfm-utils/lib/hooks/useToggleModal';
import OfficesResponse from 'types/response/offices';
import { getOffices } from 'utils/api/offices';
import { tablePaginationConfig } from 'constants/tableConstants';
import Filters from './components/Filters';
import SalesOfficesTable from './components/SalesOfficesTable';
import LoadOffices from './components/LoadOffices';
import OfficeModal from './components/OfficeModal';
import './styles.less';

const className = cn('sales-offices-page');

const SalesOfficesPage: FC = () => {
  const [activeFilters, setActiveFilters] = useState<Common.KeyValue | undefined>(undefined);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    ...tablePaginationConfig,
    current: 1,
  });

  const [selectedOfficeId, setSelectedOfficeId] = useState<number | null>(null);
  const { isVisible, toggleModal } = useToggleModal();

  const queryClient = useQueryClient();

  const activeSearchKey = useMemo(() => (['sale-offices', activeFilters]), [activeFilters]);

  const {
    data: offices,
    isFetching,
    refetch: refetchOffices,
  } = useQuery<OfficesResponse.OfficeByIdInfo[]>({
    queryKey: ['sale-offices', activeFilters, pagination.current],
    queryFn: () => getOffices({
      ...activeFilters,
      pageSize: pagination.pageSize,
      pageIndex: pagination.current,
    })
      .then(({ data }) => {
        setPagination({ ...pagination, total: data.total });
        return data.saleOffices ?? [];
      }),
    initialData: [],
    enabled: !!activeFilters,
  });

  const reloadOffices = useCallback(() => {
    queryClient.resetQueries(activeSearchKey);
  }, [queryClient, activeSearchKey]);

  const onEditOffice = useCallback((officeId) => {
    toggleModal();
    setSelectedOfficeId(officeId);
  }, [toggleModal]);

  const onCloseModal = useCallback(() => {
    toggleModal();
    setSelectedOfficeId(null);
    refetchOffices();
  }, [toggleModal, refetchOffices]);

  return (
    <div className={className()}>
      <Filters updateActiveFilters={setActiveFilters} />

      <div className={className('content')}>
        <Card
          title="Офисы продаж"
          className={className('card')}
          extra={<LoadOffices reloadOffices={reloadOffices} />}
        >
          <SalesOfficesTable
            dataSource={offices}
            onEditOffice={onEditOffice}
            loading={isFetching}
            onChange={setPagination}
            pagination={pagination}
          />
        </Card>
      </div>
      <OfficeModal
        isVisible={isVisible}
        onCloseModal={onCloseModal}
        selectedOfficeId={selectedOfficeId}
      />
    </div>
  );
};

export default SalesOfficesPage;
