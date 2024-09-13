import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

import {
  FETCH_WG_HISTORY_SUCCESS,
  FETCH_WG_HISTORY_ERROR,
  FETCH_WG_HISTORY_FAILURE
} from 'reducers/history/wgHistoryReducer'
import { notification } from 'antd'

const { fetchWgHistory } = api

export function * fetchWgHistorySaga ({ payload }) {
  const message = 'История Wargaming'
  try {
    const { data } = yield call(fetchWgHistory, payload)
    if (data) {
      yield put({ type: FETCH_WG_HISTORY_SUCCESS, payload: data })
    } else {
      yield put({ type: FETCH_WG_HISTORY_ERROR, payload: { error: data } })
      notification.warn({ message, description: data.MessageText })
    }
  } catch (exception) {
    yield put({ type: FETCH_WG_HISTORY_FAILURE, payload: { error: exception.message } })
    notification.error({ message, description: exception.message })
  }
}
