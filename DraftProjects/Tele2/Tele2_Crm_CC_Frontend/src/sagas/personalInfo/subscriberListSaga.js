import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

import {
  SUBSCRIBER_LIST_FETCH_SUCCESS,
  SUBSCRIBER_LIST_FETCH_ERROR,
  SUBSCRIBER_LIST_FETCH_FAILURE,
  SUBSCRIBER_STATUSES_FETCH_SUCCESS,
  SUBSCRIBER_STATUSES_FETCH_ERROR,
  SUBSCRIBER_STATUSES_FETCH_FAILURE
} from 'reducers/personalInfo/subscriberListReducer'

const { fetchSubscriberList, fetchSubscriberStatuses } = api

export function * fetchSubscriberListSaga ({ payload }) {
  try {
    const { data } = yield call(fetchSubscriberList, payload)
    if (data.IsSuccess) {
      yield put({ type: SUBSCRIBER_LIST_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: SUBSCRIBER_LIST_FETCH_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: SUBSCRIBER_LIST_FETCH_FAILURE, message: exception.message })
  }
}

export function * fetchSubscriberStatusesSaga () {
  try {
    const { data } = yield call(fetchSubscriberStatuses)
    if (data.IsSuccess) {
      yield put({ type: SUBSCRIBER_STATUSES_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: SUBSCRIBER_STATUSES_FETCH_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: SUBSCRIBER_STATUSES_FETCH_FAILURE, message: exception.message })
  }
}
