import servicesMessageTypes from 'constants/servicesMessageTypes'
import api from '../../utils/api'
import {
  CHANGE_TIMESLOT,
  CHANGE_TIMESLOT_FAILURE,
  CHECK_AUTO_INTERVAL,
  CHECK_AUTO_INTERVAL_FAILURE,
  DELETE_TIMESLOT,
  DELETE_TIMESLOT_FAILURE,
  GET_TIMESLOTS,
  GET_TIMESLOTS_FAILURE,
  RESERVE_TIMESLOT,
  RESERVE_TIMESLOT_FAILURE
} from '../constants/actionTypes'
import { showErrorNotification, processRequestResult, processRestRequestResult } from './helpers'
import { formatWarnings } from 'crmHostApp/utils/helpers'

const { getTimeslots, reserveTimeslot, deleteTimeslot, checkAutoInterval, changeTimeslot } = api

export async function getTimeslotsAC (dispatch, payload, options) {
  await getTimeslotsRequest(dispatch, payload, options)
}

export async function getTimeslotsRequest (dispatch, payload, options) {
  dispatch({ type: GET_TIMESLOTS })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getTimeslots(payload)
    const { data, status } = res

    const notificationMsg = 'Получение таймслота. '
    const message = data?.message || data?.Message
    const warnings = data?.warnings || data?.Warnings

    const errorDescription = (
      <>
        {message}
        {message && warnings && <br />}
        {warnings && formatWarnings(warnings)}
      </>
    )

    const { result, action } = processRestRequestResult(data, status, GET_TIMESLOTS, {
      notifications: {
        error: {
          msg: notificationMsg,
          description: errorDescription
        },
        failure: { msg: notificationMsg, description: errorDescription },
        warning: { msg: notificationMsg, description: errorDescription }
      },
      payloads: {
        success: {
          slots: data,
          type: servicesMessageTypes.success,
          message,
          warnings
        },
        warning: {
          slots: data,
          type: servicesMessageTypes.warning,
          message,
          warnings
        },
        error: {
          slots: data,
          type: servicesMessageTypes.error,
          message,
          warnings
        }
      },
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_TIMESLOTS_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`, 'Получение таймслота.')
    return null
  }
}

export async function reserveTimeslotAC (dispatch, payload, options) {
  await reserveTimeslotRequest(dispatch, payload, options)
}

async function reserveTimeslotRequest (dispatch, params, options) {
  dispatch({ type: RESERVE_TIMESLOT })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await reserveTimeslot(params)
    const { data } = res
    const successPayload = { data: data?.Data, message: data?.MessageText }
    const errorPayload = { data: null, message: data?.MessageText }
    const { result, action } = processRequestResult(data, RESERVE_TIMESLOT, {
      payloads: { success: successPayload, error: errorPayload, failure: errorPayload },
      notifications: {
        error: { msg: 'Резервирование таймслота.', description: `Ошибка. ${data?.MessageText}` },
        failure: { msg: 'Резервирование таймслота.', description: `Ошибка. ${data?.MessageText}` },
        warning: { msg: 'Резервирование таймслота.', description: `Успешно. ${data?.MessageText}` }
      },
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: RESERVE_TIMESLOT_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`, 'Резервирование таймслота.')
    return null
  }
}

export async function deleteTimeslotAC (dispatch, payload, options) {
  await deleteTimeslotRequest(dispatch, payload, options)
}

async function deleteTimeslotRequest (dispatch, params, options) {
  dispatch({ type: DELETE_TIMESLOT })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await deleteTimeslot(params)
    const { data } = res
    const { result, action } = processRequestResult(data, DELETE_TIMESLOT, {
      payloads: { success: data },
      notifications: {
        error: { msg: 'Отмена резерва таймслота.', description: `Ошибка. ${data?.MessageText}` },
        failure: { msg: 'Отмена резерва таймслота.', description: `Ошибка. ${data?.MessageText}` },
        warning: { msg: 'Отмена резерва таймслота.', description: `Успешно. ${data?.MessageText}` }
      },
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: DELETE_TIMESLOT_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`, 'Отмена резерва таймслота.')
    return null
  }
}

export async function checkAutoIntervalAC (dispatch, payload, options) {
  await checkAutoIntervalRequest(dispatch, payload, options)
}

async function checkAutoIntervalRequest (dispatch, params, options) {
  dispatch({ type: CHECK_AUTO_INTERVAL })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await checkAutoInterval(params)
    const { data, status } = res
    const { result, action } = processRestRequestResult(data, status, CHECK_AUTO_INTERVAL, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: CHECK_AUTO_INTERVAL_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`, 'Проверка автоматического интервала')
    return null
  }
}

export async function changeTimeslotAC (dispatch, payload, options) {
  await changeTimeslotRequest(dispatch, payload, options)
}

async function changeTimeslotRequest (dispatch, params, options) {
  dispatch({ type: CHANGE_TIMESLOT })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await changeTimeslot(params)
    const { data, status } = res
    const { result, action } = processRestRequestResult(data, status, CHANGE_TIMESLOT, {
      notifications: {
        success: { msg: 'Изменение зарезервированного таймслота.', description: 'Успешно.' },
        error: { msg: 'Изменение зарезервированного таймслота.', description: `Ошибка. ${data?.Message}` },
        failure: { msg: 'Изменение зарезервированного таймслота.', description: `Ошибка. ${data?.Message}` },
        warning: { msg: 'Изменение зарезервированного таймслота.', description: `Успешно. ${data?.Message}` }
      },
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch({ ...action, requestParams: params })
    return result
  } catch (exception) {
    const message = exception?.response?.data?.message || exception.message

    dispatch({ type: CHANGE_TIMESLOT_FAILURE })
    showErrorNotification(`Ошибка. ${message}`, 'Изменение зарезервированного таймслота.')
    return null
  }
}
