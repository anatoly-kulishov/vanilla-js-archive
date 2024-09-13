import { AddressTypes } from '../../constants/address'
import {
  CHANGE_AUTO_ACTIONS_STATE,
  CHANGE_CONTEXT_STATE,
  CHANGE_MANUAL_UPSALE_MODAL_VISIBILITY,
  CHANGE_MAIN_FORM,
  CHANGE_NUMBER_MODAL_TYPE,
  CHANGE_NUMBER_MODAL_VISIBILITY,
  CHANGE_PERSONAL_FORM,
  CHANGE_REASONS_FORM,
  CHANGE_RESCHEDULE_MODAL_VISIBILITY,
  CHANGE_TARIFF_MODAL_VISIBILITY,
  SET_CONSTRUCTOR_PRICE,
  CHANGE_AUTO_UPSALE_MODAL_VISIBILITY,
  CHANGE_CANCEL_AUTO_UPSALE_MODAL_VISIBILITY
} from '../constants/actionTypes'
import { processAddress } from '../helpers/stateAddress'
import {
  processAgreement,
  processEquipments,
  processPerson,
  processCommonFields,
  processSpeedToTechnology,
  processTimeslots,
  processPrices,
  processSelectedTimeslot,
  processMainInfo
} from '../helpers/stateMainForm'
import { processDocument } from '../helpers/statePersonalForm'
import moment from 'moment'

function processContextState (state, payload) {
  Object.entries(payload).map(([key, value]) => {
    state[key] = value
  })
}

function processMainFormChanges (state, changedFields) {
  const mainInfo = processMainInfo(changedFields)
  const common = processCommonFields(changedFields)
  const address = processAddress(state, changedFields, AddressTypes.Installation)
  const speedToTechnology = processSpeedToTechnology(state, changedFields)
  const equipments = processEquipments(state, changedFields)
  const person = processPerson(state, changedFields)
  const agreement = processAgreement(state, changedFields)
  const timeslots = processTimeslots(state, changedFields)
  const orderState = {
    ...state.orderState,
    ...mainInfo,
    ...common,
    ...address,
    ...equipments,
    ...speedToTechnology,
    ...person,
    ...agreement,
    ...timeslots
  }
  return orderState
}

function processReasonsFormChanges (state, changedFields) {
  let CallDateStart
  let CallDateEnd

  if (changedFields?.ReasonCallDate && !changedFields?.ReasonCallTime && !CallDateStart && !CallDateEnd) {
    const CallDate = changedFields.ReasonCallDate
    CallDateStart = moment(CallDate?.startOf('day'))
    CallDateEnd = moment(CallDate?.endOf('day'))
  } else if (changedFields?.ReasonCallDate && changedFields?.ReasonCallTime) {
    const CallDate = changedFields.ReasonCallDate
    const CallTime = changedFields.ReasonCallTime
    const [startTime, endTime] = CallTime.split('-')
    const [startTimeHours, startTimeMinutes] = startTime.split(':')
    const [endTimeHours, endTimeMinutes] = endTime.split(':')

    CallDateStart = CallDate
      ? moment(CallDate?.startOf('day').add(startTimeHours, 'h').add(startTimeMinutes, 'm'))
      : null
    CallDateEnd = CallDate ? moment(CallDate?.startOf('day').add(endTimeHours, 'h').add(endTimeMinutes, 'm')) : null
  }

  const timezone = state.order.data?.TimeZone
  if (timezone && CallDateStart && CallDateEnd) {
    CallDateStart?.utcOffset(timezone)
    CallDateEnd?.utcOffset(timezone)
  }

  return {
    ReasonId: changedFields?.ReasonId ?? state.reasonsState?.ReasonId,
    ReasonComment: changedFields?.ReasonComment ?? state.reasonsState?.ReasonComment,
    CallDateStart: CallDateStart?.toISOString() ?? state.reasonsState?.CallDateStart,
    CallDateEnd: CallDateEnd?.toISOString() ?? state.reasonsState?.CallDateEnd,
    SR: changedFields?.ReasonSR ?? state.reasonsState?.SR
  }
}

function processPersonalFormChanges (state, changedFields) {
  const address = processAddress(state, changedFields, AddressTypes.Registration)
  const document = processDocument(state, changedFields)
  return {
    ...state.orderState,
    ...address,
    ...document
  }
}

function processAutoActionsChanges (state, changedActions) {
  return { ...state.autoActions, ...changedActions }
}

export function stateReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case CHANGE_MAIN_FORM:
      state.orderState = processMainFormChanges(state, payload)
      state.prices = processPrices(state, payload)
      state.selectedTimeslotData = processSelectedTimeslot(state, payload)
      state.isFormChanged = true
      break
    case CHANGE_PERSONAL_FORM:
      state.orderState = processPersonalFormChanges(state, payload)
      state.isFormChanged = true
      break
    case CHANGE_REASONS_FORM:
      state.reasonsState = processReasonsFormChanges(state, payload)
      state.isFormChanged = true
      break
    case CHANGE_CONTEXT_STATE:
      processContextState(state, payload)
      break
    case CHANGE_AUTO_ACTIONS_STATE:
      state.autoActions = processAutoActionsChanges(state, payload)
      break
    default:
      break
  }
}

export function priceReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case SET_CONSTRUCTOR_PRICE:
      state.orderState.Agreement.TotalCost = payload
      break
    default:
      break
  }
}

export function modalVisibilityReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case CHANGE_TARIFF_MODAL_VISIBILITY:
      state.isTariffModalVisible = payload
      break
    case CHANGE_MANUAL_UPSALE_MODAL_VISIBILITY:
      state.isManualUpSaleModalVisible = payload
      break
    case CHANGE_AUTO_UPSALE_MODAL_VISIBILITY:
      state.isAutoUpSaleModalVisible = payload
      break
    case CHANGE_RESCHEDULE_MODAL_VISIBILITY:
      state.isRescheduleModalVisible = payload
      break
    case CHANGE_CANCEL_AUTO_UPSALE_MODAL_VISIBILITY:
      state.isCancelAutoUpSaleModalVisible = payload
      break
    default:
      break
  }
}

export function numberModalReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case CHANGE_NUMBER_MODAL_VISIBILITY:
      state.isNumberModalVisible = payload
      break
    case CHANGE_NUMBER_MODAL_TYPE:
      state.numberModalType = payload
      break
    default:
      break
  }
}
