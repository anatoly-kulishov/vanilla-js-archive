import moment from 'moment'
import {
  CHANGE_TIMESLOT,
  CHANGE_TIMESLOT_ERROR,
  CHANGE_TIMESLOT_FAILURE,
  CHANGE_TIMESLOT_SUCCESS,
  CHECK_AUTO_INTERVAL,
  CHECK_AUTO_INTERVAL_ERROR,
  CHECK_AUTO_INTERVAL_FAILURE,
  CHECK_AUTO_INTERVAL_SUCCESS,
  DELETE_TIMESLOT,
  DELETE_TIMESLOT_ERROR,
  DELETE_TIMESLOT_FAILURE,
  DELETE_TIMESLOT_SUCCESS,
  GET_TIMESLOTS,
  GET_TIMESLOTS_ERROR,
  GET_TIMESLOTS_FAILURE,
  GET_TIMESLOTS_SUCCESS,
  RESERVE_TIMESLOT,
  RESERVE_TIMESLOT_ERROR,
  RESERVE_TIMESLOT_FAILURE,
  RESERVE_TIMESLOT_SUCCESS
} from '../constants/actionTypes'
import { initialState, StateStatus } from '../constants/initialState'
import { findTimeSlotByDate, findTimeSlotIntervalById } from 'components/Broadband/helpers/timeslots'
import { OrderStatuses } from 'constants/orderStatuses'

function processTimeslot (state, timeslotsData, selectedTimeslot) {
  const orderState = { ...state.orderState }

  const timeSlotDate = selectedTimeslot.TimeSlotDate
  const timeSlotTime = selectedTimeslot.TimeSlotTime

  if (!timeSlotDate || !timeSlotTime) {
    return orderState
  }

  const selectedDay = findTimeSlotByDate(timeslotsData?.Timeslots, timeSlotDate)
  if (selectedDay) {
    const selectedInterval = findTimeSlotIntervalById(selectedDay, timeSlotTime)

    orderState.TimeSlotDate = moment.utc(selectedDay?.TimeSlotDate, 'DD.MM.YYYY')
    orderState.TimeSlotTime = selectedInterval?.TimeSlotTime
    orderState.TimeSlotTimeEnd = selectedInterval?.TimeSlotTimeEnd
    orderState.Duration = selectedInterval?.Duration
    orderState.IsTimeSlotReserveCRM = selectedDay?.IsTimeSlotReserveCRM
    orderState.RtcOrderNum = selectedDay?.RtcOrderNum
  }

  return orderState
}

function processOrderState (state) {
  const isNotTransferredToRtc = [OrderStatuses.Draft, OrderStatuses.New, OrderStatuses.Waiting].includes(
    state.orderStatusState.statusId
  )
  const orderState = {
    ...state.orderState,
    TimeSlotId: null,
    TimeSlotDate: null,
    TimeSlotTime: null,
    TimeSlotTimeEnd: null,
    Duration: null,
    TimeSlotComment: null,
    RtcTimeSlotId: null
  }

  if (isNotTransferredToRtc) {
    orderState.RtcOrderNum = null
  }

  return orderState
}

export function getTimeslotsReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_TIMESLOTS:
      state.timeslots.get.isLoading = true
      state.timeslots.get.isError = false
      state.timeslots.get.warnings = null
      state.timeslots.get.message = null
      break
    case GET_TIMESLOTS_SUCCESS:
      state.timeslots.get = {
        data: payload.slots,
        type: payload.type,
        message: payload.message,
        warnings: payload.warnings,
        isLoading: false,
        isError: false
      }
      state.timeslots.delete = initialState.timeslots.delete
      break
    case GET_TIMESLOTS_ERROR:
    case GET_TIMESLOTS_FAILURE:
      state.timeslots.get = {
        data: null,
        type: payload.type,
        message: payload.message,
        warnings: payload.warnings,
        isLoading: false,
        isError: true
      }
      break
    default:
      break
  }
}

export function reserveTimeslotReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case RESERVE_TIMESLOT:
      state.timeslots.reserve.isLoading = true
      state.timeslots.delete.data = null
      break
    case RESERVE_TIMESLOT_SUCCESS:
      const { data, message } = payload
      state.timeslots.reserve = {
        ...initialState.timeslots.reserve,
        isLoading: false,
        data,
        message
      }
      state.autoActions.reserveTimeslot = StateStatus.NeedAction

      state.orderState = processTimeslot(state, state.timeslots.get.data, state.selectedTimeslotData)
      state.orderState.TimeSlotId = data?.TimeSlotId
      state.orderState.RtcTimeSlotId = data?.RtcTimeSlotId
      state.orderState.RtcOrderNum = data?.RtcOrderNum
      break
    case RESERVE_TIMESLOT_ERROR:
    case RESERVE_TIMESLOT_FAILURE:
      state.timeslots.reserve = { ...initialState.timeslots.reserve, isLoading: false, message }
      break
    default:
      break
  }
}

export function deleteTimeslotReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case DELETE_TIMESLOT:
      state.timeslots.delete.isLoading = true
      break
    case DELETE_TIMESLOT_SUCCESS:
      state.timeslots.delete = { ...initialState.timeslots.delete, data: payload, isLoading: false }
      state.orderState = processOrderState(state)
      break
    case DELETE_TIMESLOT_ERROR:
    case DELETE_TIMESLOT_FAILURE:
      state.timeslots.delete.isLoading = false
      break
    default:
      break
  }
}

export function checkAutoIntervalReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case CHECK_AUTO_INTERVAL:
      state.timeslots.checkAutoInterval.data = null
      state.timeslots.checkAutoInterval.isLoading = true
      state.timeslots.checkAutoInterval.isError = false
      break
    case CHECK_AUTO_INTERVAL_SUCCESS:
      state.timeslots.checkAutoInterval.data = payload
      state.timeslots.checkAutoInterval.isLoading = false
      state.isRescheduleModalVisible = true
      break
    case CHECK_AUTO_INTERVAL_ERROR:
    case CHECK_AUTO_INTERVAL_FAILURE:
      state.timeslots.checkAutoInterval.isLoading = false
      state.timeslots.checkAutoInterval.isError = true
      break
    default:
      break
  }
}

export function changeTimeslotReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case CHANGE_TIMESLOT:
      state.timeslots.change.isLoading = true
      break
    case CHANGE_TIMESLOT_SUCCESS:
      state.timeslots.change.data = payload
      state.timeslots.change.isLoading = false
      state.timeslots.change.message = null

      state.orderState = processTimeslot(state, state.timeslots.get.data, state.selectedChangeTimeslotData)
      state.orderState.TimeSlotId = payload?.TimeSlotId
      state.orderState.RtcTimeSlotId = payload?.RtcTimeSlotId

      state.autoActions.afterChangeTimeslot = StateStatus.NeedAction
      break
    case CHANGE_TIMESLOT_ERROR:
    case CHANGE_TIMESLOT_FAILURE:
      state.timeslots.change = { ...initialState.timeslots.reserve, isLoading: false }
      break
    default:
      break
  }
}
