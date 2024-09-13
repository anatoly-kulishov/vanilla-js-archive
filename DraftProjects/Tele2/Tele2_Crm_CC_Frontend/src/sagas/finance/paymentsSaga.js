import { call, put, select } from 'redux-saga/effects'
import { notification } from 'antd'

import api from 'utils/api'
import open from 'utils/helpers/windowOpener'

import {
  PAYMENTS_HISTORY_FETCH_SUCCESS,
  PAYMENTS_HISTORY_FETCH_ERROR,
  PAYMENTS_HISTORY_FETCH_FAILURE,
  PAYMENTS_HISTORY_FILTERS_FETCH_SUCCESS,
  PAYMENTS_HISTORY_FILTERS_FETCH_ERROR,
  PAYMENTS_HISTORY_FILTERS_FETCH_FAILURE,
  PAYMENTS_URL_FETCH_SUCCESS,
  PAYMENTS_URL_FETCH_ERROR,
  PAYMENTS_URL_FETCH_FAILURE,
  INVOICES_HISTORY_FETCH_SUCCESS,
  INVOICES_HISTORY_FETCH_ERROR,
  INVOICES_HISTORY_FETCH_FAILURE,
  COSTS_HISTORY_FETCH_SUCCESS,
  COSTS_HISTORY_FETCH_ERROR,
  COSTS_HISTORY_FETCH_FAILURE,
  RESOURCES_HISTORY_FETCH_SUCCESS,
  RESOURCES_HISTORY_FETCH_ERROR,
  RESOURCES_HISTORY_FETCH_FAILURE,
  DIGEST_ID_FETCH_SUCCESS,
  DIGEST_ID_FETCH_ERROR,
  DIGEST_ID_FETCH_FAILURE,
  REDIRECT_PAYMENTS_URL_SUCCESS,
  REDIRECT_PAYMENTS_URL_ERROR,
  REDIRECT_PAYMENTS_URL_FAILURE
} from 'reducers/finance/paymentsReducer'

import { getQueryParamsState, getPersonalAccountState } from 'selectors'

export function * fetchPaymentsSaga ({ payload }) {
  const { Msisdn } = yield select(getPersonalAccountState)
  const { fetchPaymentHistory } = api
  const message = 'Движение средств: платежи'

  try {
    const { handlingTechId } = yield select(getQueryParamsState)
    const { data } = yield call(fetchPaymentHistory, { handlingTechId, Msisdn, ...payload })
    if (data.IsSuccess) {
      yield put({ type: PAYMENTS_HISTORY_FETCH_SUCCESS, payload: data })
      if (data.MessageText) {
        notification.warning({
          message: message,
          description: data.MessageText
        })
      }
    } else {
      yield put({ type: PAYMENTS_HISTORY_FETCH_ERROR, payload: data })
      notification.error({
        message: message,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: PAYMENTS_HISTORY_FETCH_FAILURE, message: exception.message })
    notification.error({
      message: message,
      description: exception.message
    })
  }
}

export function * fetchPaymentsFiltersSaga ({ payload }) {
  const { fetchPaymentHistoryFilters } = api

  try {
    const { data } = yield call(fetchPaymentHistoryFilters, payload)
    if (data.IsSuccess) {
      yield put({ type: PAYMENTS_HISTORY_FILTERS_FETCH_SUCCESS, payload: { ...payload, ...data } })
    } else {
      yield put({ type: PAYMENTS_HISTORY_FILTERS_FETCH_ERROR, payload: data })
      notification.error({
        message: 'Движение средств: фильтры истории платежей',
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: PAYMENTS_HISTORY_FILTERS_FETCH_FAILURE, message: exception.message })
    notification.error({
      message: 'Движение средств: фильтры истории платежей',
      description: exception.message
    })
  }
}

export function * fetchPaymentsUrl ({ payload }) {
  const { fetchPaymentDocumentsUrl } = api
  try {
    const { data } = yield call(fetchPaymentDocumentsUrl, payload)
    if (data.IsSuccess) {
      yield put({ type: PAYMENTS_URL_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: PAYMENTS_URL_FETCH_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: PAYMENTS_URL_FETCH_FAILURE, message: exception.message })
    notification.error({
      message: 'Движение средств: отчетные документы',
      description: exception.message
    })
  }
}

export function * fetchPaymentsUrlAndRedirect ({ payload }) {
  const { fetchPaymentDocumentsUrl } = api
  const message = 'Движение средств: отчетные документы'

  try {
    const { data } = yield call(fetchPaymentDocumentsUrl, payload)
    if (data.IsSuccess) {
      yield put({ type: REDIRECT_PAYMENTS_URL_SUCCESS, payload: data })
      const { Data: { Url } } = data
      if (Url) open(Url)
    } else {
      yield put({ type: REDIRECT_PAYMENTS_URL_ERROR, payload: data })
      notification.error({
        message: message,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: REDIRECT_PAYMENTS_URL_FAILURE, message: exception.message })
    notification.error({
      message: message,
      description: exception.message
    })
  }
}

export function * fetchInvoicesSaga ({ payload }) {
  const { fetchInvoicesHistory } = api

  try {
    const { data } = yield call(fetchInvoicesHistory, payload)
    if (data.IsSuccess) {
      yield put({ type: INVOICES_HISTORY_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: INVOICES_HISTORY_FETCH_ERROR, payload: data })
      notification.error({
        message: 'Движение средств: счета',
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: INVOICES_HISTORY_FETCH_FAILURE, message: exception.message })
    notification.error({
      message: 'Движение средств: счета',
      description: exception.message
    })
  }
}

export function * fetchResourcesSaga ({ payload }) {
  const { fetchResourcesHistory } = api
  const message = 'Движение средств: средства'
  try {
    const { data } = yield call(fetchResourcesHistory, payload)
    if (data.IsSuccess) {
      yield put({ type: RESOURCES_HISTORY_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: RESOURCES_HISTORY_FETCH_ERROR, payload: data })
      notification.error({
        message: message,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: RESOURCES_HISTORY_FETCH_FAILURE, message: exception.message })
    notification.error({
      message: message,
      description: exception.message
    })
  }
}

export function * fetchDigestIdSaga ({ payload }) {
  const { fetchDigestId } = api
  const message = 'Движение средств: средства'
  try {
    const { data } = yield call(fetchDigestId, payload)
    if (data.IsSuccess) {
      yield put({ type: DIGEST_ID_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: DIGEST_ID_FETCH_ERROR, payload: data })
      notification.error({
        message: message,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: DIGEST_ID_FETCH_FAILURE, message: exception.message })
    notification.error({
      message: message,
      description: exception.message
    })
  }
}

export function * fetchCostsSaga ({ payload }) {
  const { fetchCostsHistory } = api
  const message = 'Движение средств: расходы'

  try {
    const { data } = yield call(fetchCostsHistory, payload)
    if (data.IsSuccess) {
      yield put({ type: COSTS_HISTORY_FETCH_SUCCESS, payload: data })
      if (data.MessageText) {
        notification.warning({
          message: message,
          description: data.MessageText
        })
      }
    } else {
      yield put({ type: COSTS_HISTORY_FETCH_ERROR, payload: data })
      notification.error({
        message: message,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: COSTS_HISTORY_FETCH_FAILURE, message: exception.message })
    notification.error({
      message: message,
      description: exception.message
    })
  }
}
