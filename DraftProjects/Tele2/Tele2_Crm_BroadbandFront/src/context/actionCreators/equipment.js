import api from '../../utils/api'
import { showErrorNotification, processRequestResult, processRestRequestResult } from './helpers'
import {
  GET_SPEED_TO_TECHNOLOGY,
  GET_SPEED_TO_TECHNOLOGY_FAILURE,
  GET_EQUIPMENT_TYPE,
  GET_EQUIPMENT_TYPE_FAILURE,
  GET_UPSALE_EQUIPMENT_TYPE,
  GET_UPSALE_EQUIPMENT_TYPE_FAILURE,
  GET_UPSALE_SPEED_TO_TECHNOLOGY,
  GET_UPSALE_SPEED_TO_TECHNOLOGY_FAILURE
} from '../constants/actionTypes'

const { getSpeedToTechnology, getEquipmentType } = api

export async function getSpeedToTechRequest (dispatch, params, options) {
  dispatch({ type: GET_SPEED_TO_TECHNOLOGY })
  const { checkIsNotificationEnabled } = options
  try {
    const response = await getSpeedToTechnology(params)
    const { data, status } = response
    const { result, action } = processRestRequestResult(data, status, GET_SPEED_TO_TECHNOLOGY, {
      notifications: {
        warning: { msg: 'Список технологий ШПД.', description: `Успешно. ${data?.message || ''}` },
        error: { msg: 'Список технологий ШПД.', description: `Ошибка. ${data?.message || ''}` },
        failure: { msg: 'Список технологий ШПД.', description: `Ошибка. ${data?.message || ''}` }
      },
      areNotificationsEnabled: checkIsNotificationEnabled(response)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_SPEED_TO_TECHNOLOGY_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`, 'Список технологий ШПД.')
    return null
  }
}

export async function getUpSaleSpeedToTechnologyRequest (dispatch, params, options) {
  dispatch({ type: GET_UPSALE_SPEED_TO_TECHNOLOGY })
  const { checkIsNotificationEnabled } = options
  try {
    const response = await getSpeedToTechnology(params)
    const { data, status } = response
    const { result, action } = processRestRequestResult(data, status, GET_UPSALE_SPEED_TO_TECHNOLOGY, {
      notifications: {
        warning: { msg: 'Список технологий ШПД для изменения заказа.', description: `Успешно. ${data?.message || ''}` },
        error: { msg: 'Список технологий ШПД для изменения заказа.', description: `Ошибка. ${data?.message || ''}` },
        failure: { msg: 'Список технологий ШПД для изменения заказа.', description: `Ошибка. ${data?.message || ''}` }
      },
      areNotificationsEnabled: checkIsNotificationEnabled(data)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_UPSALE_SPEED_TO_TECHNOLOGY_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`, 'Список технологий ШПД для изменения заказа.')
    return null
  }
}

export async function getUpSaleSpeedToTechnologyAC (dispatch, payload, options) {
  await getUpSaleSpeedToTechnologyRequest(dispatch, payload, options)
}

export async function getEquipmentTypeRequest (dispatch, params, options) {
  dispatch({ type: GET_EQUIPMENT_TYPE })
  const { checkIsNotificationEnabled } = options
  try {
    const response = await getEquipmentType(params)
    const { data } = response
    const { result, action } = processRequestResult(data, GET_EQUIPMENT_TYPE, {
      notifications: {
        warning: { msg: 'Список оборудования ШПД.', description: `Успешно. ${data?.MessageText}` },
        error: { msg: 'Список оборудования ШПД.', description: `Ошибка. ${data?.MessageText}` },
        failure: { msg: 'Список оборудования ШПД.', description: `Ошибка. ${data?.MessageText}` }
      },
      areNotificationsEnabled: checkIsNotificationEnabled(response)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_EQUIPMENT_TYPE_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`, 'Список оборудования ШПД.')
    return null
  }
}

export async function getEquipmentTypeAC (dispatch, payload, options) {
  await getEquipmentTypeRequest(dispatch, payload, options)
}

export async function getUpSaleEquipmentTypesRequest (dispatch, params, options) {
  dispatch({ type: GET_UPSALE_EQUIPMENT_TYPE })
  const { checkIsNotificationEnabled } = options
  try {
    const response = await getEquipmentType(params)
    const { data } = response
    const { result, action } = processRequestResult(data, GET_UPSALE_EQUIPMENT_TYPE, {
      notifications: {
        warning: { msg: 'Список оборудования для изменения.', description: `Успешно. ${data?.MessageText}` },
        error: { msg: 'Список оборудования для изменения.', description: `Ошибка. ${data?.MessageText}` },
        failure: { msg: 'Список оборудования для изменения.', description: `Ошибка. ${data?.MessageText}` }
      },
      areNotificationsEnabled: checkIsNotificationEnabled(response)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_UPSALE_EQUIPMENT_TYPE_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`, 'Список оборудования для изменения.')
    return null
  }
}

export async function getUpSaleEquipmentTypesAC (dispatch, payload, options) {
  await getUpSaleEquipmentTypesRequest(dispatch, payload, options)
}
