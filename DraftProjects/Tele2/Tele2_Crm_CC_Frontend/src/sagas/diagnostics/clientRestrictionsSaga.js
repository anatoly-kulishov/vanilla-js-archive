import { call, put } from 'redux-saga/effects'

import api from 'utils/api'

import {
  FETCH_CLIENT_RESTRICTIONS,
  FETCH_CLIENT_RESTRICTIONS_SUCCESS,
  FETCH_CLIENT_RESTRICTIONS_ERROR,
  FETCH_CLIENT_RESTRICTIONS_FAILURE,

  REMOVE_ALL_CLIENT_RESTRICTIONS_SUCCESS,
  REMOVE_ALL_CLIENT_RESTRICTIONS_ERROR,
  REMOVE_ALL_CLIENT_RESTRICTIONS_FAILURE,

  CHANGE_CLIENT_RESTRICTION_SUCCESS,
  CHANGE_CLIENT_RESTRICTION_ERROR,
  CHANGE_CLIENT_RESTRICTION_FAILURE
} from 'reducers/diagnostics/clientRestrictionsReducer'

import { notification } from 'antd'

const errorMessage = 'Ошибка получения клиентских ограничений'

export function * fetchClientRestrictionsSaga ({ payload }) {
  const { fetchClientRestrictions } = api

  try {
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(fetchClientRestrictions, payload)

    if (IsSuccess) {
      const { Restrictions } = Data
      yield put({ type: FETCH_CLIENT_RESTRICTIONS_SUCCESS, payload: Restrictions })
    } else {
      yield put({ type: FETCH_CLIENT_RESTRICTIONS_ERROR, payload: MessageText })
      notification.open({
        message: errorMessage,
        description: MessageText,
        type: 'error'
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_CLIENT_RESTRICTIONS_FAILURE, payload: message })
    notification.open({
      message: errorMessage,
      description: message,
      type: 'error'
    })
  }
}

export function * changeClientRestrictionSaga ({ payload }) {
  const { changeClientRestriction } = api
  const { msisdn } = payload
  try {
    const {
      data: { IsSuccess, MessageText, Data }
    } = yield call(changeClientRestriction, payload)

    if (IsSuccess) {
      yield put({ type: FETCH_CLIENT_RESTRICTIONS, payload: { msisdn } })
      yield put({ type: CHANGE_CLIENT_RESTRICTION_SUCCESS })
      notification.success({
        message: 'Ограничения',
        description: Data?.ResultMessage
      })
    } else {
      yield put({ type: CHANGE_CLIENT_RESTRICTION_ERROR, payload: MessageText })
      notification.open({
        message: errorMessage,
        description: MessageText,
        type: 'error'
      })
    }
  } catch ({ message }) {
    yield put({ type: CHANGE_CLIENT_RESTRICTION_FAILURE, payload: message })
    notification.open({
      message: errorMessage,
      description: message,
      type: 'error'
    })
  }
}

export function * removeAllClientRestrictionsSaga ({ payload }) {
  const { removeAllClientRestrictions } = api
  const { msisdn } = payload

  try {
    const {
      data: { IsSuccess, MessageText }
    } = yield call(removeAllClientRestrictions, payload)

    if (IsSuccess) {
      yield put({ type: FETCH_CLIENT_RESTRICTIONS, payload: { msisdn } })
      yield put({ type: REMOVE_ALL_CLIENT_RESTRICTIONS_SUCCESS })
    } else {
      yield put({ type: REMOVE_ALL_CLIENT_RESTRICTIONS_ERROR, payload: MessageText })
      notification.open({
        message: errorMessage,
        description: MessageText,
        type: 'error'
      })
    }
  } catch ({ message }) {
    yield put({ type: REMOVE_ALL_CLIENT_RESTRICTIONS_FAILURE, payload: message })
    notification.open({
      message: errorMessage,
      description: message,
      type: 'error'
    })
  }
}
