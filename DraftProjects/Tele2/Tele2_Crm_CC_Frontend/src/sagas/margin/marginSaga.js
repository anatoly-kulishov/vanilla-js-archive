import { call, put } from 'redux-saga/effects'

import { notification } from 'antd'

import api from 'utils/api'

import {
  FETCH_SUBSCRIBER_MARGIN_MARKER_SUCCESS,
  FETCH_SUBSCRIBER_MARGIN_MARKER_ERROR,
  FETCH_SUBSCRIBER_MARGIN_MARKER_FAILURE
} from 'reducers/margin/marginReducer'

export function * fetchSubscriberMarginMarkerSaga ({ payload }) {
  const { fetchSubscriberMarginMarker } = api
  try {
    const {
      data: { Data, IsSuccess, MessageText }, status
    } = yield call(fetchSubscriberMarginMarker, payload)

    if (IsSuccess || status === 200 || status === 406 || status === 409) {
      yield put({ type: FETCH_SUBSCRIBER_MARGIN_MARKER_SUCCESS, payload: { Data, status, MessageText } })
    } else {
      yield put({ type: FETCH_SUBSCRIBER_MARGIN_MARKER_ERROR, payload: MessageText })
      notification.error({
        message: 'Запрос маржинальности',
        description: MessageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_SUBSCRIBER_MARGIN_MARKER_FAILURE, message: exception.message })
    notification.error({
      message: 'Запрос маржинальности',
      description: exception.message
    })
  }
}
