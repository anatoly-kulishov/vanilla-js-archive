import { FC, useMemo } from 'react';
import { Button, Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/lib/table';
import { EditOutlined } from '@ant-design/icons';
import EllipsisTooltip from 'components/EllipsisTooltip';
import ResponseDictionaries from 'types/response/dictionaries';
import { tablePaginationConfig } from 'constants/tableConstants';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import './styles.less';

interface Props extends TableProps<ResponseDictionaries.Dealer> {
  onEditDealer: (dealerId: number) => void;
}

const className = cn('dealers-table');

const DealersTable: FC<Props> = ({
  onEditDealer,
  dataSource,
  loading,
}) => {
  const columns: ColumnsType<ResponseDictionaries.Dealer> = useMemo(() => [
    {
      title: 'ИД организации партнера',
      dataIndex: 'partnerId',
      key: 'partnerId',
      width: '15%',
    },
    {
      title: 'ИД дилера',
      dataIndex: 'id',
      key: 'id',
      width: '15%',
    },
    {
      title: 'Дилер',
      dataIndex: 'fullName',
      key: 'fullName',
      width: '30%',
      ellipsis: true,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%',
      key: 'email',
      render: (_, { email = '' }) => <EllipsisTooltip text={email} />,
    },
    {
      width: '5%',
      align: 'center',
      render: (_, { id }) => (
        <Button
          title="Редактировать"
          type="text"
          icon={<EditOutlined id="edit" size={40} />}
          onClick={() => onEditDealer(id)}
        />
      ),
    },
  ], [onEditDealer]);

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

export default DealersTable;
