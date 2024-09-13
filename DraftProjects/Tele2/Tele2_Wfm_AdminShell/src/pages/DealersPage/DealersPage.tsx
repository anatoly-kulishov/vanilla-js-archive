import { FC, useCallback, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Card } from 'antd';
import Toolbar from 'components/Toolbar';
import useToggleModal from '@t2crm/wfm-utils/lib/hooks/useToggleModal';
import Common from '@t2crm/wfm-utils/lib/types/common';
import ResponseDictionaries from 'types/response/dictionaries';
import { getDealers } from 'utils/api/dictionaries';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import DealersFilters from './components/DealersFilters';
import DealersModal from './components/DealersModal';
import DealersTable from './components/DealersTable';
import './styles.less';

const className = cn('dealers-page');

const DealersPage: FC = () => {
  const [activeFilters, setActiveFilters] = useState<Common.KeyValue | undefined>(undefined);
  const [selectedDealerId, setSelectedDealerId] = useState<number | null>(null);
  const { isVisible, toggleModal } = useToggleModal();

  const client = useQueryClient();

  const dealers = useQuery<ResponseDictionaries.Dealer[]>({
    queryKey: ['dealers-list', activeFilters],
    queryFn: () => getDealers(activeFilters).then(({ data }) => data ?? []),
    initialData: [],
    enabled: !!activeFilters,
  });

  const updateDealersList = () => {
    client.invalidateQueries(['dealers-list', activeFilters]);
  };

  const onEditDealer = useCallback((dealerId) => {
    toggleModal();
    setSelectedDealerId(dealerId);
  }, [toggleModal]);

  const onCloseModal = useCallback(() => {
    toggleModal();
    setSelectedDealerId(null);
  }, [toggleModal]);

  return (
    <div className={className()}>
      <DealersFilters updateActiveFilters={setActiveFilters} />

      <div className={className('grid')}>
        <Card
          className={className('card')}
          title="Дилеры"
          extra={(
            <Toolbar
              buttons={[
                {
                  title: 'Добавить дилера',
                  onClick: toggleModal,
                  actionType: 'add',
                },
              ]}
            />
          )}
        >
          <DealersTable
            dataSource={dealers.data ?? []}
            onEditDealer={onEditDealer}
            loading={dealers.isFetching}
          />
        </Card>
      </div>
      <DealersModal
        isVisible={isVisible}
        selectedDealerId={selectedDealerId}
        updateDealersList={updateDealersList}
        onCloseModal={onCloseModal}
      />
    </div>
  );
};

export default DealersPage;
