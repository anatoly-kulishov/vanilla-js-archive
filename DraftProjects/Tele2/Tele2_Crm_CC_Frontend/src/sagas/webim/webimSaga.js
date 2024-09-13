import React from 'react'
import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

import {
  FETCH_WEBIM_DNS_ERROR,
  FETCH_WEBIM_DNS_FAILURE,
  FETCH_WEBIM_DNS_SUCCESS,
  FETCH_WEBIM_HASH_ERROR,
  FETCH_WEBIM_HASH_FAILURE,
  FETCH_WEBIM_HASH_SUCCESS
} from 'reducers/webim/webimReducer'
import { notification } from 'antd'
import { formatWarnings } from 'utils/helpers'

export function * fetchWebimHashSaga ({ payload }) {
  const { fetchWebimHash } = api

  const notificationMessage = 'Авторизация Webim'

  try {
    const { data, status } = yield call(fetchWebimHash, payload)
    const { message, warnings, hash, id } = data

    switch (status) {
      case 200:
        yield put({ type: FETCH_WEBIM_HASH_SUCCESS, payload: { hash, id } })
        break
      case 403:
        yield put({ type: FETCH_WEBIM_HASH_ERROR, payload: message })
        notification.warn({ message: notificationMessage, description: 'Недостаточно прав для выполнения операции' })
        break
      default:
        yield put({ type: FETCH_WEBIM_HASH_ERROR, payload: message })
        notification.warn({
          message: (
            <>
              {notificationMessage}
              <br />
              {message}
            </>
          ),
          description: formatWarnings(warnings)
        })
    }
  } catch (exception) {
    yield put({ type: FETCH_WEBIM_HASH_FAILURE, payload: exception.message })
    notification.error({ message: notificationMessage, description: exception.message })
  }
}

export function * fetchWebimDnsSaga () {
  const { fetchWebimDns } = api

  const notificationMessage = 'Получение DNS адреса Webim'

  try {
    const { data, status } = yield call(fetchWebimDns)

    switch (status) {
      case 200:
        yield put({ type: FETCH_WEBIM_DNS_SUCCESS, payload: data })
        break
      case 403:
        yield put({ type: FETCH_WEBIM_DNS_ERROR, payload: data?.message })
        notification.warn({ message: notificationMessage, description: 'Недостаточно прав для выполнения операции' })
        break
      default:
        yield put({ type: FETCH_WEBIM_DNS_ERROR, payload: data?.message })
        notification.warn({
          message: notificationMessage,
          description: data?.message
        })
    }
  } catch (exception) {
    yield put({ type: FETCH_WEBIM_DNS_FAILURE, payload: exception.message })
    notification.error({ message: notificationMessage, description: exception.message })
  }
}
