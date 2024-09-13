import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'

import {
  BALANCE_FETCH,
  CLIENT_BALANCE_FETCH,
  BALANCE_FETCH_SUCCESS,
  BALANCE_FETCH_ERROR,
  BALANCE_FETCH_FAILURE,

  TRUST_CREDIT_HISTORY_FETCH_SUCCESS,
  TRUST_CREDIT_HISTORY_FETCH_ERROR,
  TRUST_CREDIT_HISTORY_FETCH_FAILURE,

  TRUST_CREDIT_REASONS_HISTORY_FETCH_SUCCESS,
  TRUST_CREDIT_REASONS_HISTORY_FETCH_ERROR,
  TRUST_CREDIT_REASONS_HISTORY_FETCH_FAILURE,

  TRUST_CREDIT_INFO_FETCH,
  TRUST_CREDIT_INFO_FETCH_SUCCESS,
  TRUST_CREDIT_INFO_FETCH_ERROR,
  TRUST_CREDIT_INFO_FETCH_FAILURE,

  DEACIVATE_TRUST_CREDIT_FETCH_SUCCESS,
  DEACIVATE_TRUST_CREDIT_FETCH_ERROR,
  DEACIVATE_TRUST_CREDIT_FETCH_FAILURE,

  ACIVATE_TRUST_CREDIT_FETCH_SUCCESS,
  ACIVATE_TRUST_CREDIT_FETCH_ERROR,
  ACIVATE_TRUST_CREDIT_FETCH_FAILURE,

  ADD_CONTENT_BALANCE_FETCH_SUCCESS,
  ADD_CONTENT_BALANCE_FETCH_ERROR,
  ADD_CONTENT_BALANCE_FETCH_FAILURE,

  CLOSE_CONTENT_BALANCE_FETCH_SUCCESS,
  CLOSE_CONTENT_BALANCE_FETCH_ERROR,
  CLOSE_CONTENT_BALANCE_FETCH_FAILURE,

  CONTENT_BALANCE_HISTORY_FETCH_SUCCESS,
  CONTENT_BALANCE_HISTORY_FETCH_ERROR,
  CONTENT_BALANCE_HISTORY_FETCH_FAILURE
} from 'reducers/finance/balanceReducer'

export function * fetchBalancesSaga ({ type, payload }) {
  const { fetchBalances, fetchClientBalances } = api

  try {
    let response
    switch (type) {
      case BALANCE_FETCH:
        response = yield call(fetchBalances, payload)
        break
      case CLIENT_BALANCE_FETCH:
        response = yield call(fetchClientBalances, payload)
    }
    response?.data?.isSuccess
      ? yield put({ type: BALANCE_FETCH_SUCCESS, payload: response?.data })
      : yield put({ type: BALANCE_FETCH_ERROR, payload: response?.data })
  } catch (exception) {
    yield put({ type: BALANCE_FETCH_FAILURE, payload: { payload: { message: exception.message } } })
  }
}

export function * fetchTrustCreditHistorySaga ({ payload }) {
  const { fetchTrustCreditHistory } = api

  try {
    const { data } = yield call(fetchTrustCreditHistory, payload)
    if (data.isSuccess) {
      yield put({ type: TRUST_CREDIT_HISTORY_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: TRUST_CREDIT_HISTORY_FETCH_ERROR, payload: data })
      notification.error({
        message: 'История кредитного лимита',
        description: data.messageText
      })
    }
  } catch (exception) {
    yield put({ type: TRUST_CREDIT_HISTORY_FETCH_FAILURE, payload: { payload: { message: exception.message } } })
  }
}

export function * fetchTrustCreditReasonsHistorySaga ({ payload }) {
  const { fetchHistoryChangeReasons } = api

  try {
    const { data } = yield call(fetchHistoryChangeReasons, payload)
    data.isSuccess
      ? yield put({ type: TRUST_CREDIT_REASONS_HISTORY_FETCH_SUCCESS, payload: data })
      : yield put({ type: TRUST_CREDIT_REASONS_HISTORY_FETCH_ERROR, payload: data })
  } catch (exception) {
    yield put({ type: TRUST_CREDIT_REASONS_HISTORY_FETCH_FAILURE, payload: { payload: { message: exception.message } } })
  }
}

