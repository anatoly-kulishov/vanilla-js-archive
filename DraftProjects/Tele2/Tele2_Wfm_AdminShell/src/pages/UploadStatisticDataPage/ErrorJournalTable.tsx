import { FC } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { tablePaginationConfig } from 'constants/tableConstants';
import Uploads from 'types/response/uploads';
import dayjs from 'dayjs';

const ErrorJournalTable: FC<TableProps<Uploads.StatisticDataError>> = ({
  dataSource,
  loading,
}) => {
  const columns = [
    {
      title: 'Дата',
      dataIndex: 'operDate',
      key: 'operDate',
      render: ((_: any, { operDate }: Uploads.StatisticDataError) => (
        operDate ? dayjs(operDate).format('DD.MM.YYYY') : '')
      ),
    },
    {
      title: 'ID офиса',
      dataIndex: 'officeId',
      key: 'officeId',
    },
    {
      title: 'Параметр',
      dataIndex: 'parameter',
      key: 'parameter',
    },
    {
      title: 'Ошибка',
      dataIndex: 'errorMessage',
      key: 'errorMessage',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey={({ officeId }) => officeId}
      pagination={tablePaginationConfig}
    />
  );
};

export default ErrorJournalTable;
