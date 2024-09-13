import { FC, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Card } from 'antd';
import Common from '@t2crm/wfm-utils/lib/types/common';
import ResponseDictionaries from 'types/response/dictionaries';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import Toolbar from 'components/Toolbar';
import useToggleModal from '@t2crm/wfm-utils/lib/hooks/useToggleModal';
import { getCompanyGroups } from 'utils/api/dictionaries';
import CompanyGroupsFilters from './components/CompanyGroupsFilters';
import CompanyGroupsTable from './components/CompanyGroupsTable';
import CompanyGroupsModal from './components/CompanyGroupsModal';
import './styles.less';

type Props = {};

const className = cn('company-groups-page');

const CompanyGroupsPage: FC<Props> = () => {
  const [activeFilters, setActiveFilters] = useState<Common.KeyValue | undefined>(undefined);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const { isVisible, toggleModal } = useToggleModal();
  const client = useQueryClient();

  const companyGroups = useQuery<ResponseDictionaries.CompanyGroup[]>({
    queryKey: ['company-groups', activeFilters],
    queryFn: () => getCompanyGroups(activeFilters).then(({ data }) => data ?? []),
    initialData: [],
    enabled: !!activeFilters,
  });

  const updateCompanyGroupsList = () => {
    client.invalidateQueries(['company-groups', activeFilters]);
  };

  const onSelectCompanyGroup = (selectedId: number) => {
    setSelectedGroupId(selectedId);
    toggleModal();
  };

  const onCloseModal = () => {
    toggleModal();
    setSelectedGroupId(null);
  };

  return (
    <div className={className()}>
      <CompanyGroupsFilters updateActiveFilters={setActiveFilters} />

      <div className={className('grid')}>
        <Card
          className={className('card')}
          title="Группы компаний"
          extra={(
            <Toolbar
              buttons={[
                {
                  title: 'Добавить группу компаний',
                  onClick: toggleModal,
                  actionType: 'add',
                },
              ]}
            />
          )}
        >
          <CompanyGroupsTable
            dataSource={companyGroups.data ?? []}
            onSelectCompanyGroup={onSelectCompanyGroup}
            loading={companyGroups.isFetching}
          />
        </Card>
      </div>
      <CompanyGroupsModal
        selectedGroupId={selectedGroupId}
        isCompanyGroupsModalVisible={isVisible}
        onCloseModal={onCloseModal}
        updateCompanyGroupsList={updateCompanyGroupsList}
      />
    </div>
  );
};

export default CompanyGroupsPage;
