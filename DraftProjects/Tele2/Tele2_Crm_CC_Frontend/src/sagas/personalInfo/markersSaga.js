import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

import {
  GET_RTK_SEGMENT_SUCCESS,
  GET_RTK_SEGMENT_ERROR,
  GET_RTK_SEGMENT_FAILURE
} from 'reducers/personalInfo/markersReducer'
import { ADD_NOTIFICATION } from 'reducers/internal/notifications'
import { NONE } from 'constants/redirectTypes'

const { getRtkSegment } = api

export function * getRtkSegmentSaga ({ payload }) {
  try {
    const { data } = yield call(getRtkSegment, payload)
    if (data.IsSuccess) {
      yield put({ type: GET_RTK_SEGMENT_SUCCESS })
      if (data.Data) {
        yield put({
          type: ADD_NOTIFICATION,
          payload: {
            description: data.Data,
            type: 'info',
            redirectType: NONE
          }
        })
      }
    } else {
      yield put({ type: GET_RTK_SEGMENT_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: GET_RTK_SEGMENT_FAILURE, message: exception.message })
  }
}
