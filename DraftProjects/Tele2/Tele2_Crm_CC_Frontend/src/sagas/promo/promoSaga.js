import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'
import servicesMessageTypes from 'constants/servicesMessageTypes'

import {
  // History
  GET_PROMO_HISTORY_FETCH,
  GET_PROMO_HISTORY_FETCH_SUCCESS,
  GET_PROMO_HISTORY_FETCH_ERROR,
  GET_PROMO_HISTORY_FETCH_FAILURE,
  // Filters
  GET_PROMO_HISTORY_FILTERS_FETCH_SUCCESS,
  GET_PROMO_HISTORY_FILTERS_FETCH_ERROR,
  GET_PROMO_HISTORY_FILTERS_FETCH_FAILURE,
  // Activation
  ACTIVATE_PROMO_FETCH_SUCCESS,
  ACTIVATE_PROMO_FETCH_ERROR,
  ACTIVATE_PROMO_FETCH_FAILURE,
  // Cancelation
  CANCEL_PROMO_FETCH_SUCCESS,
  CANCEL_PROMO_FETCH_ERROR,
  CANCEL_PROMO_FETCH_FAILURE,
  // Notification
  NOTIFY_PROMO_FETCH_SUCCESS,
  NOTIFY_PROMO_FETCH_ERROR,
  NOTIFY_PROMO_FETCH_FAILURE
} from 'reducers/promo/promoReducer'

const {
  fetchPromoCodeHistory,
  fetchPromoCodeHistoryFiltres,
  fetchActivatePromoCode,
  fetchCancelPromoCode,
  fetchNotifyPromoCode
} = api

// Fetch history
export function * fetchPromoHistorySaga ({ payload }) {
  const message = 'История промокодов'

  try {
    const { data } = yield call(fetchPromoCodeHistory, payload)
    switch (data.ResultType) {
      case servicesMessageTypes.success:
        yield put({ type: GET_PROMO_HISTORY_FETCH_SUCCESS, payload: data })
        break
      case servicesMessageTypes.warning:
        yield put({ type: GET_PROMO_HISTORY_FETCH_SUCCESS, payload: data })
        notification.warn({
          message,
          description: data.MessageText
        })
        break
      case servicesMessageTypes.error:
        yield put({ type: GET_PROMO_HISTORY_FETCH_ERROR, payload: data })
        notification.error({
          message,
          description: data.MessageText
        })
        break
      default:
        yield put({ type: GET_PROMO_HISTORY_FETCH_ERROR, payload: null })
        break
    }
  } catch (exception) {
    yield put({ type: GET_PROMO_HISTORY_FETCH_FAILURE, message: exception.message })
    notification.error({
      message,
      description: exception.message
    })
  }
}

// Fetch history filters
export function * fetchPromoHistoryFiltersSaga ({ payload }) {
  try {
    const { data } = yield call(fetchPromoCodeHistoryFiltres, payload)
    switch (data.ResultType) {
      case servicesMessageTypes.success:
        yield put({ type: GET_PROMO_HISTORY_FILTERS_FETCH_SUCCESS, payload: data })
        break
      case servicesMessageTypes.warning:
        yield put({ type: GET_PROMO_HISTORY_FILTERS_FETCH_SUCCESS, payload: data })
        notification.warn({
          message: 'История промокодов',
          description: data.MessageText
        })
        break
      case servicesMessageTypes.error:
        yield put({ type: GET_PROMO_HISTORY_FILTERS_FETCH_ERROR, payload: data })
        break
      default:
        yield put({ type: GET_PROMO_HISTORY_FILTERS_FETCH_ERROR, payload: null })
        break
    }
  } catch (exception) {
    yield put({ type: GET_PROMO_HISTORY_FILTERS_FETCH_FAILURE, message: exception.message })
    notification.error({
      message: 'История промокодов',
      description: exception.message
    })
  }
}

