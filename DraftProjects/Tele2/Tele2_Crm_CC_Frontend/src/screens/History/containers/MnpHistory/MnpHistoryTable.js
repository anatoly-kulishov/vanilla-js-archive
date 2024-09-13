import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Table } from 'antd'
import styled from 'styled-components'
import { isoDateSorter, numSorter, stringSorter } from 'utils/helpers'

const formatIsoDate = (value) => value ? moment.utc(value).local().format('DD.MM.YYYY[\n]HH:mm') : ''

const columns = [
  {
    title: 'Направление',
    dataIndex: 'MnpDirection',
    key: 'MnpDirection',
    sorter: (prev, next) => stringSorter(prev.MnpDirection, next.MnpDirection)
  },
  {
    title: 'Дата',
    dataIndex: 'CreatedOn',
    key: 'CreatedOn',
    width: '137px',
    sorter: (prev, next) => isoDateSorter(prev.CreatedOn, next.CreatedOn),
    defaultSortOrder: 'descend',
    render: value => formatIsoDate(value)
  },
  {
    title: 'Статус завершения обслуживания',
    dataIndex: 'ProtocolStatusName',
    key: 'ProtocolStatusName',
    sorter: (prev, next) => stringSorter(prev.ProtocolStatusName, next.ProtocolStatusName)
  },
  {
    title: '№ заявления',
    dataIndex: 'OrderId',
    key: 'OrderId',
    sorter: (prev, next) => numSorter(prev.OrderId, next.OrderId)
  },
  {
    title: '№ анкеты',
    dataIndex: 'DocumentId',
    key: 'DocumentId',
    sorter: (prev, next) => numSorter(prev.DocumentId, next.DocumentId)
  },
  {
    title: 'Линия обслуживания',
    dataIndex: 'LineTypeName',
    key: 'LineTypeTypeName',
    sorter: (prev, next) => stringSorter(prev.LineType, next.LineType)
  },
  {
    title: 'Автор',
    dataIndex: 'UserName',
    key: 'UserName',
    sorter: (prev, next) => stringSorter(prev.UserName, next.UserName)
  }
]

export default function MnpHistoryTable ({ dataSource, isLoading, onItemClick }) {
  MnpHistoryTable.propTypes = {
    dataSource: PropTypes.array,
    isLoading: PropTypes.bool.isRequired,
    onItemClick: PropTypes.func.isRequired
  }

  return (
    <HistoryTable
      hideOnSinglePage
      showSorterTooltip={false}
      pagination={false}
      columns={columns}
      dataSource={dataSource}
      loading={isLoading}
      scroll={{ y: 500 }}
      onRow={useCallback(record => ({
        onClick: () => onItemClick(record)
      }))}
    />
  )
}

const HistoryTable = styled(Table)`
  tr {
    cursor: pointer;
  }
  .ant-table-row.ant-table-row-level-0 td{
    padding: 12px;
  }
  .ant-pagination.ant-table-pagination {
    margin: 16px;
  }
`
