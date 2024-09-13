import api from '../../utils/api'

import { GET_DOCUMENT, GET_DOCUMENT_TYPES } from '../constants/actionTypes'
import { showErrorNotification, processRequestResult } from './helpers'

const { getDocument, getDocumentTypes } = api

export async function getDocumentAC (dispatch, payload, options) {
  await getDocumentRequest(dispatch, payload, options)
}

export async function getDocumentRequest (dispatch, params, options) {
  dispatch({ type: GET_DOCUMENT })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getDocument(params)
    const { data } = res
    const { result, action } = processRequestResult(data, GET_DOCUMENT, {
      notifications: {
        error: { msg: 'Загрузка перс.данных ШПД.', description: `Ошибка. ${data?.MessageText}` },
        failure: { msg: 'Загрузка перс.данных ШПД.', description: `Ошибка. ${data?.MessageText}` },
        warning: { msg: 'Загрузка перс.данных ШПД.', description: `Успешно. ${data?.MessageText}` }
      },
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    showErrorNotification(`Ошибка. ${exception.message}`, 'Загрузка перс.данных ШПД.')
    return null
  }
}

export async function getDocumentTypesAC (dispatch, payload, options) {
  await getDocumentTypesRequest(dispatch, payload, options)
}

async function getDocumentTypesRequest (dispatch, params, options) {
  dispatch({ type: GET_DOCUMENT_TYPES })
  const { checkIsNotificationEnabled } = options
  try {
    const res = await getDocumentTypes(params)
    const { data } = res
    const { result, action } = processRequestResult(data, GET_DOCUMENT_TYPES, {
      areNotificationsEnabled: checkIsNotificationEnabled(res)
    })
    dispatch(action)
    return result
  } catch (exception) {
    showErrorNotification(exception.message)
    return null
  }
}