// Activate promocode
export function * fetchPromoActivationSaga ({ payload }) {
  try {
    const { filtersValue, ...requestData } = payload

    const { data } = yield call(fetchActivatePromoCode, requestData)
    switch (data.ResultType) {
      case servicesMessageTypes.success:
        yield put({ type: ACTIVATE_PROMO_FETCH_SUCCESS, payload: data })
        yield put({ type: GET_PROMO_HISTORY_FETCH, payload: filtersValue })
        notification.success({
          message: 'Активация промокода',
          description: data.MessageText
        })
        break
      case servicesMessageTypes.warning:
        yield put({ type: ACTIVATE_PROMO_FETCH_SUCCESS, payload: data })
        notification.warn({
          message: 'Активация промокода',
          description: data.MessageText
        })
        break
      case servicesMessageTypes.error:
        yield put({ type: ACTIVATE_PROMO_FETCH_ERROR, payload: data })
        notification.error({
          message: 'Активация промокода',
          description: data.MessageText
        })
        break
      default:
        yield put({ type: ACTIVATE_PROMO_FETCH_ERROR, payload: null })
        notification.error({
          message: 'Активация промокода',
          description: data.MessageText
        })
        break
    }
  } catch (exception) {
    yield put({ type: ACTIVATE_PROMO_FETCH_FAILURE, message: exception.message })
    notification.error({
      message: 'Активация промокода',
      description: exception.message
    })
  }
}

// Cancel promocode
export function * fetchPromoCancelationSaga ({ payload }) {
  try {
    const { filtersValue, ...requestData } = payload
    const { data } = yield call(fetchCancelPromoCode, requestData)
    switch (data.ResultType) {
      case servicesMessageTypes.success:
        yield put({ type: CANCEL_PROMO_FETCH_SUCCESS, payload: data })
        yield put({ type: GET_PROMO_HISTORY_FETCH, payload: filtersValue })
        notification.success({
          message: 'Отмена промокода',
          description: data.MessageText
        })
        break
      case servicesMessageTypes.warning:
        yield put({ type: CANCEL_PROMO_FETCH_SUCCESS, payload: data })
        notification.warn({
          message: 'Отмена промокода',
          description: data.MessageText
        })
        break
      case servicesMessageTypes.error:
        yield put({ type: CANCEL_PROMO_FETCH_ERROR, payload: data })
        notification.error({
          message: 'Отмена промокода',
          description: data.MessageText
        })
        break
      default:
        yield put({ type: CANCEL_PROMO_FETCH_ERROR, payload: null })
        notification.error({
          message: 'Отмена промокода',
          description: data.MessageText
        })
        break
    }
  } catch (exception) {
    yield put({ type: CANCEL_PROMO_FETCH_FAILURE, message: exception.message })
    notification.error({
      message: 'Отмена промокода',
      description: exception.message
    })
  }
}

// Notify promocode
export function * fetchPromoNotificationSaga ({ payload }) {
  try {
    const { filtersValue, ...requestData } = payload
    const { data } = yield call(fetchNotifyPromoCode, requestData)
    switch (data.ResultType) {
      case servicesMessageTypes.success:
        yield put({ type: NOTIFY_PROMO_FETCH_SUCCESS, payload: data })
        yield put({ type: GET_PROMO_HISTORY_FETCH, payload: filtersValue })
        notification.success({
          message: 'Нотификация о промокоде',
          description: data.MessageText
        })
        break
      case servicesMessageTypes.warning:
        yield put({ type: NOTIFY_PROMO_FETCH_SUCCESS, payload: data })
        notification.warn({
          message: 'Нотификация о промокоде',
          description: data.MessageText
        })
        break
      case servicesMessageTypes.error:
        yield put({ type: NOTIFY_PROMO_FETCH_ERROR, payload: data })
        notification.error({
          message: 'Нотификация о промокоде',
          description: data.MessageText
        })
        break
      default:
        yield put({ type: NOTIFY_PROMO_FETCH_ERROR, payload: null })
        notification.error({
          message: 'Нотификация о промокоде',
          description: data.MessageText
        })
        break
    }
  } catch (exception) {
    yield put({ type: NOTIFY_PROMO_FETCH_FAILURE, message: exception.message })
    notification.error({
      message: 'Нотификация о промокоде',
      description: exception.message
    })
  }
}
