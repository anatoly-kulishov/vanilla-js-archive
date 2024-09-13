import { FC, useMemo } from 'react';
import { Button, Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/lib/table';
import { EditOutlined } from '@ant-design/icons';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import ResponseDictionaries from 'types/response/dictionaries';
import { tablePaginationConfig } from 'constants/tableConstants';
import './styles.less';

const className = cn('company-groups-table');

interface Props extends TableProps<ResponseDictionaries.CompanyGroup> {
  onSelectCompanyGroup: (selectedId: number) => void;
}

const CompanyGroupsTable: FC<Props> = ({
  dataSource,
  onSelectCompanyGroup,
  loading,
}) => {
  const columns: ColumnsType<ResponseDictionaries.CompanyGroup> = useMemo(() => [
    {
      title: 'ИД группы компании',
      dataIndex: 'companyGroupId',
      key: 'companyGroupId',
      width: '20%',
      sorter: (a, b) => a.companyGroupId - b.companyGroupId,
    },
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
      width: '35%',
    },
    {
      title: 'Полное наименование',
      dataIndex: 'fullName',
      width: '40%',
      key: 'fullName',
    },
    {
      width: '5%',
      align: 'center',
      render: (_, { companyGroupId }) => (
        <Button
          title="Редактировать группу компаний"
          type="text"
          icon={<EditOutlined id="edit" size={40} />}
          onClick={() => onSelectCompanyGroup(companyGroupId)}
        />
      ),
    },
  ], [onSelectCompanyGroup]);

  return (
    <div className={className()}>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={({ companyGroupId }) => companyGroupId}
        pagination={tablePaginationConfig}
      />
    </div>
  );
};

export default CompanyGroupsTable;
