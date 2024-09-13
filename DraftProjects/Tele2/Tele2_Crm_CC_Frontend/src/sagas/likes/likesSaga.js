import { call, put, select } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'

import {
  LIKES_FETCH_SUCCESS,
  LIKES_FETCH_ERROR,
  LIKES_FETCH_FAILURE,
  LIKE_CREATE_SUCCESS,
  LIKE_CREATE_ERROR,
  LIKE_CREATE_FAILURE
} from 'reducers/likes/likesReducer'

import { getHandlingState } from 'selectors'

export function * fetchLikesSaga () {
  const { fetchLikes } = api

  try {
    const {
      data: { IsSuccess: isSuccess, Data: data, MessageText: message }
    } = yield call(fetchLikes)
    if (isSuccess) {
      yield put({ type: LIKES_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: LIKES_FETCH_ERROR, payload: message })
    }
  } catch ({ message }) {
    yield put({ type: LIKES_FETCH_FAILURE, message: message })
  }
}

export function * createLikeSaga ({ payload }) {
  const { createLike } = api
  const handling = yield select(getHandlingState)
  const handlingId = handling.Id

  try {
    const {
      data: { IsSuccess: isSuccess, Data: data, MessageText: message }
    } = yield call(createLike, { ...payload, handlingId })

    if (isSuccess) {
      yield put({ type: LIKE_CREATE_SUCCESS, payload: data })
      notification.success({
        message: 'Оценка функционала CRM',
        description: 'Ваше мнение очень важно для нас!'
      })
    } else {
      yield put({ type: LIKE_CREATE_ERROR, payload: message })
    }
  } catch ({ message }) {
    yield put({ type: LIKE_CREATE_FAILURE, message: message })
  }
}