export function * fetchTrustCreditInfoSaga ({ payload }) {
  const { fetchTrustCreditInfo } = api

  try {
    const { data } = yield call(fetchTrustCreditInfo, payload)
    data.isSuccess
      ? yield put({ type: TRUST_CREDIT_INFO_FETCH_SUCCESS, payload: data })
      : yield put({ type: TRUST_CREDIT_INFO_FETCH_ERROR, payload: data })
  } catch (exception) {
    yield put({ type: TRUST_CREDIT_INFO_FETCH_FAILURE, payload: { payload: { message: exception.message } } })
  }
}

export function * fetchDeactivateTrustCreditSaga ({ payload }) {
  const { fetchDeactivateTrustCredit } = api

  try {
    const { data } = yield call(fetchDeactivateTrustCredit, payload)
    if (data.isSuccess) {
      yield put({ type: DEACIVATE_TRUST_CREDIT_FETCH_SUCCESS, payload: data })
      yield put({ type: TRUST_CREDIT_INFO_FETCH, payload })
    } else {
      yield put({ type: DEACIVATE_TRUST_CREDIT_FETCH_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: DEACIVATE_TRUST_CREDIT_FETCH_FAILURE, payload: { message: exception.message } })
  }
}

export function * fetchActivateTrustCreditSaga ({ payload }) {
  const { fetchActivateTrustCredit } = api

  try {
    const { data } = yield call(fetchActivateTrustCredit, payload)
    if (data.isSuccess) {
      yield put({ type: ACIVATE_TRUST_CREDIT_FETCH_SUCCESS, payload: data })
      yield put({ type: TRUST_CREDIT_INFO_FETCH, payload })
    } else {
      yield put({ type: ACIVATE_TRUST_CREDIT_FETCH_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: ACIVATE_TRUST_CREDIT_FETCH_FAILURE, payload: { message: exception.message } })
  }
}

export function * fetchAddContentBalanceSaga ({ payload }) {
  const { fetchAddContentBalance } = api
  const { balanceParams, ...addBalanceParams } = payload

  try {
    const { data } = yield call(fetchAddContentBalance, addBalanceParams)
    if (data.isSuccess) {
      yield put({ type: ADD_CONTENT_BALANCE_FETCH_SUCCESS, payload: data })
      yield put({ type: BALANCE_FETCH, payload: balanceParams })
    } else {
      yield put({ type: ADD_CONTENT_BALANCE_FETCH_ERROR, payload: data })
      notification.error({
        message: 'Подключение контентного баланса',
        description: data.messageText
      })
    }
  } catch (exception) {
    yield put({ type: ADD_CONTENT_BALANCE_FETCH_FAILURE, payload: { message: exception.message } })
  }
}

export function * fetchCloseContentBalanceSaga ({ payload }) {
  const { fetchCloseContentBalance } = api
  const { balanceParams, ...closeBalanceParams } = payload

  try {
    const { data } = yield call(fetchCloseContentBalance, closeBalanceParams)
    if (data.isSuccess) {
      yield put({ type: CLOSE_CONTENT_BALANCE_FETCH_SUCCESS, payload: data })
      yield put({ type: BALANCE_FETCH, payload: balanceParams })
    } else {
      yield put({ type: CLOSE_CONTENT_BALANCE_FETCH_ERROR, payload: data })
      notification.error({
        message: 'Отключение контентного баланса',
        description: data.messageText
      })
    }
  } catch (exception) {
    yield put({ type: CLOSE_CONTENT_BALANCE_FETCH_FAILURE, payload: { message: exception.message } })
  }
}

export function * fetchContentBalanceHistorySaga ({ payload }) {
  const { fetchContentBalanceHistory } = api

  try {
    const { data } = yield call(fetchContentBalanceHistory, payload)
    if (data.isSuccess) {
      yield put({ type: CONTENT_BALANCE_HISTORY_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: CONTENT_BALANCE_HISTORY_FETCH_ERROR, payload: data })
      notification.error({
        message: 'История контентного баланса',
        description: data.messageText
      })
    }
  } catch (exception) {
    yield put({ type: CONTENT_BALANCE_HISTORY_FETCH_FAILURE, payload: { message: exception.message } })
  }
}
