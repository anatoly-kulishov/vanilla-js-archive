import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Table, Tooltip, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import moment from 'moment'

import { getStatusColor, renderCallDateTime, renderCreatedTime } from 'utils/helpers/broadbandTable'
import { HistoryModal } from './components/HistoryModal'
import { stringSorter, numSorter, isoDateSorter, formatMsisdn } from 'crmHostApp/utils/helpers'
import { useBroadbandContext } from '../../context/hooks/useBroadbandContext'
import LitePagination from 'components/LitePagination/LitePagination'
import { getUpsaleStatusColor } from 'components/Broadband/helpers/broadband'

function callDateTimeSorter (currentDateTime, nextDateTime) {
  const currentStart = currentDateTime?.Start && moment.utc(currentDateTime?.Start)
  const nextStart = nextDateTime?.Start && moment.utc(nextDateTime?.Start)

  if (currentStart === nextStart || currentStart?.isSame(nextStart)) {
    return 0
  } else if (currentStart?.isBefore(nextStart) || !currentStart) {
    return -1
  } else if (currentStart?.isAfter(nextStart) || !nextStart) {
    return 1
  }

  return 0
}

export function BroadbandTable (props) {
  const { orders, handleOpenOrder, showRegionTimezone, pagination, handleChangePagination, isOrdersLoading } = props

  const { orderHistory, getOrderHistory } = useBroadbandContext()

  const [historyOrderId, setHistoryOrderId] = useState(null)
  const [isHistoryVisible, setHistoryVisibility] = useState(false)

  const handleOnRow = useCallback(record => ({
    onDoubleClick: () => {
      handleOpenOrder({ orderId: record.OrderId, msisdn: record.Msisdn })
    }
  }))

  // eslint-disable-next-line id-length
  const scroll = useMemo(() => ({ x: true }))

  const handleHistoryButton = useCallback(
    orderId => () => {
      getOrderHistory({ OrderId: orderId })
      setHistoryOrderId(orderId)
      setHistoryVisibility(true)
    },
    [getOrderHistory, setHistoryVisibility]
  )

  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'IsMnp',
        key: 'IsMnp',
        render: item =>
          item && (
            <Tooltip title='MNP'>
              <Dot color='red' />
            </Tooltip>
          )
      },
      {
        title: 'Номер заявки',
        dataIndex: 'OrderId',
        key: 'OrderId',
        sorter: (cur, next) => numSorter(cur.OrderId, next.OrderId)
      },
      {
        title: 'Регион',
        dataIndex: 'OrderRegionName',
        key: 'OrderRegionName',
        sorter: (cur, next) => numSorter(cur.OrderRegionName, next.OrderRegionName)
      },
      {
        title: 'Адрес',
        dataIndex: 'ShortAddress',
        key: 'ShortAddress',
        sorter: (cur, next) => stringSorter(cur.ShortAddress, next.ShortAddress)
      },
      {
        title: showRegionTimezone ? 'Дата и время звонка (регион заявки)' : 'Дата и время звонка',
        key: 'CallDateTime',
        width: 200,
        sorter: (cur, next) => callDateTimeSorter(cur?.CallDateTime, next?.CallDateTime),
        render: (__, record) =>
          renderCallDateTime(record?.CallDateStart, record?.CallDateEnd, record?.TimeZone, showRegionTimezone)
      },
      {
        title: 'Контактный номер',
        dataIndex: 'ContactPhone',
        key: 'ContactPhone',
        width: 150,
        sorter: (cur, next) => stringSorter(cur.ContactPhone, next.ContactPhone),
        render: value => formatMsisdn(value) ?? value
      },
      {
        title: 'Обращение',
        dataIndex: 'NickName',
        key: 'NickName',
        width: 200,
        sorter: (cur, next) => stringSorter(cur.NickName, next.NickName)
      },
      {
        title: 'Скорость ШПД',
        dataIndex: 'BcSpeedValue',
        key: 'BcSpeedValue',
        sorter: (cur, next) => numSorter(cur.BcSpeedValue, next.BcSpeedValue)
      },
      {
        title: 'Статус заявки',
        dataIndex: 'StatusName',
        key: 'StatusName',
        render: (item, row) => {
          const color = getStatusColor(row.StatusId)
          return <StyledTag color={color}>{item}</StyledTag>
        },
        sorter: (cur, next) => numSorter(cur.StatusId, next.StatusId)
      },
      {
        title: 'Заказ с POC',
        dataIndex: 'IsPoc',
        key: 'IsPoc',
        render: item => {
          switch (item) {
            case true:
              return 'Да'
            case false:
              return 'Нет'
            default:
              return null
          }
        }
      },
      {
        title: 'Статус изменения заказа',
        dataIndex: 'UpsaleOrderStatusName',
        key: 'UpsaleOrderStatusName',
        render: (item, row) => {
          if (item) {
            const color = getUpsaleStatusColor(row.UpsaleOrderStatusId)
            return <StyledTag color={color}>{item}</StyledTag>
          }
        },
        sorter: (cur, next) => numSorter(cur.UpsaleOrderStatusId, next.UpsaleOrderStatusId)
      },
      {
        title: 'История',
        key: 'OrderHistory',
        render: item => (
          <IconWrapper>
            <PlusOutlined onClick={handleHistoryButton(item?.OrderId)} />
          </IconWrapper>
        )
      },
      {
        title: 'Система',
        dataIndex: 'SystemName',
        key: 'SystemName',
        sorter: (cur, next) => numSorter(cur.SystemId, next.SystemId)
      },
      {
        title: showRegionTimezone ? 'Создано (регион заявки)' : 'Создано',
        dataIndex: 'CreatedOn',
        key: 'CreatedOn',
        width: 150,
        render: (dateText, record) => renderCreatedTime(dateText, record?.TimeZone, showRegionTimezone),
        sorter: (cur, next) => isoDateSorter(cur.CreatedOn, next.CreatedOn)
      },
      {
        title: 'Номер заявки CRM РТК',
        dataIndex: 'CrmOrderId',
        key: 'CrmOrderId',
        sorter: (cur, next) => numSorter(cur.CrmOrderId, next.CrmOrderId)
      }
    ]
  }, [handleHistoryButton, showRegionTimezone])

  return (
    <>
      <HistoryModal
        orderId={historyOrderId}
        isVisible={isHistoryVisible}
        history={orderHistory}
        setVisibility={setHistoryVisibility}
      />
      <StyledTable
        loading={isOrdersLoading}
        columns={columns}
        dataSource={orders}
        scroll={scroll}
        onRow={handleOnRow}
        rowKey='OrderId'
        size='middle'
        pagination={false}
        showSorterTooltip={false}
      />
      <LitePagination
        dataSource={orders}
        pagination={pagination}
        onChangePagination={handleChangePagination}
        isLoading={isOrdersLoading}
      />
    </>
  )
}

BroadbandTable.propTypes = {
  orders: PropTypes.array,
  pagination: PropTypes.shape({
    current: PropTypes.number,
    pageSize: PropTypes.number
  }),
  handleChangePagination: PropTypes.func,
  handleOpenOrder: PropTypes.func.isRequired,
  showRegionTimezone: PropTypes.bool
}

const StyledTable = styled(Table)`
  .ant-pagination {
    margin-right: 20px;
  }
`

const StyledTag = styled(Tag)`
  margin: 0;
`

const Dot = styled.span`
  margin-left: 10px;
  height: 10px;
  width: 10px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  display: inline-block;
`

const IconWrapper = styled.div`
  padding-left: 16px;
`
