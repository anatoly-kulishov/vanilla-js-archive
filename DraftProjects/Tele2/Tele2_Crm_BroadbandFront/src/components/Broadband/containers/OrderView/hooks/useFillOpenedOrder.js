import { useEffect, useState } from 'react'

import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { isAddressEmpty } from 'components/Broadband/helpers/address'
import {
  fillEquipments,
  fillForm,
  fillSpeedToTechnology,
  loadFormFromState
} from 'components/Broadband/helpers/broadband'
import { AddressTypes } from 'constants/address'
import { OrderLoadingStatus } from 'constants/form'
import { getAddressByType } from 'helpers/address'
import { isOwnSession } from '../../../helpers/sessions'
import { getTariffItemByType } from 'helpers/agreement'
import { TariffTypes } from 'constants/tariff'

export function useFillOpenedOrder (form, isCreating, formInitData) {
  const {
    orderLoadingStatus,
    orderState,
    orderStatusState,
    selectedTimeslotData,
    speedToTechnology,
    order,
    sessionsInfoState,
    equipmentTypes,
    changeOrderLoadingStatus,
    changeTariffModalVisibility,
    checkSubscriberTariff
  } = useBroadbandContext()

  const [formPrefilled, setFormPrefilled] = useState(false)

  // Show constructor on opened order
  const sessionData = sessionsInfoState.data
  const orderData = order.data
  useEffect(() => {
    const isSessionOk = isOwnSession(sessionData, formInitData?.user?.login, orderData?.OrderId)
    const installationAddress = getAddressByType(orderState, AddressTypes.Installation)
    if (isSessionOk && orderData?.Agreement && !isCreating && !isAddressEmpty(installationAddress)) {
      const tariffItem = getTariffItemByType(orderData, TariffTypes.Tariff)
      const isWrongTariff = !tariffItem || tariffItem?.Id !== formInitData?.subscriberRatePlanId
      const isStatusOk = orderStatusState.statusId === 0 || orderStatusState.statusId === 10 // статус `Новая` или `Черновик`
      if (isWrongTariff && isStatusOk) {
        changeTariffModalVisibility(true)
      }
    }
  }, [orderData, sessionData, formInitData, isCreating, orderStatusState.statusId])

  // Fill form after change tabs
  useEffect(() => {
    if (isCreating || formPrefilled) {
      return
    }
    form.setFieldsValue(
      loadFormFromState(orderState, order.data, selectedTimeslotData, speedToTechnology, equipmentTypes)
    )
    setFormPrefilled(true)
  }, [orderState, order, speedToTechnology, equipmentTypes])

  useEffect(() => {
    if (isCreating) return
    if (orderLoadingStatus !== OrderLoadingStatus.Finished) {
      switch (orderLoadingStatus) {
        case OrderLoadingStatus.OrderReady:
          form.setFieldsValue(fillForm(orderState, order.data))
          break
        case OrderLoadingStatus.SpeedTechnologyReady:
          form.setFieldsValue(fillSpeedToTechnology(order.data, speedToTechnology))
          break
        case OrderLoadingStatus.EquipmentTypesReady:
          form.setFieldsValue(fillEquipments(order.data, equipmentTypes))
          changeOrderLoadingStatus(OrderLoadingStatus.Finished)
          break
        default:
          break
      }
    }
  }, [orderLoadingStatus])

  // Fill Agreement.Tariff with type=`tariff` item from `BroadbandConnectionTariff/Available`
  const [isAgreementTariffChecked, setAgreementTariffChecked] = useState(false)
  useEffect(() => {
    if (orderLoadingStatus === OrderLoadingStatus.Finished && !isAgreementTariffChecked) {
      const currentTariffItem = getTariffItemByType(orderState, TariffTypes.Tariff)
      if (!currentTariffItem) {
        const { subscriberId, msisdn, billingBranchId, billingBranchIdReserve } = formInitData
        const params = {
          SubscriberId: subscriberId,
          BranchId: billingBranchId ?? billingBranchIdReserve,
          Msisdn: msisdn,
          OrderRegionCode: orderState?.OrderRegionCode
        }
        checkSubscriberTariff(params)
        setAgreementTariffChecked(true)
      }
    }
  }, [orderLoadingStatus, orderState, formInitData, isAgreementTariffChecked])
}
