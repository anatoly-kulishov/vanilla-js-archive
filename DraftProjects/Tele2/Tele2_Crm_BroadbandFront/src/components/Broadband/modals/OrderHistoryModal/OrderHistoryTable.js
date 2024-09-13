import { Table } from 'antd'
import { array, bool } from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { isEqual } from 'lodash-es'

import { renderDateTime, renderList, sortByLength, sortByValue, sortByDate } from 'components/Broadband/helpers/table'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { DEFAULT_PAGINATION_PARAMS } from 'components/Broadband/modals/OrderHistoryModal/OrderHistoryModal'

const columns = [
  {
    title: 'Дата и время изменения',
    dataIndex: 'CreatedOn',
    key: 'CreatedOn',
    sorter: (a, b) => sortByDate(a?.CreatedOn, b?.CreatedOn),
    render: (_, record) => renderDateTime(record?.CreatedOn)
  },
  {
    title: 'Пользователь',
    dataIndex: 'CreatedBy',
    key: 'CreatedBy',
    sorter: (a, b) => sortByLength(a?.CreatedBy, b?.CreatedBy)
  },
  {
    title: 'Состав заказа',
    dataIndex: 'ServiceList',
    key: 'ServiceList',
    render: (_, record) => renderList(record?.ServiceList, 'ServiceName')
  },
  {
    title: 'Номер сеанса изменения',
    dataIndex: 'OrderEditSessionId',
    key: 'OrderEditSessionId',
    sorter: (a, b) => sortByValue(a?.OrderEditSessionId, b?.OrderEditSessionId)
  },
  {
    title: 'Комментарий',
    dataIndex: 'Comment',
    key: 'Comment'
  }
]

const scroll = { y: '60vh' }

const OrderHistoryTable = ({ data, isLoading }) => {
  const { getOrderChangeHistory, orderState } = useBroadbandContext()

  const [pagination, setPagination] = useState({
    current: DEFAULT_PAGINATION_PARAMS.SKIP_RECORD_COUNT + 1,
    pageSize: DEFAULT_PAGINATION_PARAMS.TAKE_RECORD_COUNT
  })

  useEffect(() => {
    setPagination({ ...pagination, total: data?.length })
  }, [data])

  const handleChangePagination = useCallback(
    newPagination => {
      if (isEqual(pagination, newPagination)) {
        return
      }
      setPagination(newPagination)

      getOrderChangeHistory({
        OrderId: orderState.OrderId,
        SkipRecordCount: (newPagination.current - 1) * newPagination.pageSize,
        TakeRecordCount: newPagination.pageSize
      })
    },
    [pagination, orderState.OrderId]
  )

  return (
    <Table
      size='small'
      scroll={scroll}
      columns={columns}
      dataSource={data}
      loading={isLoading}
      pagination={pagination}
      onChange={handleChangePagination}
    />
  )
}

const propTypes = {
  data: array,
  isLoading: bool
}

OrderHistoryTable.propTypes = propTypes

export default OrderHistoryTable
