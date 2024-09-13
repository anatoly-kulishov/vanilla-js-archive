import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

import {
  HISTORY_INTERACTIONS_FETCH_SUCCESS,
  HISTORY_INTERACTIONS_FETCH_ERROR,
  HISTORY_INTERACTIONS_FETCH_FAILURE
} from 'reducers/history/historyInteractionsReducer'
import { notification } from 'antd'

const { fetchInteractionsHistory } = api

export function * historyInteractionsSaga ({ payload }) {
  const { reasonId, categoryId, beginDate, endDate, requestType, clientId, branchId, msisdn, email, clientViewType } =
    payload
  const message = 'История причин обращения'

  try {
    const { data } = yield call(fetchInteractionsHistory, {
      reasonId,
      categoryId,
      beginDate,
      endDate,
      requestType,
      clientId,
      branchId,
      msisdn,
      email: email && encodeURIComponent(email),
      clientViewType
    })
    if (data.IsSuccess) {
      yield put({ type: HISTORY_INTERACTIONS_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: HISTORY_INTERACTIONS_FETCH_FAILURE, payload: { error: data } })
      notification.warn({
        message,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: HISTORY_INTERACTIONS_FETCH_ERROR, payload: { error: exception.message } })
    notification.error({
      message,
      description: exception.message
    })
  }
}
