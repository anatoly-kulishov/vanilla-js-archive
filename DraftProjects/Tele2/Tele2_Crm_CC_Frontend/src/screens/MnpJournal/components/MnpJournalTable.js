/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { Table, Tag } from 'antd'
import { SearchOutlined, FireOutlined } from '@ant-design/icons'
import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import * as moment from 'moment'
import { getMnpStatusColor } from 'screens/CommonInformation/helpers/mnpStatusColor'
import { arrayOf, bool, func, object } from 'prop-types'
import { mnpOrderType } from 'constants/propTypes/mnpOrderPropType'
import { formatMsisdn, formatNumberWithSeparator, isoDateSorter, numSorter, stringSorter } from 'utils/helpers'

const formatDate = date => moment(date).format('DD.MM.YYYY hh:mm')
const getRowClassName = record => {
  const { ValidationStatus } = record
  let rowClassName
  switch (ValidationStatus) {
    case 2:
      rowClassName = 'row_yellow'
      break
    default:
  }

  return rowClassName
}

const MnpJournalTable = props => {
  const { data, onCellClick, onDoubleClickRow, pagination, onChangePagination, loading } = props

  const onCell = record => {
    const value = Object.values(record)

    return {
      onClick: async () => {
        await navigator.clipboard.writeText(value)
        onCellClick(record)
      }
    }
  }

  const columns = useMemo(
    () => [
      {
        title: 'MSISDN',
        dataIndex: 'Msisdn',
        onCell: ({ Msisdn }) => onCell({ Msisdn }),
        render: formatMsisdn,
        sorter: (cur, next) => stringSorter(cur.Msisdn, next.Msisdn)
      },
      {
        title: 'Номер заявки',
        dataIndex: 'OrderId',
        onCell: ({ OrderId }) => onCell({ OrderId }),
        render: formatNumberWithSeparator,
        sorter: (cur, next) => numSorter(cur.OrderId, next.OrderId)
      },
      {
        title: 'Регион',
        dataIndex: 'BranchName',
        onCell: ({ BranchName }) => onCell({ RegionName: BranchName }),
        sorter: (cur, next) => stringSorter(cur.BranchName, next.BranchName)
      },
      {
        title: 'Оператор-реципиент',
        dataIndex: 'OperatorRecipient',
        onCell: ({ OperatorRecipient }) => onCell({ OperatorRecipient }),
        sorter: (cur, next) => stringSorter(cur.OperatorRecipient, next.OperatorRecipient)
      },
      {
        title: 'Дата заявки',
        dataIndex: 'OrderDate',
        render: formatDate,
        onCell: ({ OrderDate }) => onCell({ StartDate: moment(OrderDate) }),
        sorter: (cur, next) => isoDateSorter(cur.OrderDate, next.OrderDate)
      },
      {
        title: 'Дата портации',
        dataIndex: 'PortingDate',
        render: formatDate,
        onCell: ({ PortingDate }) => onCell({ EndDate: moment(PortingDate) }),
        sorter: (cur, next) => isoDateSorter(cur.PortingDate, next.PortingDate)
      },
      {
        title: 'Статус',
        dataIndex: 'OrderStatus',
        render: (value, { OrderStatusCode }) => <Tag color={getMnpStatusColor(OrderStatusCode)}>{value}</Tag>,
        sorter: (cur, next) => stringSorter(cur.OrderStatus, next.OrderStatus)
      },
      {
        dataIndex: 'ValidationStatus',
        render: value => {
          switch (value) {
            case 1:
              return <SearchOutlined />
            case 2:
              return <FireOutlined />
            default:
              return null
          }
        }
      }
    ],
    [onCellClick]
  )

  const handleOnRow = useCallback(record => ({ onDoubleClick: () => onDoubleClickRow(record) }), [])

  return (
    <StyledTable
      rowClassName={getRowClassName}
      onRow={handleOnRow}
      columns={columns}
      dataSource={data}
      rowKey='OrderId'
      pagination={{
        pageSizeOptions: [10, 20, 50],
        ...pagination
      }}
      onChange={onChangePagination}
      showSorterTooltip={false}
      loading={loading}
    />
  )
}

export default MnpJournalTable

MnpJournalTable.propTypes = {
  data: arrayOf(mnpOrderType),
  onCellClick: func,
  onDoubleClickRow: func,
  pagination: object,
  loading: bool,
  onChangePagination: func
}

const StyledTable = styled(Table)`
  .row {
    &_yellow {
      background: rgba(255, 222, 3, 0.2);
    }
  }
`
