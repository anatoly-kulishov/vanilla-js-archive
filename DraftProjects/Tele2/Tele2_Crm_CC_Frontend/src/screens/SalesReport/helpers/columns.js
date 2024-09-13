import React from 'react'
import { Space, Typography } from 'antd'
import * as moment from 'moment'

const { Text } = Typography

const renderDate = dateStr => {
  if (dateStr && moment(dateStr).isValid) {
    return (
      <Space direction='vertical'>
        <Text>{moment(dateStr).format('DD.MM.YYYY')}</Text>
        <Text>{moment(dateStr).format('HH:mm')}</Text>
      </Space>
    )
  }
}

const sortDate = (a, b) => {
  return moment(a.serviceDate).valueOf() - moment(b.serviceDate).valueOf()
}

const renderMsisdn = msisdn => {
  if (msisdn) {
    const mask = '+$1 $2 $3-$4-$5'
    const formatedMsisdn = msisdn.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, mask)
    return <Text strong>{formatedMsisdn}</Text>
  }
}

export const columns = [
  {
    key: 'msisdn',
    title: 'Номер телефона',
    dataIndex: 'msisdn',
    render: renderMsisdn
  },
  {
    key: 'serviceDate',
    title: 'Дата продажи',
    dataIndex: 'serviceDate',
    render: renderDate,
    defaultSortOrder: 'descend',
    sorter: sortDate,
    showSorterTooltip: false
  },
  {
    key: 'tariffName',
    title: 'Тариф',
    dataIndex: 'tariffName',
    render: value => <Text strong>{value}</Text>
  },
  {
    key: 'saleTypeName',
    title: 'Тип',
    dataIndex: 'saleTypeName'
  },
  {
    key: 'mnpMsisdn',
    title: 'Переносимый номер',
    dataIndex: 'mnpMsisdn',
    render: renderMsisdn
  },
  {
    key: 'mnpStatus',
    title: 'Статус переноса',
    dataIndex: 'mnpStatus'
  },
  {
    key: 'mnpDetails',
    title: 'Детали',
    dataIndex: 'mnpDetails',
    render: value => <Text strong>{value}</Text>
  },
  {
    key: 'mnpPortingDate',
    title: 'Плановая дата переноса',
    dataIndex: 'mnpPortingDate',
    render: renderDate
  }
]
