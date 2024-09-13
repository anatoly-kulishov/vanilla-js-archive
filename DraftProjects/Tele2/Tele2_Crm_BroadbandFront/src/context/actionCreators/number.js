import api from 'utils/api'
import {
  CHECK_ADDRESS_FAILURE,
  CHECK_MSISDN,
  GET_MSISDN,
  GET_MSISDN_FAILURE,
  RESERVE_MSISDN,
  RESERVE_MSISDN_FAILURE
} from '../constants/actionTypes'
import { processRestRequestResult, showErrorNotification } from './helpers'

const { getMsisdn, reserveMsisdn, checkMsisdn } = api

export async function getMsisdnAC (dispatch, payload, options) {
  await getMsisdnRequest(dispatch, payload, options)
}

async function getMsisdnRequest (dispatch, params, options) {
  dispatch({ type: GET_MSISDN })
  const { checkIsNotificationEnabled } = options
  try {
    const response = await getMsisdn(params)
    const { data, status } = response
    const { result, action } = processRestRequestResult(data, status, GET_MSISDN, {
      areNotificationsEnabled: checkIsNotificationEnabled(response)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: GET_MSISDN_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function reserveMsisdnAC (dispatch, payload, options) {
  await reserveMsisdnRequest(dispatch, payload, options)
}

async function reserveMsisdnRequest (dispatch, params, options) {
  dispatch({ type: RESERVE_MSISDN })
  const { checkIsNotificationEnabled } = options
  try {
    const response = await reserveMsisdn(params)
    const { data, status } = response

    const { result, action } = processRestRequestResult(data, status, RESERVE_MSISDN, {
      areNotificationsEnabled: checkIsNotificationEnabled(response)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: RESERVE_MSISDN_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}

export async function checkMsisdnAC (dispatch, payload, options) {
  await checkMsisdnRequest(dispatch, payload, options)
}

async function checkMsisdnRequest (dispatch, params, options) {
  dispatch({ type: CHECK_MSISDN })
  const { checkIsNotificationEnabled } = options
  try {
    const response = await checkMsisdn(params)
    const { data, status } = response
    const { result, action } = processRestRequestResult(data, status, CHECK_MSISDN, {
      areNotificationsEnabled: checkIsNotificationEnabled(response)
    })
    dispatch(action)
    return result
  } catch (exception) {
    dispatch({ type: CHECK_ADDRESS_FAILURE, payload: exception.message })
    showErrorNotification(`Ошибка. ${exception.message}`)
    return null
  }
}
