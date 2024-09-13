import React, { useEffect, useCallback, useState, useMemo } from 'react'
import moment from 'moment'
import { Form } from 'antd'
import { isNil } from 'lodash-es'

import BroadbandTable from 'components/BroadbandTable'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { setQueryParameters } from 'utils/helpers/queryParameters'
import JournalFilters from './components/JournalFilters'
import { useKeyPress } from './hooks/useKeyPress'

import Card from 'crmHostApp/components/Card'
import useGetOrderListPagination from 'hooks/useGetOrderListPagination'
import { getUserRights } from 'helpers/user'
import { OrderStatuses } from 'constants/orderStatuses'

export default function BroadbandJournal ({ user }) {
  const { orderList, getOrderList, getHandbooks, getMacroRegions, getRegions, getOrderHistory, getStatusReasons } =
    useBroadbandContext()

  const userRights = useMemo(() => getUserRights(user), [])
  const { isRtcLimitedBcOrder } = userRights

  const [form] = Form.useForm()

  const [selectedTimezone, setSelectedTimezone] = useState(3)
  const [showRegionTimezone, setShowRegionTimezone] = useState(false)

  const { pagination, handleNextClick, handlePrevClick, handleChangePageSize, handleChangePage } =
    useGetOrderListPagination()

  useEffect(() => {
    const initialStatusIds = isRtcLimitedBcOrder ? undefined : [OrderStatuses.New]

    form.setFieldsValue({ statusId: initialStatusIds })
    getOrderList({
      statusId: initialStatusIds,
      takeRecordCount: pagination.pageSize,
      skipRecordCount: (pagination.current - 1) * pagination.pageSize
    })
    getHandbooks()
    getMacroRegions()
    getRegions()
    getStatusReasons({ statusId: initialStatusIds })
  }, [isRtcLimitedBcOrder])

  const getOrderListParams = () => {
    const { expectedDate, ...rest } = form.getFieldValue()

    const params = {
      expectedDate: expectedDate ? moment.utc(expectedDate).format('YYYY-MM-DD') : null,
      ...rest
    }

    return params
  }

  const handleChangePagination = useCallback(
    (action, ...args) => {
      const additionalParams = getOrderListParams()

      switch (action) {
        case 'nextPage':
          handleNextClick(args, additionalParams)
          break
        case 'prevPage':
          handlePrevClick(args, additionalParams)
          break
        case 'pageSize':
          handleChangePageSize(args, additionalParams)
          break
        default:
          break
      }
    },
    [handleNextClick, handlePrevClick, handleChangePageSize]
  )

  const handleClear = useCallback(() => {
    form.resetFields()
  })

  const handleSearch = useCallback(async () => {
    const { CallDate, CallTime, IsRegionTimezone } = form.getFieldValue()

    let CallDateStart, CallDateEnd
    if (!isNil(CallTime) && CallTime[0]?.isValid() && CallTime[1]?.isValid()) {
      const [startTime, endTime] = CallTime
      CallDateStart = moment(CallDate?.startOf('day').add(startTime.hours(), 'h').add(startTime.minutes(), 'm'))
      CallDateEnd = moment(CallDate?.startOf('day').add(endTime.hours(), 'h').add(endTime.minutes(), 'm'))
    } else if (CallDate?.isValid()) {
      CallDateStart = moment(CallDate?.startOf('day'))
      CallDateEnd = moment(CallDate?.endOf('day'))
    }

    if (IsRegionTimezone) {
      CallDateStart?.utcOffset(selectedTimezone)
      CallDateEnd?.utcOffset(selectedTimezone)
    }

    const isSuccess = await getOrderList({
      ...getOrderListParams(),
      CallDateStart: CallDateStart?.toISOString(),
      CallDateEnd: CallDateEnd?.toISOString(),
      takeRecordCount: pagination.pageSize
    })
    if (isSuccess) {
      handleChangePage(1)
    }
  }, [form, getOrderList, selectedTimezone, pagination, handleChangePage])

  const handleEnterPress = useCallback(() => {
    handleSearch()
  }, [handleSearch])

  useKeyPress('Enter', handleEnterPress)

  const handleOpenOrder = useCallback(({ orderId, msisdn }) => {
    const newUrl = new URL(`${process.env.REACT_APP_SEARCH}/card/rtc-broadband/order`)
    newUrl.search = setQueryParameters({ orderId, msisdn: msisdn || null }).toString()
    open(newUrl.toString())
  })

  return (
    <Card
      header='Журнал заявок ШПД'
      menu={null}
      isContentLoading={false}
      content={
        <>
          <JournalFilters
            form={form}
            onClear={handleClear}
            handleSearch={handleSearch}
            setSelectedTimezone={setSelectedTimezone}
            showRegionTimezone={showRegionTimezone}
            setShowRegionTimezone={setShowRegionTimezone}
            isOrdersLoading={orderList.isLoading}
          />
          <BroadbandTable
            orders={orderList.data?.Orders}
            isOrdersLoading={orderList.isLoading}
            pagination={pagination}
            handleChangePagination={handleChangePagination}
            handleOpenOrder={handleOpenOrder}
            getOrderHistory={getOrderHistory}
            showRegionTimezone={showRegionTimezone}
          />
        </>
      }
    />
  )
}
