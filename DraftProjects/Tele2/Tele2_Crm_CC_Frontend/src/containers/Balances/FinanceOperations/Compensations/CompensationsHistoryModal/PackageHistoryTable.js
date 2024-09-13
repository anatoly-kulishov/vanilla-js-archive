/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Table } from 'antd'
import { formatDate } from 'screens/Finance/helpers/format'
import { stringSorter, isoDateSorter } from 'utils/helpers'
import { isActiveStatus } from 'constants/compensations'

const PackageHistoryTable = ({ paydServiceHistory }) => {
  PackageHistoryTable.propTypes = {
    paydServiceHistory: PropTypes.arrayOf()
  }

  const getRowClassname = record => {
    if (record.StatusName === isActiveStatus) {
      return 'green-row'
    } else {
      return 'red-row'
    }
  }

  const columns = [
    {
      title: 'Пакет',
      dataIndex: 'ServiceName',
      key: 'ServiceName',
      width: '25%',
      sorter: (cur, next) => stringSorter(cur.ServiceName, next.ServiceName),
      render: value => <Cell title={value}>{value}</Cell>
    },
    {
      title: 'Причина',
      dataIndex: 'PaydReasonName',
      key: 'PaydReasonName',
      width: '35%',
      sorter: (cur, next) => stringSorter(cur.PaydReasonName, next.PaydReasonName),
      render: value => <Cell title={value}>{value}</Cell>
    },
    {
      title: 'Дата',
      dataIndex: 'CreateDate',
      key: 'CreateDate',
      width: '15%',
      sorter: (cur, next) => isoDateSorter(cur.CreateDate, next.CreateDate),
      render: creationDate => (<Cell title={creationDate ? formatDate(creationDate) : ''}>
        {creationDate ? formatDate(creationDate) : ''}
      </Cell>)
    },
    {
      title: 'Статус',
      dataIndex: 'StatusName',
      key: 'StatusName',
      width: '15%',
      sorter: (cur, next) => stringSorter(cur.StatusName, next.StatusName),
      render: value => <Cell title={value}>{value}</Cell>
    }
  ]

  return (
    <StyledTable
      columns={columns}
      scroll={{ y: 400 }} // eslint-disable-line
      dataSource={paydServiceHistory}
      pagination={false}
      showSorterTooltip={false}
      rowClassName={record => getRowClassname(record)}
      bordered
      size='small'
    />
  )
}

const StyledTable = styled(Table)`
  .ant-table-row.ant-table-row-level-0.red-row {
    background: rgba(245, 34, 45, 0.15);
  }
  .ant-table-row.ant-table-row-level-0.green-row {
    background: rgba(82, 196, 26, 0.2);
  }
`

const Cell = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export default PackageHistoryTable
