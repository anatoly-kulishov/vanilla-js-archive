import { isBoolean } from 'lodash'
import moment from 'moment'
import { useEffect } from 'react'

import { fillAddress, getTimeslotsParams, refillForm } from 'components/Broadband/helpers/broadband'
import { preparePerformParams } from 'components/Broadband/helpers/orderFooter'
import { getTimeSlotDateAndInterval } from 'components/Broadband/helpers/timeslots'
import { AddressTypes } from 'constants/address'
import { Operation } from 'constants/operations'
import { StateStatus } from 'context/constants/initialState'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { isNil } from 'lodash-es'
import { notification } from 'antd'
import { checkIsSessionPossible } from 'helpers/sessions'
import { EquipmentTypeId } from 'constants/equipment'
import { OrderStatuses } from 'constants/orderStatuses'
import { getEquipments, getEquipmentTypeParams, getRelocationEquipments } from 'components/Broadband/helpers/equipments'

function getModifyTimeslotParams (orderState, timeslots, selectedTimeslotData) {
  const { timeSlotDate, timeSlotInterval } = getTimeSlotDateAndInterval(
    timeslots,
    selectedTimeslotData.TimeSlotDate,
    selectedTimeslotData.TimeSlotTime
  )
  return {
    OrderId: orderState.OrderId,
    TimeslotId: orderState.TimeSlotId,
    TimeslotDate: moment.utc(timeSlotDate?.TimeSlotDate, 'DD.MM.YYYY').toISOString(),
    TimeslotTime: timeSlotInterval?.TimeSlotTime,
    TimeslotTimeEnd: timeSlotInterval?.TimeSlotTimeEnd,
    TimeslotDuration: timeSlotInterval?.Duration,
    RtcOrderNum: timeSlotDate?.RtcOrderNum,
    RtcTimeSlotId: orderState.RtcTimeSlotId,
    IsTimeSlotReserveCRM: timeSlotDate?.IsTimeSlotReserveCRM
  }
}

