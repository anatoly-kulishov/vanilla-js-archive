import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'

import api from 'utils/api'
import servicesMessageTypes from 'constants/servicesMessageTypes'
import {
  FETCH_MNP_HISTORY_SUCCESS,
  FETCH_MNP_HISTORY_ERROR,
  FETCH_MNP_HISTORY_FAILURE
} from 'reducers/history/mnpHistoryReducer'

const { fetchProtocol } = api

export function * fetchMnpHistorySaga ({ payload }) {
  const message = 'История MNP'

  try {
    const { data } = yield call(fetchProtocol, payload)
    const Data = data?.Data

    switch (data.ResultType) {
      case servicesMessageTypes.success:
        yield put({ type: FETCH_MNP_HISTORY_SUCCESS, payload: Data })
        break
      case servicesMessageTypes.warning:
        yield put({ type: FETCH_MNP_HISTORY_SUCCESS, payload: Data })
        notification.warn({
          message,
          description: data.MessageText
        })
        break
      case servicesMessageTypes.error:
        yield put({ type: FETCH_MNP_HISTORY_ERROR, payload: data })
        notification.error({
          message,
          description: data.MessageText
        })
        break

      default:
        yield put({ type: FETCH_MNP_HISTORY_ERROR, payload: null })
        notification.error({
          message,
          description: data.MessageText
        })
        break
    }
  } catch (exception) {
    yield put({ type: FETCH_MNP_HISTORY_FAILURE, payload: { error: exception.message } })
    notification.warn({
      message,
      description: exception.message
    })
  }
}
