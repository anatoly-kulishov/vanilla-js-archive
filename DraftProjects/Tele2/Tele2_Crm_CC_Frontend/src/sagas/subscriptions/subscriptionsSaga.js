import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'

import {
  ACTIVE_SUBSCRIPTIONS_INFO_FETCH,
  ACTIVE_SUBSCRIPTIONS_INFO_FETCH_SUCCESS,
  ACTIVE_SUBSCRIPTIONS_INFO_FETCH_ERROR,
  ACTIVE_SUBSCRIPTIONS_INFO_FETCH_FAILURE
} from 'reducers/subscriptions/activeSubscriptionReducer'

import {
  SEND_SMS_FETCH_SUCCESS,
  SEND_SMS_FETCH_ERROR,
  SEND_SMS_FETCH_FAILURE
} from 'reducers/subscriptions/sendSmsReducer'

import {
  UNSUBSCRIBE_FETCH_SUCCESS,
  UNSUBSCRIBE_FETCH_ERROR,
  UNSUBSCRIBE_FETCH_FAILURE,

  FETCH_UNSIBSCRIBE_REASON_SUCCESS,
  FETCH_UNSIBSCRIBE_REASON_ERROR,
  FETCH_UNSIBSCRIBE_REASON_FAILURE
} from 'reducers/subscriptions/unsubscribeReducer'

const {
  fetchSubscriptions,
  sendSubscriptionSms,
  unsubscribe,
  fetchUnsibscribeReasons
} = api

export function * fetchSubscriptionsSaga ({ payload: { msisdn, fromDate, toDate } }) {
  try {
    const { data } = yield call(fetchSubscriptions, { msisdn, fromDate, toDate })
    data.IsSuccess
      ? yield put({ type: ACTIVE_SUBSCRIPTIONS_INFO_FETCH_SUCCESS, payload: data })
      : yield put({ type: ACTIVE_SUBSCRIPTIONS_INFO_FETCH_ERROR, payload: data })
  } catch (exception) {
    yield put({ type: ACTIVE_SUBSCRIPTIONS_INFO_FETCH_FAILURE, message: exception.message })
  }
}

export function * sendSubscriptionSmsSaga ({ payload: { req } }) {
  try {
    const { data } = yield call(sendSubscriptionSms, req)
    if (data.IsSuccess) {
      yield put({ type: SEND_SMS_FETCH_SUCCESS, payload: data })
      notification.open({
        message: `Отправка СМС `,
        description: 'SMS-сообщение отправлено абоненту',
        type: 'info'
      })
    } else {
      yield put({ type: SEND_SMS_FETCH_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: SEND_SMS_FETCH_FAILURE, message: exception.message })
  }
}

export function * unsubscribeSaga ({ payload: { req, msisdn } }) {
  try {
    const { data } = yield call(unsubscribe, req)
    if (data.IsSuccess) {
      yield put({ type: UNSUBSCRIBE_FETCH_SUCCESS, payload: data })
      yield put({ type: ACTIVE_SUBSCRIPTIONS_INFO_FETCH, payload: { msisdn } })
      notification.open({
        message: `Подписки `,
        description: data.MessageText,
        type: 'info'
      })
    } else {
      yield put({ type: UNSUBSCRIBE_FETCH_ERROR, payload: data })
      notification.error({
        message: `Подписки `,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: UNSUBSCRIBE_FETCH_FAILURE, message: exception.message.text })
    notification.error({
      message: `Подписки `,
      description: exception.message.text
    })
  }
}

export function * fetchUnsibscribeReasonsSaga () {
  try {
    const { data } = yield call(fetchUnsibscribeReasons)
    if (data.IsSuccess) {
      yield put({ type: FETCH_UNSIBSCRIBE_REASON_SUCCESS, payload: data.Data })
    } else {
      yield put({ type: FETCH_UNSIBSCRIBE_REASON_ERROR })
    }
  } catch (exception) {
    yield put({ type: FETCH_UNSIBSCRIBE_REASON_FAILURE })
  }
}
