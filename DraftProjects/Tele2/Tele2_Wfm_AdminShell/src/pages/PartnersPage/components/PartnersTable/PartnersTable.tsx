import { FC, useMemo } from 'react';
import { Button, Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/lib/table';
import { EditOutlined } from '@ant-design/icons';
import EllipsisTooltip from 'components/EllipsisTooltip';
import ResponseDictionaries from 'types/response/dictionaries';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import { tablePaginationConfig } from 'constants/tableConstants';
import './styles.less';

const className = cn('partners-table');

interface Props extends TableProps<ResponseDictionaries.Partner> {
  onEditPartner: (selectedId: number) => void;
}

const PartnersTable: FC<Props> = ({
  dataSource,
  loading,
  onEditPartner,
}) => {
  const columns: ColumnsType<ResponseDictionaries.Partner> = useMemo(() => [
    {
      title: 'ИД партнера',
      dataIndex: 'id',
      key: 'id',
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'Группа компаний',
      dataIndex: 'companyGroup',
      key: 'companyGroup',
      width: '25%',
      ellipsis: true,
    },
    {
      title: 'Партнер',
      dataIndex: 'fullName',
      width: '25%',
      key: 'fullName',
      ellipsis: true,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      width: '15%',
      key: 'status',
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '15%',
      key: 'email',
      render: (_, { email }) => <EllipsisTooltip text={email} />,
    },
    {
      width: '5%',
      align: 'center',
      render: (_, { id }) => (
        <Button
          title="Редактировать"
          type="text"
          icon={<EditOutlined id="edit" size={40} />}
          onClick={() => onEditPartner(id)}
        />
      ),
    },
  ], [onEditPartner]);

  return (
    <div className={className()}>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={({ id }) => id}
        pagination={tablePaginationConfig}
      />
    </div>
  );
};

export default PartnersTable;
