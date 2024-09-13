import { FC, useCallback, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Card, Table, TablePaginationConfig } from 'antd';
import Toolbar from 'components/Toolbar';
import useToggleModal from '@t2crm/wfm-utils/lib/hooks/useToggleModal';
import Common from '@t2crm/wfm-utils/lib/types/common';
import { getPartners } from 'utils/api/partners';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import PartnersResponse from 'types/response/partners';
import { tablePaginationConfig } from 'constants/tableConstants';
import PartnersModal from './components/PartnersModal';
import PartnersFilters from './components/PartnersFilters';
import './styles.less';
import useColumns from './useColumns';

type Props = {};

const className = cn('partners-page');

const PartnersPage: FC<Props> = () => {
  const [selectedPartnerId, setSelectedPartnerId] = useState<number | null>(null);
  const [activeFilters, setActiveFilters] = useState<Common.KeyValue | undefined>(undefined);
  const { isVisible, toggleModal } = useToggleModal();
  const client = useQueryClient();

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    ...tablePaginationConfig,
    current: 1,
  });

  const partners = useQuery<PartnersResponse.Partner[]>({
    queryKey: ['partners-list', activeFilters, pagination.current],
    queryFn: () => getPartners({
      ...activeFilters,
      pageSize: pagination.pageSize,
      pageIndex: pagination.current,
    }).then(({ data }) => {
      setPagination({ ...pagination, total: data.total });
      return data.partners || [];
    }),
    initialData: [],
    enabled: !!activeFilters,
  });

  const updatePartnersList = useCallback(() => {
    client.invalidateQueries(['partners-list', activeFilters]);
  }, [activeFilters, client]);

  const onCloseModal = useCallback(() => {
    toggleModal();
    setSelectedPartnerId(null);
  }, [toggleModal]);

  const onEditPartner = useCallback((partnerId: number) => {
    toggleModal();
    setSelectedPartnerId(partnerId);
  }, [toggleModal]);

  const columns = useColumns({ onEditPartner });

  return (
    <div className={className()}>
      <PartnersFilters onFiltersChange={setActiveFilters} />
      <div className={className('grid')}>
        <Card
          className={className('card')}
          title="Партнеры"
          extra={(
            <Toolbar
              buttons={[
                {
                  title: 'Добавить партнера',
                  onClick: toggleModal,
                  actionType: 'add',
                },
              ]}
            />
            )}
        >
          <Table
            className={className('partners-table')}
            dataSource={partners.data ?? []}
            columns={columns}
            loading={partners?.isFetching}
            onChange={setPagination}
            pagination={pagination}
          />
        </Card>
      </div>
      <PartnersModal
        selectedPartnerId={selectedPartnerId}
        isPartnersModalVisible={isVisible}
        onCloseModal={onCloseModal}
        updatePartnersList={updatePartnersList}
      />
    </div>
  );
};

export default PartnersPage;
