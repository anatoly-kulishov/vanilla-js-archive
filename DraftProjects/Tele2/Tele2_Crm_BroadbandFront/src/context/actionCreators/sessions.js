import api from 'utils/api'
import {
  CLOSE_SESSION,
  CLOSE_SESSION_FAILURE,
  CREATE_AUTO_ORDER_SESSION,
  CREATE_AUTO_ORDER_SESSION_FAILURE,
  CREATE_OPERATOR_SHIFTS,
  CREATE_OPERATOR_SHIFTS_FAILURE,
  CREATE_SESSION,
  CREATE_SESSION_FAILURE,
  DELETE_OPERATOR_SHIFTS,
  DELETE_OPERATOR_SHIFTS_FAILURE,
  GET_OPERATOR_SHIFTS,
  GET_OPERATOR_SHIFTS_FAILURE,
  GET_SESSIONS_INFO,
  GET_SESSIONS_INFO_FAILURE,
  GET_SESSION_CLOSE_REASONS,
  GET_SESSION_CLOSE_REASONS_FAILURE,
  GET_SESSION_TASK_TYPES,
  GET_SESSION_TASK_TYPES_FAILURE
} from '../constants/actionTypes'

import { processRestRequestResult, showErrorNotification } from './helpers'

const {
  getSessionsInfo,
  createSession,
  closeSession,
  getSessionTaskTypes,
  getSessionCloseReasons,
  getOperatorShifts,
  createOperatorShifts,
  deleteOperatorShifts,
  createAutoOrderSession
} = api

export async function getSessionsInfoAC (dispatch, payload, options) {
  await getSessionsInfoRequest(dispatch, payload, options)
}

async function getSessionsInfoRequest (dispatch, params, options) {
  dispatch({ type: GET_SESSIONS_INFO })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getSessionsInfo(params)
    const { data, status } = res
    const { result, action } = processRestRequestResult(data, status, GET_SESSIONS_INFO, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_SESSIONS_INFO_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function createSessionAC (dispatch, payload, options) {
  await createSessionRequest(dispatch, payload, options)
}

async function createSessionRequest (dispatch, params, options) {
  dispatch({ type: CREATE_SESSION })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await createSession(params)
    const { data, status } = res
    const { result, action } = processRestRequestResult(data, status, CREATE_SESSION, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: CREATE_SESSION_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function closeSessionAC (dispatch, payload, options) {
  await closeSessionRequest(dispatch, payload, options)
}

async function closeSessionRequest (dispatch, params, options) {
  dispatch({ type: CLOSE_SESSION })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await closeSession(params)
    const { data, status } = res
    const { result, action } = processRestRequestResult(data, status, CLOSE_SESSION, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: CLOSE_SESSION_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getSessionTaskTypesAC (dispatch, payload, options) {
  await getSessionTaskTypesRequest(dispatch, payload, options)
}

async function getSessionTaskTypesRequest (dispatch, params, options) {
  dispatch({ type: GET_SESSION_TASK_TYPES })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getSessionTaskTypes(params)
    const { data, status } = res
    const { result, action } = processRestRequestResult(data, status, GET_SESSION_TASK_TYPES, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_SESSION_TASK_TYPES_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getSessionCloseReasonsAC (dispatch, payload, options) {
  await getSessionCloseReasonsRequest(dispatch, payload, options)
}

async function getSessionCloseReasonsRequest (dispatch, params, options) {
  dispatch({ type: GET_SESSION_CLOSE_REASONS })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getSessionCloseReasons(params)
    const { data, status } = res
    const { result, action } = processRestRequestResult(data, status, GET_SESSION_CLOSE_REASONS, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_SESSION_CLOSE_REASONS_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getOperatorShiftsAC (dispatch, payload, options) {
  await getOperatorShiftsRequest(dispatch, payload, options)
}

async function getOperatorShiftsRequest (dispatch, params, options) {
  dispatch({ type: GET_OPERATOR_SHIFTS })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getOperatorShifts(params)
    const { data, status } = res
    const { result, action } = processRestRequestResult(data, status, GET_OPERATOR_SHIFTS, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_OPERATOR_SHIFTS_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function createOperatorShiftsAC (dispatch, payload, options) {
  await createOperatorShiftsRequest(dispatch, payload, options)
}

async function createOperatorShiftsRequest (dispatch, params, options) {
  dispatch({ type: CREATE_OPERATOR_SHIFTS })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await createOperatorShifts(params)
    const { data, status } = res
    const { result, action } = processRestRequestResult(data, status, CREATE_OPERATOR_SHIFTS, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: CREATE_OPERATOR_SHIFTS_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function deleteOperatorShiftsAC (dispatch, payload, options) {
  await deleteOperatorShiftsRequest(dispatch, payload, options)
}

async function deleteOperatorShiftsRequest (dispatch, params, options) {
  dispatch({ type: DELETE_OPERATOR_SHIFTS })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await deleteOperatorShifts(params)
    const { data, status } = res
    const { result, action } = processRestRequestResult(data, status, DELETE_OPERATOR_SHIFTS, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: DELETE_OPERATOR_SHIFTS_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function createAutoOrderSessionAC (dispatch, payload, options) {
  await createAutoOrderSessionRequest(dispatch, payload, options)
}

async function createAutoOrderSessionRequest (dispatch, params, options) {
  dispatch({ type: CREATE_AUTO_ORDER_SESSION })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await createAutoOrderSession(params)
    const { data, status } = res
    const { result, action } = processRestRequestResult(data, status, CREATE_AUTO_ORDER_SESSION, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: CREATE_AUTO_ORDER_SESSION_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}
