import { call, put, take } from 'redux-saga/effects'

import {
  CONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS,
  CONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS_ERROR,
  CONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS_SUCCESS,
  CONNECT_CUSTOMER_SEGMENTS_WS,
  CONNECT_CUSTOMER_SEGMENTS_WS_ERROR,
  CONNECT_CUSTOMER_SEGMENTS_WS_SUCCESS,
  CUSTOMER_SEGMENTS_DATA_RECEIVED,
  CUSTOMER_SEGMENTS_PREVIEW_DATA_RECEIVED,
  DISCONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS,
  DISCONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS_SUCCESS,
  DISCONNECT_CUSTOMER_SEGMENTS_WS,
  DISCONNECT_CUSTOMER_SEGMENTS_WS_SUCCESS
} from 'reducers/person/customerSegmentsReducer'

import api from 'utils/api'
import { connectWsSaga, wsListeningSaga } from 'utils/helpers/wsHelper'

const { getCustomersSegmentsPreview, getCustomerSegments } = api

export function * connectCustomerSegmentsPreviewWsSaga ({ payload }) {
  const sagas = [wsListeningSaga, receiveCustomerSegmentsPreviewSaga]

  const actions = {
    connectType: CONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS,
    connectTypeError: CONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS_ERROR,
    connectTypeSuccess: CONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS_SUCCESS,
    disconnectType: DISCONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS,
    disconnectTypeSuccess: DISCONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS_SUCCESS,
    receiveDataType: CUSTOMER_SEGMENTS_PREVIEW_DATA_RECEIVED
  }
  const connectPayload = { wsMethod: getCustomersSegmentsPreview, sagas, actions, params: payload }

  yield call(connectWsSaga, connectPayload)
}

export function * receiveCustomerSegmentsPreviewSaga ({ payload }) {
  const { actions } = payload
  const { receiveDataType, disconnectType } = actions

  while (true) {
    const { payload } = yield take(receiveDataType)
    const { IsCustomerFullMarkers } = payload ?? {}

    if (IsCustomerFullMarkers) {
      yield put({ type: disconnectType })
    }
  }
}

export function * connectCustomerSegmentsWsSaga ({ payload }) {
  const sagas = [wsListeningSaga, receiveCustomerSegmentsSaga]
  const actions = {
    connectType: CONNECT_CUSTOMER_SEGMENTS_WS,
    connectTypeError: CONNECT_CUSTOMER_SEGMENTS_WS_ERROR,
    connectTypeSuccess: CONNECT_CUSTOMER_SEGMENTS_WS_SUCCESS,
    disconnectType: DISCONNECT_CUSTOMER_SEGMENTS_WS,
    disconnectTypeSuccess: DISCONNECT_CUSTOMER_SEGMENTS_WS_SUCCESS,
    receiveDataType: CUSTOMER_SEGMENTS_DATA_RECEIVED
  }
  const connectPayload = { wsMethod: getCustomerSegments, sagas, actions, params: payload }

  yield call(connectWsSaga, connectPayload)
}

export function * receiveCustomerSegmentsSaga ({ payload }) {
  const { actions } = payload
  const { receiveDataType, disconnectType } = actions

  while (true) {
    const { payload } = yield take(receiveDataType)
    const { IsCustomerFullSegments } = payload ?? {}

    if (IsCustomerFullSegments) {
      yield put({ type: disconnectType })
    }
  }
}
