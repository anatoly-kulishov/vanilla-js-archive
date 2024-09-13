import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import moment from 'moment'

const columns = [
  {
    title: 'Статус',
    dataIndex: 'StatusName',
    key: 'StatusName'
  },
  {
    title: 'Дата',
    dataIndex: 'Date',
    key: 'Date',
    render: (item) => {
      let date = item && moment.utc(item)
      date = date?.isValid() && date.utcOffset(180)
      return date?.format('DD.MM.YYYY HH:mm')
    }
  },
  {
    title: 'Операция',
    dataIndex: 'OperationName',
    key: 'OperationName'
  },
  {
    title: 'Причина',
    dataIndex: 'ReasonName',
    key: 'ReasonName'
  },
  {
    title: 'Система',
    dataIndex: 'SystemName',
    key: 'SystemName'
  },
  {
    title: 'Комментарии',
    dataIndex: 'Comment',
    key: 'Comment'
  },
  {
    title: 'Автор',
    dataIndex: 'Author',
    key: 'Author'
  }
]

const scroll = { y: '60vh' }

export function HistoryTable (props) {
  const {
    // Parent
    history
  } = props

  return (
    <Table
      columns={columns}
      dataSource={history}
      pagination={false}
      scroll={scroll}
    />
  )
}

HistoryTable.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object)
}
