import { isNil } from 'lodash-es'

import api from 'utils/api'
import { isStringFalsy } from 'helpers/index'

import {
  GET_ADDRESS_SUGGESTION,
  CHECK_ADDRESS,
  RECHECK_ADDRESS,
  RECHECK_ADDRESS_FAILURE,
  GET_ADDRESS_SUGGESTION_FAILURE,
  CHECK_ADDRESS_FAILURE
} from '../constants/actionTypes'
import { getSpeedToTechRequest } from './equipment'
import { showErrorNotification, processRequestResult } from './helpers'
import { getRelocationInfoAC, getRtcKeyRequest } from './order'

const { getSuggestionAddress, checkAddress } = api

export async function recheckAddressAC (dispatch, payload, options) {
  await recheckAddressRequest(dispatch, payload, options)
}

async function recheckAddressRequest (dispatch, payload, options) {
  dispatch({ type: RECHECK_ADDRESS })
  const { params, addressType } = payload
  const { checkIsNotificationEnabled } = options

  try {
    const response = await getSuggestionAddress(params)
    const { data } = response
    const payload = { data: data?.Data, addressType: addressType }
    if (data?.Data?.DaData?.length < 1) {
      showErrorNotification('Не удалось перепроверить адрес. Перезаполните адрес вручную')
    }
    const { result, action } = processRequestResult(data, RECHECK_ADDRESS, {
      payloads: { success: payload, warning: payload },
      areNotificationsEnabled: checkIsNotificationEnabled(response)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: RECHECK_ADDRESS_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function getAddressSuggestionAC (dispatch, payload, options) {
  await getAddressSuggestionRequest(dispatch, payload, options)
}

async function getAddressSuggestionRequest (dispatch, payload, options) {
  dispatch({ type: GET_ADDRESS_SUGGESTION })
  const { searchParams, addressType } = payload
  const { checkIsNotificationEnabled } = options
  try {
    const response = await getSuggestionAddress(searchParams)
    const { data } = response
    const payload = { data: data?.Data, addressType: addressType }
    const options = {
      payloads: { success: payload, warning: payload, error: payload },
      areNotificationsEnabled: checkIsNotificationEnabled(response)
    }
    const { result, action } = processRequestResult(data, GET_ADDRESS_SUGGESTION, options)
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_ADDRESS_SUGGESTION_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function checkAddressAC (dispatch, payload, options) {
  const { checkAddressParams, speedToTechParams: payloadSpeedToTechParams, relocationInfoParams: payloadRelocationParams } = payload
  const checkResponse = await checkAddressRequest(dispatch, checkAddressParams, options)
  const checkResultData = checkResponse?.data

  // GetRtcKey after CheckAddress
  if (isNil(checkResultData?.IsOnlime) || isStringFalsy(checkAddressParams?.OrderRegionCode)) {
    return
  }
  const rtcKeyParams = { RegionCode: checkAddressParams?.OrderRegionCode, IsOnlime: checkResultData?.IsOnlime }
  const rtcKey = await getRtcKeyRequest(dispatch, rtcKeyParams, options)

  // GetRelocationInfo after CheckAddress
  const { data, permissions } = payloadRelocationParams
  const relocationInfoParams = {
    ...data,
    RegionCode: checkAddressParams?.OrderRegionCode,
    Technology: checkResultData?.Technology,
    MaxSpeed: checkResultData?.MaxSpeed,
    IsOnlime: checkResultData?.IsOnlime
  }

  if (permissions.isRelocationCheckbox && permissions.isRelocation && checkResultData?.StatusId === '1') {
    await getRelocationInfoAC(dispatch, relocationInfoParams, options)
  }

  // GetSpeedToTechnology after GetOrder
  if (!checkResultData?.MaxSpeed || !checkResultData?.Technology) {
    return
  }
  const speedToTechParams = {
    ...payloadSpeedToTechParams,
    RtcKey: rtcKey,
    MaxSpeed: checkResultData?.MaxSpeed,
    Technology: checkResultData?.Technology
  }
  await getSpeedToTechRequest(dispatch, speedToTechParams, options)
}

async function checkAddressRequest (dispatch, params, options) {
  dispatch({ type: CHECK_ADDRESS })
  const { checkIsNotificationEnabled } = options
  try {
    const response = await checkAddress(params)
    const { data } = response
    const successPayload = { data: data?.Data, message: data?.MessageText }
    const errorPayload = { data: null, message: data?.MessageText }
    const { result, action } = processRequestResult(data, CHECK_ADDRESS, {
      payloads: { success: successPayload, warning: successPayload, error: errorPayload, failure: errorPayload },
      notifications: {
        error: { msg: 'Проверка адреса ШПД.', description: `Ошибка. ${data?.MessageText}` },
        failure: { msg: 'Проверка адреса ШПД.', description: `Ошибка. ${data?.MessageText}` },
        warning: { msg: 'Проверка адреса ШПД.', description: `Успешно. ${data?.MessageText}` }
      },
      areNotificationsEnabled: checkIsNotificationEnabled(response)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: CHECK_ADDRESS_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`, 'Проверка адреса ШПД.')
    return null
  }
}
