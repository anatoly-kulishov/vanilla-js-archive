import { call, put, delay } from 'redux-saga/effects'
import moment from 'moment'
import jwtDecode from 'jwt-decode'

import history from 'utils/createdHistory'
import { DEFAULT_AUTH_TOKEN_STORAGE_KEY } from 'utils/helpers/authToken'

import {
  UPDATE_USER_DATA,
  TOKEN_FETCH_SUCCESS,
  TOKEN_GET_FROM_LS_SUCCESS,
  TOKEN_FETCH_ERROR,
  TOKEN_FETCH_FAILURE,
  changeAuthMode,
  refreshToken
} from 'reducers/internal/userReducer'

import api from 'utils/api'
import fromEnv from 'config/fromEnv'

export const isBirthday = decodeToken => moment().format('MM.DD') === decodeToken?.birthDate

export function * fetchTokenSaga () {
  const { fetchToken } = api

  try {
    // check current token
    const currentToken = localStorage.getItem(DEFAULT_AUTH_TOKEN_STORAGE_KEY)
    const currentTokenData = currentToken ? jwtDecode(currentToken) : null

    // TODO: проверка на crmRoles временная, не забыть убрать!!!
    const isCurrentTokenOk =
      currentTokenData && currentTokenData.hasOwnProperty('crmRoles')
        ? ~~(Date.now() / 1000) <= currentTokenData.exp
        : false

    if (isCurrentTokenOk) {
      yield put({ type: TOKEN_GET_FROM_LS_SUCCESS, payload: { isTokenOk: true } })
      yield put({ type: UPDATE_USER_DATA, payload: { ...currentTokenData, isBirthday: isBirthday(currentTokenData) } })
    } else {
      // load new token
      const { data } = yield call(fetchToken)
      const { data: token, isSuccess } = data

      if (isSuccess) {
        localStorage.setItem(DEFAULT_AUTH_TOKEN_STORAGE_KEY, token)
        yield put({ type: TOKEN_FETCH_SUCCESS, payload: { isTokenOk: true } })

        const decodeToken = jwtDecode(token)
        yield put({ type: UPDATE_USER_DATA, payload: { ...decodeToken, isBirthday: isBirthday(decodeToken) } })

        // вместо setInterval, refresh только для авторизации через api /authtoken
        if (fromEnv('NODE_ENV') === 'production') {
          while (true) {
            yield delay(300000)
            yield put(refreshToken())
          }
        }
      } else {
        yield put({ type: TOKEN_FETCH_ERROR, payload: data })
        yield put(changeAuthMode({ isOidcAuth: true }))
      }
    }
  } catch (exception) {
    yield put({ type: TOKEN_FETCH_FAILURE, message: exception.message })
    yield put(changeAuthMode({ isOidcAuth: true }))
  }
}

export function * refreshTokenSaga () {
  const { fetchToken } = api

  try {
    // load new token
    const { data } = yield call(fetchToken)
    const { data: token, isSuccess } = data

    if (isSuccess) {
      localStorage.setItem(DEFAULT_AUTH_TOKEN_STORAGE_KEY, token)
      yield put({ type: TOKEN_FETCH_SUCCESS, payload: { isTokenOk: true } })
    } else {
      yield put({ type: TOKEN_FETCH_ERROR, payload: data })
      yield call(history.push, `/auth-error`)
    }
  } catch (exception) {
    yield put({ type: TOKEN_FETCH_FAILURE, message: exception.message })
    yield call(history.push, `/auth-error`)
  }
}
