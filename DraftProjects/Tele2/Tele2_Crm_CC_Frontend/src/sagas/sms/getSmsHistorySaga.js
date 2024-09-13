import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

import {
  GET_SMS_HISTORY_FETCH_SUCCESS,
  GET_SMS_HISTORY_FETCH_ERROR,
  GET_SMS_HISTORY_FETCH_FAILURE
} from 'reducers/sms/getSmsHistoryReducer'
import { notification } from 'antd'

const { fetchSmsHistory } = api

export function * getSmsHistorySaga ({ payload: { msisdn, show, status, startDate, endDate, handlingId } }) {
  const message = 'История SMS от оператора'

  try {
    const { data } = yield call(fetchSmsHistory, { msisdn, show, status, startDate, endDate, handlingId })
    if (data.IsSuccess) {
      yield put({ type: GET_SMS_HISTORY_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: GET_SMS_HISTORY_FETCH_ERROR, payload: data })
      notification.warn({ message, description: data.MessageText })
    }
  } catch (exception) {
    yield put({ type: GET_SMS_HISTORY_FETCH_FAILURE, message: exception.message })
    notification.error({ message, description: exception.message })
  }
}
