import React, { useMemo, useEffect, useCallback } from 'react'
import { Route, useLocation, useRouteMatch } from 'react-router'
import styled from 'styled-components'

import BroadbandTable from 'components/BroadbandTable'
import OrderView from './containers/OrderView'
import { getQueryParameters, setQueryParameters } from 'utils/helpers/queryParameters'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'

import Card from 'crmHostApp/components/Card'
import { prepareCloseSessionInfo, prepareCreateSessionParams, prepareSessionInfo } from './helpers/sessions'
import Shifts from 'components/Shifts'
import useShiftInit from 'components/Shifts/hooks/useShiftInit'
import { adminCloseSessionReason } from 'constants/sessions'
import { constructUrl } from 'helpers/sessions'
import { prepareFeedbackOrderData } from './helpers/order'
import useGetOrderListPagination from 'hooks/useGetOrderListPagination'
import withInitData from './hocs/withInitData'

function Broadband (props) {
  const { history, msisdn, user, openTariffConstructorModal, onReceiveOrder, isFeedbackModalVisible } = props

  const {
    order,
    orderState,
    orderStatusState,
    orderList,
    sessionsInfoState,
    getOrderList,
    createSession,
    closeSession,
    closeSessionState,
    formInitData
  } = useBroadbandContext()

  const { hasShifts } = useShiftInit()

  const { pagination, handleNextClick, handlePrevClick, handleChangePageSize } = useGetOrderListPagination()

  const { data: orderListData, isLoading: orderListLoading } = orderList
  const { userRights } = formInitData ?? {}

  const handleChangePagination = useCallback(
    (action, ...args) => {
      const additionalParams = { msisdn }
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
    [msisdn, handleNextClick, handlePrevClick, handleNextClick]
  )

  const match = useRouteMatch()
  const location = useLocation()
  const queryParams = getQueryParameters(location.search)
  const orderId = +queryParams?.orderId

  useEffect(() => {
    if (orderListData === null) {
      getOrderList({
        msisdn,
        takeRecordCount: pagination.pageSize,
        skipRecordCount: (pagination.current - 1) * pagination.pageSize,
        msisdnOrderList: true
      })
    }
  }, [msisdn, orderListData])

  const orderData = order.data
  // Send order data to host app (needed for feedback modal)
  useEffect(() => {
    if (isFeedbackModalVisible) {
      const feedbackOrderData = prepareFeedbackOrderData(orderData, orderState, orderStatusState)
      onReceiveOrder && onReceiveOrder(feedbackOrderData)
    }
  }, [orderState, onReceiveOrder, orderData, orderStatusState, isFeedbackModalVisible])

  const menu = useMemo(() => {
    const additionalMenu = [{ path: `${match.url}/journal`, text: 'Все заявки абонента' }]
    if (orderId) {
      additionalMenu.push({ path: `${match.url}/order`, text: 'Заявка' })
    } else {
      additionalMenu.push({ path: `${match.url}/create-order`, text: `Новая заявка` })
    }
    return additionalMenu
  }, [orderId])

  const handleMenuClick = useCallback(
    index => {
      if (menu[index].path.includes('/journal')) {
        getOrderList({
          msisdn: queryParams?.msisdn,
          takeRecordCount: pagination.pageSize,
          skipRecordCount: (pagination.current - 1) * pagination.pageSize,
          msisdnOrderList: true
        })
      }
    },
    [menu, queryParams]
  )

  const handleOpenOrder = useCallback(orderInfo => {
    const params = setQueryParameters(orderInfo).toString()
    history.push(`/card/rtc-broadband/order?${params}`)
  })

  const handleOpenNextOrder = useCallback(orderInfo => {
    const path = constructUrl('/card/rtc-broadband/order', orderInfo)
    open(path, '_self')
  }, [])

  const handleCreateSession = useCallback(() => {
    const params = prepareCreateSessionParams(orderState, orderStatusState)
    createSession(params)
  }, [orderState, orderStatusState])

  const handleCloseSession = useCallback(() => {
    const params = {
      orderId: orderState.OrderId,
      ...adminCloseSessionReason
    }
    closeSession(params)
  }, [orderState])

  const journalPath = `${match.url}/journal`
  const isJournalPage = journalPath === location.pathname

  const sessionData = sessionsInfoState.data
  const { isLoading } = closeSessionState
  const additional = useMemo(() => {
    const items = []
    if (!isJournalPage) {
      const { isBCOrderSessionAdmin, isReadLimitedBCOrder } = userRights

      const closeSessionInfo = prepareCloseSessionInfo(isBCOrderSessionAdmin, handleCloseSession, isLoading)
      if (closeSessionInfo && sessionData?.length > 0 && orderState?.OrderId) {
        items.push(closeSessionInfo)
      }
      const sessionInfo = prepareSessionInfo({
        sessionData,
        user,
        orderId: orderState?.OrderId,
        statusId: orderStatusState.statusId,
        onClick: handleCreateSession,
        isReadLimitedBCOrder
      })
      if (sessionInfo) {
        items.push(sessionInfo)
      }
    }
    return items
  }, [
    orderState,
    orderStatusState,
    sessionData,
    user,
    handleCreateSession,
    isJournalPage,
    handleCloseSession,
    isLoading,
    userRights
  ])

  return (
    <Card
      header='Заявка на подключение ШПД'
      menu={menu}
      additional={additional}
      isContentLoading={false}
      onMenuItemClick={handleMenuClick}
      content={
        <>
          <Route path={journalPath}>
            <BroadbandTable
              orders={orderListData?.Orders}
              isOrdersLoading={orderListLoading}
              handleOpenOrder={handleOpenOrder}
              pagination={pagination}
              handleChangePagination={handleChangePagination}
            />
          </Route>
          <Route path={`${match.url}/order`}>
            {hasShifts && (
              <>
                <Divider />
                <Wrapper>
                  <Title>Текущая смена</Title>
                  <Shifts
                    isEditable={false}
                    user={user}
                    history={history}
                    hasShifts={hasShifts}
                    onOpenOrder={handleOpenNextOrder}
                    orderId={orderId}
                  />
                </Wrapper>
                <Divider />
              </>
            )}
            <OrderView
              orderId={orderId}
              formInitData={formInitData}
              userRights={userRights}
              handleOpenOrder={handleOpenNextOrder}
              openTariffConstructorModal={openTariffConstructorModal}
            />
          </Route>
          <Route path={`${match.url}/create-order`}>
            <OrderView
              isCreating
              orderId={orderId}
              formInitData={formInitData}
              userRights={userRights}
              handleOpenOrder={handleOpenOrder}
              openTariffConstructorModal={openTariffConstructorModal}
            />
          </Route>
        </>
      }
    />
  )
}

export default withInitData(Broadband)

const Wrapper = styled.div`
  padding: 7px 21px;
  background-color: #fffffcb5;
`

const Divider = styled.div`
  margin: 12px 0;
  display: flex;
  clear: both;
  width: 100%;
  min-width: 100%;
  border-top: 10px solid rgba(0, 0, 0, 0.06);
`

const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: black;
`
