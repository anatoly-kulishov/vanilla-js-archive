import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'
import { isNil } from 'lodash'
import api from 'utils/api'

import {
  REMAINS_DETAILS_DATA_FETCH_SUCCESS,
  REMAINS_DETAILS_DATA_FETCH_ERROR,
  REMAINS_DETAILS_DATA_FETCH_FAILURE,
  REMAINS_SUBSCRIBER_SERVICES_FETCH,
  REMAINS_SUBSCRIBER_SERVICES_FETCH_SUCCESS,
  REMAINS_SUBSCRIBER_SERVICES_FETCH_ERROR,
  REMAINS_SUBSCRIBER_SERVICES_FETCH_FAILURE,
  REMAINS_QUANTUM_DATA_FETCH_SUCCESS,
  REMAINS_QUANTUM_DATA_FETCH_ERROR,
  REMAINS_QUANTUM_DATA_FETCH_FAILURE,
  UNPAID_CHARGE_DATA_FETCH_SUCCESS,
  UNPAID_CHARGE_DATA_FETCH_ERROR,
  UNPAID_CHARGE_DATA_FETCH_FAILURE,
  UNPAID_CHARGE_DATA_FETCH_AND_SHOW_ALERT_SUCCESS,
  UNPAID_CHARGE_DATA_FETCH_AND_SHOW_ALERT_ERROR,
  UNPAID_CHARGE_DATA_FETCH_AND_SHOW_ALERT_FAILURE,
  REMAINS_MIXX_BALANCE_FETCH_SUCCESS,
  REMAINS_MIXX_BALANCE_FETCH_ERROR,
  REMAINS_MIXX_BALANCE_FETCH_FAILURE
} from 'reducers/finance/remainsReducer'
import { formatWarnings } from 'utils/helpers'

const { fetchRemainsDetailsData, fetchSubscriberServices, fetchQuantumData, fetchUnpaidChargeData, fetchMixxBalance } =
  api

const message = 'Параметры списания'

export function * fetchRemainsDetailsDataSaga ({ payload }) {
  try {
    const { msisdn, ...params } = payload
    const response = yield call(fetchRemainsDetailsData, msisdn, params)
    if (response.status === 200) {
      yield put({
        type: REMAINS_DETAILS_DATA_FETCH_SUCCESS,
        payload: { Data: response?.data, IsSuccess: true, MessageText: response?.data?.Message }
      })
      if (!isNil(response?.data)) {
        const { BillingServiceId } = response?.data

        yield put({
          type: REMAINS_SUBSCRIBER_SERVICES_FETCH,
          payload: { msisdn, billingServiceId: BillingServiceId }
        })
      }
    } else {
      yield put({
        type: REMAINS_DETAILS_DATA_FETCH_ERROR,
        payload: { Data: response?.data, IsSuccess: false, MessageText: response?.data?.Message }
      })
    }
  } catch (exception) {
    yield put({ type: REMAINS_DETAILS_DATA_FETCH_FAILURE, message: exception.message })
  }
}

export function * fetchSubscriberServicesDataSaga ({ payload }) {
  try {
    const { msisdn, billingServiceId, ...params } = payload
    const response = yield call(fetchSubscriberServices, msisdn, billingServiceId, params)
    if (response.status === 200) {
      yield put({
        type: REMAINS_SUBSCRIBER_SERVICES_FETCH_SUCCESS,
        payload: { Data: response?.data, IsSuccess: true, MessageText: response?.data?.Message }
      })
    } else {
      yield put({
        type: REMAINS_SUBSCRIBER_SERVICES_FETCH_ERROR,
        payload: { Data: response?.data, IsSuccess: false, MessageText: response?.data?.Message }
      })
    }
  } catch (exception) {
    yield put({ type: REMAINS_SUBSCRIBER_SERVICES_FETCH_FAILURE, message: exception.message })
  }
}

export function * fetchQuantumDataSaga ({ payload }) {
  try {
    const { msisdn, ...params } = payload
    const response = yield call(fetchQuantumData, msisdn, params)
    if (response.status === 200) {
      yield put({
        type: REMAINS_QUANTUM_DATA_FETCH_SUCCESS,
        payload: { Data: response?.data, IsSuccess: true, MessageText: response?.data?.Message }
      })
    } else {
      yield put({
        type: REMAINS_QUANTUM_DATA_FETCH_ERROR,
        payload: { Data: response?.data, IsSuccess: false, MessageText: response?.data?.Message }
      })
    }
  } catch (exception) {
    yield put({ type: REMAINS_QUANTUM_DATA_FETCH_FAILURE, message: exception.message })
  }
}

export function * fetchUnpaidChargeDataSaga ({ payload }) {
  try {
    const { msisdn, ...params } = payload
    const response = yield call(fetchUnpaidChargeData, msisdn, params)
    if (response.status === 200) {
      yield put({
        type: UNPAID_CHARGE_DATA_FETCH_SUCCESS,
        payload: { Data: response?.data, IsSuccess: true, MessageText: response?.data?.Message }
      })
    } else {
      yield put({
        type: UNPAID_CHARGE_DATA_FETCH_ERROR,
        payload: { Data: response?.data, IsSuccess: false, MessageText: response?.data?.Message }
      })
      notification.error({
        message: message,
        description: response?.data?.Message
      })
    }
  } catch (exception) {
    yield put({ type: UNPAID_CHARGE_DATA_FETCH_FAILURE, message: exception.message })
    notification.error({
      message: message,
      description: 'Ошибка получения параметров списания'
    })
  }
}

export function * fetchUnpaidChargeDataAndShowAlertSaga ({ payload }) {
  try {
    const { msisdn, ...params } = payload
    const response = yield call(fetchUnpaidChargeData, msisdn, params)
    if (response.status === 200) {
      yield put({ type: UNPAID_CHARGE_DATA_FETCH_AND_SHOW_ALERT_SUCCESS })
      if (response?.data && response?.data?.ServiceStatusText) {
        notification.warning({
          message: message,
          description: response?.data?.ServiceStatusText
        })
      }
    } else {
      yield put({ type: UNPAID_CHARGE_DATA_FETCH_AND_SHOW_ALERT_ERROR })
      notification.error({
        message: message,
        description: response?.data?.Message
      })
    }
  } catch (exception) {
    yield put({ type: UNPAID_CHARGE_DATA_FETCH_AND_SHOW_ALERT_FAILURE, message: exception.message })
    notification.error({
      message: message,
      description: 'Ошибка получения параметров списания'
    })
  }
}

export function * fetchMixxBalanceSaga ({ payload }) {
  const errorMessage = 'Ошибка при получении накопленных Гб'
  try {
    const { data, status } = yield call(fetchMixxBalance, payload)
    const { Message, Warnings } = data

    switch (status) {
      case 200:
        yield put({ type: REMAINS_MIXX_BALANCE_FETCH_SUCCESS, payload: parseFloat(data.Data[0].MixxCustomerData) })
        break
      default:
        yield put({ type: REMAINS_MIXX_BALANCE_FETCH_ERROR, message: Message || errorMessage })
        notification.error({
          message: errorMessage,
          description: Warnings ? formatWarnings(Warnings) : 'Что-то пошло не так'
        })
    }
  } catch ({ message }) {
    yield put({ type: REMAINS_MIXX_BALANCE_FETCH_FAILURE, message })
    notification.error({
      message: errorMessage,
      description: message
    })
  }
}
