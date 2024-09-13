import api from '../../utils/api'
import {
  CANCEL_ORDER,
  CANCEL_ORDER_FAILURE,
  CHANGE_ORDER_WAIT_STATE,
  CHANGE_ORDER_WAIT_STATE_FAILURE,
  DELETE_ORDER,
  DELETE_ORDER_FAILURE,
  PERFORM_ORDER,
  PERFORM_ORDER_FAILURE,
  TRANSFER_ORDER,
  TRANSFER_ORDER_FAILURE
} from '../constants/actionTypes'
import { processRequestResult, showErrorNotification } from './helpers'

const { changeOrderWaitState, cancelOrder, transferOrder, deleteOrder, performOrder } = api

export async function changeOrderWaitStateAC (dispatch, payload, options) {
  await changeOrderWaitRequest(dispatch, payload, options)
}

async function changeOrderWaitRequest (dispatch, params, options) {
  dispatch({ type: CHANGE_ORDER_WAIT_STATE })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await changeOrderWaitState(params)
    const { data } = res
    const { result, action } = processRequestResult(data, CHANGE_ORDER_WAIT_STATE, {
      notifications: {
        success: { msg: 'Смена статуса.', description: 'Успешно.' },
        error: { msg: 'Смена статуса.', description: `Ошибка. ${data?.MessageText}` },
        failure: { msg: 'Смена статуса.', description: `Ошибка. ${data?.MessageText}` },
        warning: { msg: 'Смена статуса.', description: `Успешно. ${data?.MessageText}` }
      },
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: CHANGE_ORDER_WAIT_STATE_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`, 'Смена статуса.')
    return null
  }
}

export async function cancelOrderAC (dispatch, payload, options) {
  await cancelOrderRequest(dispatch, payload, options)
}

async function cancelOrderRequest (dispatch, params, options) {
  dispatch({ type: CANCEL_ORDER })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await cancelOrder(params)
    const { data } = res
    const { result, action } = processRequestResult(data, CANCEL_ORDER, {
      notifications: {
        success: { msg: 'Отмена заявки.', description: 'Успешно.' },
        error: { msg: 'Отмена заявки.', description: `Ошибка. ${data?.MessageText}` },
        failure: { msg: 'Отмена заявки.', description: `Ошибка. ${data?.MessageText}` },
        warning: { msg: 'Отмена заявки.', description: `Успешно. ${data?.MessageText}` }
      },
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: CANCEL_ORDER_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`, 'Отмена заявки.')
    return null
  }
}

export async function deleteOrderAC (dispatch, payload, options) {
  await deleteOrderRequest(dispatch, payload, options)
}

async function deleteOrderRequest (dispatch, params, options) {
  dispatch({ type: DELETE_ORDER })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await deleteOrder(params)
    const { data } = res
    const { result, action } = processRequestResult(data, DELETE_ORDER, {
      notifications: {
        success: { msg: 'Отмена заявки.', description: 'Успешно.' },
        error: { msg: 'Отмена заявки.', description: `Ошибка. ${data?.MessageText}` },
        failure: { msg: 'Отмена заявки.', description: `Ошибка. ${data?.MessageText}` },
        warning: { msg: 'Отмена заявки.', description: `Успешно. ${data?.MessageText}` }
      },
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: DELETE_ORDER_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`, 'Отмена заявки.')
    return null
  }
}

export async function transferOrderAC (dispatch, payload, options) {
  await transferOrderRequest(dispatch, payload, options)
}

async function transferOrderRequest (dispatch, params, options) {
  dispatch({ type: TRANSFER_ORDER })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await transferOrder(params)
    const { data } = res
    const { result, action } = processRequestResult(data, TRANSFER_ORDER, {
      notifications: {
        success: { msg: 'Передача в РТК.', description: 'Успешно.' },
        error: { msg: 'Передача в РТК.', description: `Ошибка. ${data?.MessageText}` },
        failure: { msg: 'Передача в РТК.', description: `Ошибка. ${data?.MessageText}` },
        warning: { msg: 'Передача в РТК.', description: `Успешно. ${data?.MessageText}` }
      },
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: TRANSFER_ORDER_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`, 'Передача в РТК.')
    return null
  }
}

export async function performOrderAC (dispatch, payload, options) {
  await performOrderRequest(dispatch, payload, options)
}

async function performOrderRequest (dispatch, params, options) {
  dispatch({ type: PERFORM_ORDER })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await performOrder(params)
    const { data } = res
    const { result, action } = processRequestResult(data, PERFORM_ORDER, {
      notifications: {
        success: { msg: 'Сохранение заявки ШПД.', description: 'Успешно.' },
        error: { msg: 'Сохранение заявки ШПД.', description: `Ошибка. ${data?.MessageText}` },
        failure: { msg: 'Сохранение заявки ШПД.', description: `Ошибка. ${data?.MessageText}` },
        warning: { msg: 'Сохранение заявки ШПД.', description: `Успешно. ${data?.MessageText}` }
      },
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: PERFORM_ORDER_FAILURE })
    showErrorNotification(`Ошибка. ${exception.message}`, 'Сохранение заявки ШПД.')
    return null
  }
}
