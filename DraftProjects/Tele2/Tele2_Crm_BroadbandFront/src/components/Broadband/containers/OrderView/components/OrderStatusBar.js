import React, { useMemo, useState, useCallback } from 'react'
import { bool, func } from 'prop-types'
import styled from 'styled-components'
import { Tag, Button, Affix, Alert } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import {
  getStatusColor,
  formatOrderPrice,
  getUpsaleStatusColor,
  getReasonNameColor
} from 'components/Broadband/helpers/broadband'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import OrderServiceInfoForm from './OrderServiceInfoForm'
import OrderRtcInfo from './OrderRtcInfo'
import { HistoryModal } from 'components/BroadbandTable/components/HistoryModal'
import { OrderStatuses } from 'constants/orderStatuses'

const topOffset = 110

export default function OrderStatusBar (props) {
  const { isPersonalDataAvailable, changePersonalDataVisibility, areFormControlsEnabled, areFormActionsEnabled } = props

  const {
    order,
    orderState,
    orderStatusState,
    prices,
    callDate,
    perform,
    orderHistory,
    isCreating,
    changeTariffModalVisibility,
    formInitData,
    orderReasonState
  } = useBroadbandContext()

  const { statusId, statusName } = orderStatusState

  const {
    UpsaleOrderStatusId: upsaleOrderStatusId,
    UpsaleOrderStatusName: upsaleOrderStatusName,
    OrderId: orderId
  } = order.data ?? {}

  const { reasonName, reasonId } = orderReasonState ?? {}

  const [isOrderServiceInfoVisible, changeOrderServiceInfoVisibility] = useState(false)
  const [isOrderRtcInfoVisible, changeOrderRtcInfoVisibility] = useState(false)
  const [isHistoryVisible, changeHistoryVisibility] = useState(false)

  const isRelocationAvailable = useMemo(() => {
    return formInitData?.userRights.isRelocationCheckbox
  }, [formInitData])

  const isTariffInfoAvailable = useMemo(() => {
    // return !isCreating && !!order?.Agreement
    return !formInitData?.userRights.isReadLimitedBCOrder
  }, [formInitData])

  const isServiceInfoAvailable = useMemo(() => {
    // TODO: A lot of params, including permissions
    return true
  }, [])

  const isRtcInfoAvailable = useMemo(() => {
    // TODO: A lot of params, including permissions
    return !isCreating
  }, [isCreating])

  const orderStateColor = useMemo(() => {
    return getStatusColor(statusId)
  }, [statusId])

  const handleTariff = useCallback(() => {
    changeTariffModalVisibility(true)
  }, [changeTariffModalVisibility])

  const handleServiceInfo = useCallback(() => {
    changeOrderServiceInfoVisibility(!isOrderServiceInfoVisible)
  }, [isOrderServiceInfoVisible])

  const handleRtcInfo = useCallback(() => {
    changeOrderRtcInfoVisibility(!isOrderRtcInfoVisible)
  }, [isOrderRtcInfoVisible])

  const handlePersonal = useCallback(() => {
    changePersonalDataVisibility(true)
  }, [changePersonalDataVisibility])

  const handleHistory = useCallback(() => {
    changeHistoryVisibility(true)
  }, [changeHistoryVisibility])

  const timeZone = order.data?.TimeZone
  const callDateTime = useMemo(() => {
    if (callDate.start) {
      callDate.start.utcOffset(timeZone)
      callDate.end.utcOffset(timeZone)
      return `${callDate.start?.format('DD.MM.YYYY HH:mm')} - ${callDate.end?.format('HH:mm')}`
    }
    return null
  }, [callDate, timeZone])

  const isRtkAlertVisible = useMemo(() => {
    if (statusId === OrderStatuses.ErrorWithRTC && orderHistory?.length > 0) {
      const lastChange = orderHistory[0]
      return lastChange.ReasonId === null
    }
    return false
  }, [statusId, orderHistory])

  const isVolgaAlertVisible = useMemo(() => {
    if (statusId === OrderStatuses.ErrorWithRTC && orderHistory?.length > 0) {
      const lastChange = orderHistory[0]
      return lastChange.ReasonId === 200002 && lastChange.OperationId === 205
    }
    return false
  }, [statusId, orderHistory])

  const isNumberAlertsRightsPresent =
    formInitData?.userRights.isReserveMsisdn && formInitData?.userRights.isReadReserveMsisdn

  const renderAlerts = () => {
    const alerts = []
    if (isRtkAlertVisible) {
      alerts.push(<Alert message='Управление статусом заявки в системах Ростелеком' type='warning' />)
    }
    if (isVolgaAlertVisible) {
      alerts.push(
        <Alert
          message='Необходимо внести изменения в системах РТК, ошибки смотри в "Истории заявки ШПД"'
          type='warning'
        />
      )
    }
    const newNumberNotSet = orderState.IsNewSubscriber && !orderState.ReservedMsisdn
    const mnpNumberNotSet = orderState.IsMnp && !orderState.MnpMsisdn
    if ((newNumberNotSet || mnpNumberNotSet) && isNumberAlertsRightsPresent) {
      alerts.push(<Alert message='Не выбран временный номер' type='warning' />)
    }
    const newNumberSet = !orderState.IsNewSubscriber && orderState.ReservedMsisdn
    const mnpNumberSet = !orderState.IsMnp && orderState.MnpMsisdn
    if ((newNumberSet || mnpNumberSet) && isNumberAlertsRightsPresent) {
      alerts.push(<Alert message='Для заявки выбран временный номер – отменить заявку' type='warning' />)
    }
    return alerts
  }

  return (
    <>
      <HistoryModal
        isVisible={isHistoryVisible}
        orderId={orderId}
        history={orderHistory}
        setVisibility={changeHistoryVisibility}
      />
      <Affix offsetTop={topOffset}>
        <div>
          <Wrapper>
            <Status>
              <CustomTag data-bid='orderId' color='default'>
                {orderId ?? 'Нет номера'}
              </CustomTag>
              <CustomTag data-tid='span__broadband-status-bar__status-name' color={orderStateColor}>
                {statusName}
              </CustomTag>
              {reasonName && (
                <CustomTag data-tid='span__broadband-status-bar__reason-name' color={getReasonNameColor(reasonId)}>
                  {reasonName}
                </CustomTag>
              )}
              <CustomTag data-tid='span__broadband-status-bar__price' color='default'>
                Итоговая стоимость услуги ШПД: {formatOrderPrice(prices.fullPrice || 0)} руб.
              </CustomTag>
              {callDateTime && (
                <CustomTag data-tid='span__broadband-status-bar__price' color='default'>
                  Дата звонка: {callDateTime}
                </CustomTag>
              )}
              {upsaleOrderStatusId && upsaleOrderStatusName && (
                <CustomTag
                  data-tid='span__broadband-status-bar__upsale-order-status-name'
                  color={getUpsaleStatusColor(upsaleOrderStatusId)}
                >
                  Изменение заказа: {upsaleOrderStatusName}
                </CustomTag>
              )}
              {perform.isLoading && (
                <LoadingState>
                  <div>
                    <LoadingOutlined spin />
                  </div>
                  <Title>Сохранение</Title>
                </LoadingState>
              )}
              {isRelocationAvailable && orderState.Relocation && (
                <CustomTag color='pink'>
                  ПЕРЕЕЗД
                </CustomTag>
              )}
            </Status>
            <TabsWraper>
              <Button size='small' type='text' onClick={handleHistory}>
                История
              </Button>
              {isServiceInfoAvailable && (
                <Button size='small' type='text' onClick={handleServiceInfo}>
                  Системная информация
                </Button>
              )}
              {isRtcInfoAvailable && (
                <Button size='small' type='text' onClick={handleRtcInfo}>
                  Информация РТК
                </Button>
              )}
              {isTariffInfoAvailable && (
                <Button size='small' type='text' onClick={handleTariff}>
                  Тариф
                </Button>
              )}
              {isPersonalDataAvailable && (
                <Button size='small' type='text' onClick={handlePersonal}>
                  Персональные данные
                </Button>
              )}
            </TabsWraper>
          </Wrapper>
          {renderAlerts()}
          {isServiceInfoAvailable && (
            <OrderServiceInfoForm
              isHidden={isOrderServiceInfoVisible}
              isCreating={isCreating}
              areFormControlsDisabled={!areFormControlsEnabled}
              areFormActionsDisabled={!areFormActionsEnabled}
            />
          )}
          {isRtcInfoAvailable && <OrderRtcInfo isHidden={isOrderRtcInfoVisible} />}
        </div>
      </Affix>
    </>
  )
}

OrderStatusBar.propTypes = {
  isPersonalDataAvailable: bool,
  changePersonalDataVisibility: func,
  areFormControlsEnabled: bool,
  areFormActionsEnabled: bool
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 7px 21px;
  background-color: #fffffcb5;
  backdrop-filter: blur(4px);
  align-items: baseline;
  border-bottom: 1px solid #f0f0f0;
`
const Status = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  width: 50%;
`
const LoadingState = styled.div`
  display: flex;
  width: 100%;
`
const Title = styled.div`
  padding-left: 5px;
`
const CustomTag = styled(Tag)`
  margin-bottom: 8px;
`
const TabsWraper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 50%;
`
