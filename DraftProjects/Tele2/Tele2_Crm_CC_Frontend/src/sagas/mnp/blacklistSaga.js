import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'

import api from 'utils/api'

import {
  FETCH_BLACKLIST_INFO_SUCCESS,
  FETCH_BLACKLIST_INFO_ERROR,
  FETCH_BLACKLIST_INFO_FAILURE,

  FETCH_WEBIM_BLACKLIST_INFO_SUCCESS,
  FETCH_WEBIM_BLACKLIST_INFO_ERROR,
  FETCH_WEBIM_BLACKLIST_INFO_FAILURE
} from 'reducers/mnp/blacklistReducer'

export function * fetchBlacklistSaga ({ payload }) {
  const { fetchBlacklistInfo } = api
  const errorMessage = 'Ошибка получения информации по чёрному списку'
  try {
    const { data } = yield call(fetchBlacklistInfo, payload)
    const { IsSuccess, MessageText } = data

    if (IsSuccess) {
      yield put({ type: FETCH_BLACKLIST_INFO_SUCCESS, payload: data })
    } else {
      yield put({ type: FETCH_BLACKLIST_INFO_ERROR, payload: MessageText })
      notification.error({
        message: errorMessage,
        description: MessageText
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_BLACKLIST_INFO_FAILURE, payload: message })
    notification.error({
      message: errorMessage,
      description: message
    })
  }
}

export function * fetchWebimBlacklistSaga ({ payload }) {
  const { fetchWebimBlacklistInfo } = api
  const errorMessage = 'Ошибка получения информации по чёрному списку Webim'
  try {
    const { data } = yield call(fetchWebimBlacklistInfo, payload)
    const { IsSuccess, MessageText } = data

    if (IsSuccess) {
      yield put({ type: FETCH_WEBIM_BLACKLIST_INFO_SUCCESS, payload: data })
    } else {
      yield put({ type: FETCH_WEBIM_BLACKLIST_INFO_ERROR, payload: MessageText })
      notification.error({
        message: errorMessage,
        description: MessageText
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_WEBIM_BLACKLIST_INFO_FAILURE, payload: message })
    notification.error({
      message: errorMessage,
      description: message
    })
  }
}
