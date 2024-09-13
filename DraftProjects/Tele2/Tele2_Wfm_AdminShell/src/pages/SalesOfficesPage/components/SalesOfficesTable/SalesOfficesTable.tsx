import { FC } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import OfficesResponse from 'types/response/offices';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import './styles.less';
import useColumns from 'pages/SalesOfficesPage/hooks/useColumns';

interface Props extends TableProps<OfficesResponse.OfficeByIdInfo> {
  onEditOffice: (id: number) => void;
}

const className = cn('offices-table');

const SalesOfficesTable: FC<Props> = ({
  onEditOffice,
  dataSource,
  loading,
  onChange,
  pagination,
}) => {
  const columns = useColumns({ onEditOffice });

  return (
    <Table
      className={className()}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey={({ officeId }) => officeId}
      onRow={(record) => ({
        onDoubleClick: () => onEditOffice(record.officeId),
      })}
      onChange={onChange}
      pagination={pagination}
    />
  );
};

export default SalesOfficesTable;
