/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'

import { Table } from 'antd'
import styled from 'styled-components'
import { isoDateSorter } from 'utils/helpers'

const columns = [
  {
    title: 'Дата создания',
    dataIndex: 'CreatedOn',
    key: 'CreatedOn',
    sorter: (item1, item2) => isoDateSorter(item1.CreatedOn, item2.CreatedOn),
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend']
  },
  {
    title: 'Анкета',
    dataIndex: 'QuestionaryName',
    key: 'QuestionaryName',
    sorter: (item1, item2) => item1.QuestionaryName.localeCompare(item2.QuestionaryName),
    sortDirections: ['descend', 'ascend']
  },
  {
    title: 'Автор',
    dataIndex: 'CreatedFIO',
    key: 'CreatedFIO'
  }
]

const pagination = { hideOnSinglePage: true }

export default function QuestionaryHistoryTable ({ dataSource, isLoading, onItemClick }) {
  QuestionaryHistoryTable.propTypes = {
    dataSource: PropTypes.array,
    isLoading: PropTypes.bool.isRequired,
    onItemClick: PropTypes.func.isRequired
  }

  return (
    <HistoryTable
      hideOnSinglePage
      showSorterTooltip={false}
      pagination={pagination}
      columns={columns}
      dataSource={dataSource}
      loading={isLoading}
      onRow={record => ({
        onClick: () => onItemClick(record.QuestionaryHistoryId)
      })}
    />
  )
}

const HistoryTable = styled(Table)`
  tr {
    cursor: pointer;
  }
  .ant-pagination.ant-table-pagination {
    margin: 16px;
  }
`