export function useAutoActions (form, handleOpenOrder, isCreating) {
  const state = useBroadbandContext()
  const {
    autoActions,
    perform,
    equipmentTypes,
    orderState,
    orderStatusState,
    selectedTimeslotData,
    timeslots,
    sessionCloseReasons,
    getTimeslots,
    modifyOrderTimeslot,
    performOrder,
    changeCheckAddressStatus,
    changeContextState,
    getDocument,
    getSessionsInfo,
    sessionsInfoState,
    closeSession,
    createAutoOrderSession,
    autoOrderSession,
    createSession,
    closeSessionState,
    getOperatorShifts,
    operatorShifts,
    selectedChangeTimeslotData,
    changeAutoActionsState,
    changeMainFormState,
    order,
    speedToTechnology,
    relocationInfo,
    rtcKey,
    getEquipmentTypes
  } = state

  const statusId = orderStatusState.statusId

  // Auto getDocument after performOrder
  const afterPerformStatus = autoActions.afterPerform
  useEffect(() => {
    if (afterPerformStatus === StateStatus.NeedAction && perform.data?.PersonalDataId) {
      getDocument({ PersonalDataId: perform.data?.PersonalDataId })
    }
  }, [afterPerformStatus])

  // Auto modify order timeslot after reserveTimeslot
  const reserveTimeslotStatus = autoActions.reserveTimeslot
  useEffect(() => {
    if (reserveTimeslotStatus === StateStatus.NeedAction && selectedTimeslotData) {
      const params = getModifyTimeslotParams(orderState, timeslots.get.data?.Timeslots, selectedTimeslotData)
      modifyOrderTimeslot(params)
    }
  }, [reserveTimeslotStatus, modifyOrderTimeslot, orderState, timeslots])

  // Auto modify order timeslot after changeTimeSlot
  const afterChangeTimeslotStatus = autoActions.afterChangeTimeslot
  useEffect(() => {
    if (afterChangeTimeslotStatus === StateStatus.NeedAction && selectedChangeTimeslotData) {
      const { TimeSlotDate, TimeSlotTime } = selectedChangeTimeslotData
      const selectedTimeslotData = { TimeSlotDate, TimeSlotTime }
      changeContextState({ selectedTimeslotData })
      form.setFieldsValue(selectedTimeslotData)

      const params = getModifyTimeslotParams(orderState, timeslots.get.data?.Timeslots, selectedTimeslotData)
      modifyOrderTimeslot(params)

      changeAutoActionsState({ afterChangeTimeslot: StateStatus.Done })
    }
  }, [afterChangeTimeslotStatus, modifyOrderTimeslot, orderState, timeslots])

  // Auto performOrder and GetTimeslots after checkAddress
  const checkAddressStatus = autoActions.checkAddress
  useEffect(() => {
    if (checkAddressStatus === StateStatus.NeedAction && !orderState.Relocation) {
      performOrder(preparePerformParams(Operation.Save, orderState, orderStatusState))

      const timeslotsParams = getTimeslotsParams(orderState)
      const isStatusOk = ![OrderStatuses.Cancelled, OrderStatuses.Deleted].includes(statusId)
      if (isBoolean(timeslotsParams?.IsOnlime) && timeslotsParams?.RtcTechnologyId && isStatusOk) {
        getTimeslots(timeslotsParams)
      }

      changeCheckAddressStatus(StateStatus.Done)
    }
  }, [checkAddressStatus, orderState, orderStatusState, changeCheckAddressStatus, statusId])

  // Auto performOrder after getEquipmentTypes
  const afterEquipmentStatus = autoActions.afterEquipmentType
  useEffect(() => {
    if (!orderState.Relocation || afterEquipmentStatus !== StateStatus.NeedAction) {
      return
    }

    if (orderState.Relocation && afterEquipmentStatus === StateStatus.NeedAction) {
      performOrder(preparePerformParams(Operation.Save, orderState, orderStatusState))

      changeAutoActionsState({ afterEquipmentType: StateStatus.NotAvailable })
    }
  }, [orderState, orderStatusState])

  // Auto getEquipmentTypes after getRelocationInfo and getSpeedToTechnology
  const relocationInfoStatus = autoActions.afterRelocationInfo
  const speedToTechnologyStatus = autoActions.afterSpeedToTechnology
  useEffect(() => {
    if (relocationInfoStatus === StateStatus.NeedAction && speedToTechnologyStatus === StateStatus.NeedAction) {
      const serviceId = relocationInfo.data?.CurrentSpeed?.ServiceId
      const foundedSpeedToTech = speedToTechnology.find(item => item.ServiceId === serviceId)
      const isSameTechnology = relocationInfo.data?.IsSameTechnology

      changeAutoActionsState({
        afterRelocationInfo: StateStatus.Done,
        afterSpeedToTechnology: StateStatus.Done
      })

      if (foundedSpeedToTech && isSameTechnology) {
        changeMainFormState({ EquipmentCodeList: [], ServiceId: foundedSpeedToTech.ServiceId })
        form.setFieldsValue({ ServiceId: foundedSpeedToTech.ServiceId, Equipments: [] })
        const params = getEquipmentTypeParams(speedToTechnology, order.data, serviceId, rtcKey)
        getEquipmentTypes(params)
        changeAutoActionsState({ fillEquipments: StateStatus.NeedAction })
      }
    }
  }, [relocationInfoStatus, speedToTechnologyStatus])

  // Auto create session (if not exist) after perform order
  const sessionData = sessionsInfoState.data
  const isSessionExist = !isNil(sessionData) && sessionData.length > 0

  const isSessionPossible = checkIsSessionPossible(statusId)

  const { OrderId: orderId } = orderState
  useEffect(() => {
    if (afterPerformStatus === StateStatus.NeedAction) {
      const shouldCreateSession = !isSessionExist && isSessionPossible && !isNaN(orderId) && !isNaN(statusId)
      if (shouldCreateSession) {
        const params = {
          orderId,
          statusId
        }
        createSession(params)
      }
      if (isCreating && orderId) {
        handleOpenOrder({ orderId })
      }
    }

    changeContextState({
      autoActions: {
        ...autoActions,
        afterPerform: StateStatus.Done
      }
    })
  }, [afterPerformStatus, statusId, orderId, isSessionExist, isSessionPossible])

  // Auto set available equipment types
  const speedTechnologyId = orderState.BcSpeedId
  const fillEquipmentsStatus = autoActions.fillEquipments
  useEffect(() => {
    if (!equipmentTypes || fillEquipmentsStatus !== StateStatus.NeedAction) {
      return
    }

    let equipments
    if (
      orderState.Relocation &&
      relocationInfo.data?.IsSameTechnology &&
      relocationInfo.data?.CurrentEquipment?.length > 0
    ) {
      equipments = getRelocationEquipments(relocationInfo.data, equipmentTypes)
      changeMainFormState({ Equipments: equipments })
    }

    if (orderState.BcSpeedId && orderState.EquipmentCodeList?.length === 0 && !relocationInfo.data?.IsSameTechnology) {
      equipments = getEquipments(equipmentTypes)
    }

    if (equipments) {
      const isWinkSetting = Boolean(equipments?.find(eq => eq?.TypeId?.value === EquipmentTypeId.TVSetTopBox))

      form.setFieldsValue({
        Equipments: equipments,
        IsWinkSetting: isWinkSetting
      })
      changeMainFormState({ IsWinkSetting: isWinkSetting })
    }

    if (orderState.Relocation && relocationInfo.data && afterEquipmentStatus === StateStatus.Done) {
      changeAutoActionsState({ afterEquipmentType: StateStatus.NeedAction })
    }
  }, [form, speedTechnologyId, equipmentTypes, relocationInfo, afterEquipmentStatus])

  // Auto refill address after recheck
  const recheckAddressStatus = autoActions.recheckAddress[AddressTypes.Installation]
  useEffect(() => {
    if (recheckAddressStatus === StateStatus.NeedAction) {
      form.setFieldsValue({
        [AddressTypes.Installation]: fillAddress(orderState)
      })
      changeContextState({
        autoActions: {
          ...autoActions,
          recheckAddress: { ...autoActions.recheckAddress, [AddressTypes.Installation]: StateStatus.Done }
        }
      })
    }
  }, [orderState.Address, recheckAddressStatus])

  // get session info after create session
  const sessionInfoStatus = autoActions.sessionInfo
  useEffect(() => {
    if (sessionInfoStatus === StateStatus.NeedAction) {
      getSessionsInfo({ OrderId: orderState.OrderId })
    }
  }, [orderState, sessionInfoStatus])

  // close session after order action
  const closeAfterActionStatus = autoActions.closeAfterAction
  useEffect(() => {
    if (closeAfterActionStatus === StateStatus.NeedAction && isSessionExist) {
      const reason = sessionCloseReasons?.find(item => item.statusId === orderStatusState.statusId)
      if (reason?.reasonId && reason?.reasonName) {
        const params = {
          orderId: orderState.OrderId,
          reasonId: reason.reasonId,
          reasonName: reason.reasonName
        }
        closeSession(params)
      }
      changeContextState({
        autoActions: {
          ...autoActions,
          closeAfterAction: StateStatus.Done,
          afterCloseSession: StateStatus.NeedAction
        }
      })
    }
  }, [orderState, orderStatusState, sessionCloseReasons, closeAfterActionStatus, isSessionExist])

  // Auto get shifts after deletion
  const afterCloseSessionStatus = autoActions.afterCloseSession
  const { isSuccess: isDeleteSessionSuccess } = closeSessionState
  useEffect(() => {
    if (
      afterCloseSessionStatus === StateStatus.NeedAction &&
      !isNil(isDeleteSessionSuccess) &&
      isDeleteSessionSuccess
    ) {
      getOperatorShifts({ isActive: true })
      changeContextState({
        autoActions: {
          ...autoActions,
          afterCloseSession: StateStatus.Done,
          afterGetOperatorShifts: StateStatus.NeedAction
        }
      })
    }
  }, [afterCloseSessionStatus, isDeleteSessionSuccess])

  // Auto create auto order session if has active shifts
  const afterGetOperatorShiftsStatus = autoActions.afterGetOperatorShifts
  const { data, isSuccess } = operatorShifts.get
  useEffect(() => {
    if (
      afterGetOperatorShiftsStatus === StateStatus.NeedAction &&
      !isNil(isSuccess) &&
      isSuccess &&
      !isNil(data) &&
      data?.length > 0
    ) {
      createAutoOrderSession()
      changeContextState({
        autoActions: {
          ...autoActions,
          afterGetOperatorShifts: StateStatus.Done
        }
      })
    }
  }, [afterGetOperatorShiftsStatus, data, isSuccess])

  // Auto open next order
  const autoOrderSessionData = autoOrderSession.data
  useEffect(() => {
    if (!isNil(autoOrderSessionData)) {
      const { msisdn, orderId, message } = autoOrderSessionData

      if (orderId) {
        handleOpenOrder({ orderId, msisdn: msisdn || null })
      }
      if (message) {
        notification.error({
          message: 'Заявка на подключение ШПД',
          description: message
        })
      }
    }
  }, [autoOrderSessionData])

  const refillFormStatus = autoActions.refillForm
  useEffect(() => {
    if (refillFormStatus === StateStatus.NeedAction) {
      const values = refillForm(order.data, orderState, speedToTechnology, equipmentTypes)
      form.setFieldsValue(values)

      changeAutoActionsState({ refillForm: StateStatus.Done })
    }
  }, [refillFormStatus])
}
