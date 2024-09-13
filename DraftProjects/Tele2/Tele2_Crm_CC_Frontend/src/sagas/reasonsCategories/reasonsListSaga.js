import { call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import api from 'utils/api/reason'

import {
  REASONS_LIST_FETCH_SUCCESS,
  REASONS_LIST_FETCH_ERROR,
  REASONS_LIST_FETCH_FAILURE,
  FILTERED_REASONS_LIST_FETCH_SUCCESS,
  FILTERED_REASONS_LIST_FETCH_ERROR,
  FILTERED_REASONS_LIST_FETCH_FAILURE,
  CLIENT_CATEGORIES_FETCH_SUCCESS,
  CLIENT_CATEGORIES_FETCH_ERROR,
  CLIENT_CATEGORIES_FETCH_FAILURE,
  CHANNELS_FETCH_SUCCESS,
  CHANNELS_FETCH_ERROR,
  CHANNELS_FETCH_FAILURE,
  SET_GLOBAL_PARAMS
} from 'reducers/reasonsCategories/reasonsListReducer'

const { fetchReason, fetchClientCategories, fetchChannels } = api

// эта сага отрабатывает на старте
export function * fetchReasonsListSaga ({ payload = {} }) {
  const params = payload
  try {
    const { data } = yield call(fetchReason, params)
    if (data.IsSuccess) {
      const { Reasons, GlobalParameters } = data.Data
      const MinLength = get(
        GlobalParameters.find(param => param.ParamName === 'MinLength'),
        'ParamValue'
      )
      const MaxLength = get(
        GlobalParameters.find(param => param.ParamName === 'MaxLength'),
        'ParamValue'
      )

      yield put({ type: REASONS_LIST_FETCH_SUCCESS, payload: { reasons: Reasons } })
      yield put({
        type: SET_GLOBAL_PARAMS,
        payload: { MinLength: parseInt(MinLength, 10), MaxLength: parseInt(MaxLength, 10) }
      })
    } else {
      yield put({ type: REASONS_LIST_FETCH_ERROR, payload: { error: data } })
    }
  } catch (error) {
    yield put({ type: REASONS_LIST_FETCH_FAILURE, payload: { error: error.message } })
  }
}

// эта сага отрабатывает при фильтрации
export function * fetchFilteredReasonsListSaga ({ payload = {} }) {
  const params = payload
  try {
    const { data } = yield call(fetchReason, params)
    if (data.IsSuccess) {
      yield put({
        type: FILTERED_REASONS_LIST_FETCH_SUCCESS,
        payload: { filteredReasons: data.Data.Reasons }
      })
    } else {
      yield put({ type: FILTERED_REASONS_LIST_FETCH_ERROR, payload: { error: data } })
    }
  } catch (error) {
    yield put({ type: FILTERED_REASONS_LIST_FETCH_FAILURE, payload: { error: error.message } })
  }
}

export function * fetchClientCategoriesSaga ({ payload = {} }) {
  const params = payload
  try {
    const { data } = yield call(fetchClientCategories, params)
    if (data.IsSuccess) {
      yield put({
        type: CLIENT_CATEGORIES_FETCH_SUCCESS,
        payload: { clientCategories: data.Data.ClientCategories }
      })
    } else {
      yield put({ type: CLIENT_CATEGORIES_FETCH_ERROR, payload: { error: data } })
    }
  } catch (error) {
    yield put({ type: CLIENT_CATEGORIES_FETCH_FAILURE, payload: { error: error.message } })
  }
}

export function * fetchChannelsSaga ({ payload = {} }) {
  const params = payload
  try {
    const { data } = yield call(fetchChannels, params)
    if (data.IsSuccess) {
      yield put({ type: CHANNELS_FETCH_SUCCESS, payload: { channels: data.Data.Channels } })
    } else {
      yield put({ type: CHANNELS_FETCH_ERROR, payload: { error: data } })
    }
  } catch (error) {
    yield put({ type: CHANNELS_FETCH_FAILURE, payload: { error: error.message } })
  }
}
