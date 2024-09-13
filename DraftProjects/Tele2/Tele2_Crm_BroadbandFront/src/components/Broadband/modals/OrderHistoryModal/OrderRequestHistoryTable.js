import { Table } from 'antd'
import { array, bool } from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { isEqual } from 'lodash-es'

import {
  renderDateTime,
  renderList,
  renderStatusTag,
  sortByDate,
  sortByLength,
  sortByValue
} from 'components/Broadband/helpers/table'
import { DEFAULT_PAGINATION_PARAMS } from 'components/Broadband/modals/OrderHistoryModal/OrderHistoryModal'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'

const columns = [
  {
    title: 'Номер сеанса',
    dataIndex: 'sessionId',
    key: 'sessionId',
    sorter: (a, b) => sortByValue(a?.sessionId, b?.sessionId)
  },
  {
    title: 'Номер заявки на изменение ЛКД',
    dataIndex: 'upsaleOrderId',
    key: 'upsaleOrderId',
    sorter: (a, b) => sortByValue(a?.upsaleOrderId, b?.upsaleOrderId)
  },
  {
    title: 'Статус',
    dataIndex: 'statusName',
    key: 'statusName',
    ellipsis: true,
    sorter: (a, b) => sortByLength(a?.statusName, b?.statusName),
    render: (_, record) => renderStatusTag(record?.statusName)
  },
  {
    title: 'Комментарий',
    dataIndex: 'statusComment',
    key: 'statusComment',
    sorter: (a, b) => sortByLength(a?.statusComment, b?.statusComment)
  },
  {
    title: 'Создано',
    dataIndex: 'createdOn',
    key: 'createdOn',
    sorter: (a, b) => sortByDate(a?.createdOn, b?.createdOn),
    render: (_, record) => renderDateTime(record.createdOn)
  },
  {
    title: 'Пользователь',
    dataIndex: 'createdBy',
    key: 'createdBy',
    sorter: (a, b) => sortByLength(a?.createdBy, b?.createdBy)
  },
  {
    title: 'Начальный заказ',
    dataIndex: 'initialAgreement',
    key: 'initialAgreement',
    render: (_, record) => renderList(record.initialAgreement, 'serviceName')
  },
  {
    title: 'Выбранный заказ',
    dataIndex: 'newAgreement',
    key: 'newAgreement',
    render: (_, record) => renderList(record.newAgreement, 'serviceName')
  }
]

const scroll = { y: '60vh' }

const OrderRequestHistoryTable = ({ data, isLoading }) => {
  const { getOrderEditSessionHistory, orderState } = useBroadbandContext()
  const { IsOnlime } = orderState

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

      getOrderEditSessionHistory({
        OrderId: orderState.OrderId,
        SkipRecordCount: (newPagination.current - 1) * newPagination.pageSize,
        TakeRecordCount: newPagination.pageSize
      })
    },
    [pagination, orderState.OrderId]
  )

  if (!IsOnlime) {
    delete columns[1]
  }

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

OrderRequestHistoryTable.propTypes = propTypes

export default OrderRequestHistoryTable
