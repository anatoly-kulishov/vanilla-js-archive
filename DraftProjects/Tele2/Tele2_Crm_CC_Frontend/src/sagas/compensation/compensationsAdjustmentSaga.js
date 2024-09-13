import { call, put } from 'redux-saga/effects'
import api from 'utils/api'
import { notification } from 'antd'

import {
  FETCH_PAYMENTS_LIST_SUCCESS,
  FETCH_PAYMENTS_LIST_ERROR,
  FETCH_PAYMENTS_LIST_FAILURE,
  ADJUST_PAYMENT_SUCCESS,
  ADJUST_PAYMENT_ERROR,
  ADJUST_PAYMENT_FAILURE,
  FETCH_INVALID_SUBSCRIBER_INFO_SUCCESS,
  FETCH_INVALID_SUBSCRIBER_INFO_ERROR,
  FETCH_INVALID_SUBSCRIBER_INFO_FAILURE,
  FETCH_VALID_SUBSCRIBER_INFO_SUCCESS,
  FETCH_VALID_SUBSCRIBER_INFO_ERROR,
  FETCH_VALID_SUBSCRIBER_INFO_FAILURE,
  FETCH_INVALID_SUBSCRIBER_BALANCE_SUCCESS,
  FETCH_INVALID_SUBSCRIBER_BALANCE_ERROR,
  FETCH_INVALID_SUBSCRIBER_BALANCE_FAILURE,
  FETCH_VALID_SUBSCRIBER_BALANCE_SUCCESS,
  FETCH_VALID_SUBSCRIBER_BALANCE_ERROR,
  FETCH_VALID_SUBSCRIBER_BALANCE_FAILURE
} from 'reducers/compensation/compensationsAdjustmentReducer'

const { fetchPaymentHistory, fetchAdjustmentPayment, fetchPersonalInfo, fetchBalances } = api

export function * fetchPaymentsListSaga ({ payload }) {
  try {
    const { data } = yield call(fetchPaymentHistory, payload)
    const { Data } = data

    if (data.IsSuccess) {
      yield put({ type: FETCH_PAYMENTS_LIST_SUCCESS, payload: Data })
    } else {
      yield put({ type: FETCH_PAYMENTS_LIST_ERROR })
      notification.error({
        message: `При получении данных о платежах произошла ошибка, обратитесь к администратору`,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_PAYMENTS_LIST_FAILURE, message: exception.message })
    notification.error({
      message: `При получении данных о платежах произошла ошибка, обратитесь к администратору`,
      description: exception.message
    })
  }
}

export function * adjustmentPaymentSaga ({ payload }) {
  try {
    const { data } = yield call(fetchAdjustmentPayment, payload)

    if (data.IsSuccess) {
      yield put({ type: ADJUST_PAYMENT_SUCCESS, payload: data.Data })
      notification.success({
        message: `Корректировка платежа`,
        description: data.Data.ResultText
      })
    } else {
      yield put({ type: ADJUST_PAYMENT_ERROR })
      notification.error({
        message: `Корректировка платежа`,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: ADJUST_PAYMENT_FAILURE, message: exception.message })
    notification.error({
      message: `Корректировка платежа`,
      description: exception.message
    })
  }
}

export function * fetchInvalidSubscriberInfoSaga ({ payload }) {
  try {
    const { data } = yield call(fetchPersonalInfo, payload)
    const { Data } = data

    if (data.IsSuccess) {
      yield put({
        type: FETCH_INVALID_SUBSCRIBER_INFO_SUCCESS,
        payload: Data
      })
    } else {
      yield put({ type: FETCH_INVALID_SUBSCRIBER_INFO_ERROR })
      notification.error({
        message: `При получении данных по ошибочному абоненту произошла ошибка, обратитесь к администратору`,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_INVALID_SUBSCRIBER_INFO_FAILURE, message: exception.message })
    notification.error({
      message: `При получении данных по ошибочному абоненту произошла ошибка, обратитесь к администратору`,
      description: exception.message
    })
  }
}

export function * fetchValidSubscriberInfoSaga ({ payload }) {
  try {
    const { data } = yield call(fetchPersonalInfo, payload)
    const { Data } = data

    if (data.IsSuccess) {
      yield put({
        type: FETCH_VALID_SUBSCRIBER_INFO_SUCCESS,
        payload: Data
      })
    } else {
      yield put({ type: FETCH_VALID_SUBSCRIBER_INFO_ERROR })
      notification.error({
        message: `При получении данных по верному абоненту произошла ошибка, обратитесь к администратору`,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_VALID_SUBSCRIBER_INFO_FAILURE, message: exception.message })
    notification.error({
      message: `При получении данных по верному абоненту произошла ошибка, обратитесь к администратору`,
      description: exception.message
    })
  }
}

export function * fetchInvalidSubscriberBalanceSaga ({ payload }) {
  try {
    const { data } = yield call(fetchBalances, payload)
    const {
      data: {
        subscriber: { subscriberBalances }
      }
    } = data

    const { mainClientBalances, sum } = subscriberBalances
    const balances = [...mainClientBalances, { balanceName: 'Сумма', balanceAmount: sum }]

    if (data.isSuccess) {
      yield put({
        type: FETCH_INVALID_SUBSCRIBER_BALANCE_SUCCESS,
        payload: balances
      })
    } else {
      yield put({ type: FETCH_INVALID_SUBSCRIBER_BALANCE_ERROR })
      notification.error({
        message: `При получении баланса ошибочного абонента произошла ошибка, обратитесь к администратору`,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_INVALID_SUBSCRIBER_BALANCE_FAILURE, message: exception.message })
    notification.error({
      message: `При получении баланса ошибочного абонента произошла ошибка, обратитесь к администратору`,
      description: exception.message
    })
  }
}

export function * fetchValidSubscriberBalanceSaga ({ payload }) {
  try {
    const { data } = yield call(fetchBalances, payload)
    const {
      data: {
        subscriber: { subscriberBalances }
      }
    } = data

    const { mainClientBalances, sum } = subscriberBalances
    const balances = [...mainClientBalances, { balanceName: 'Сумма', balanceAmount: sum }]

    if (data.isSuccess) {
      yield put({
        type: FETCH_VALID_SUBSCRIBER_BALANCE_SUCCESS,
        payload: balances
      })
    } else {
      yield put({ type: FETCH_VALID_SUBSCRIBER_BALANCE_ERROR })
      notification.error({
        message: `При получении баланса верного абонента произошла ошибка, обратитесь к администратору`,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_VALID_SUBSCRIBER_BALANCE_FAILURE, message: exception.message })
    notification.error({
      message: `При получении баланса верного абонента произошла ошибка, обратитесь к администратору`,
      description: exception.message
    })
  }
}
