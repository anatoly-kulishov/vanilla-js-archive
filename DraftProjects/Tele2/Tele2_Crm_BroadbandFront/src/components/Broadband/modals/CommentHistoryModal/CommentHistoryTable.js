import React from 'react'
import { Table } from 'antd'
import { array, bool } from 'prop-types'

import { renderDateTime, sortByDate, sortByValue } from 'components/Broadband/helpers/table'

const columns = [
  { title: 'Комментарий', dataIndex: 'Comment', sorter: (a, b) => sortByValue(a?.Comment, b?.Comment) },
  { title: 'Автор', dataIndex: 'UserName', sorter: (a, b) => sortByValue(a?.UserName, b?.UserName) },
  {
    title: 'Дата и время изменения',
    dataIndex: 'CreatedOn',
    render: value => renderDateTime(value, true),
    sorter: (a, b) => sortByDate(a?.CreatedOn, b?.CreatedOn)
  }
]

const scroll = { y: '60vh' }

const propTypes = {
  data: array,
  isLoading: bool
}

const CommentHistoryTable = ({ data, isLoading }) => (
  <Table size='small' scroll={scroll} columns={columns} dataSource={data} loading={isLoading} pagination={false} />
)

CommentHistoryTable.propTypes = propTypes

export default CommentHistoryTable
