import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'

import api from 'utils/api'
import history from 'utils/createdHistory'
import { setQueryParameters } from 'utils/helpers/queryParameters'

import { SEARCH_FORM_DATA, SESSION_PARAMS } from 'webseller/constants/searchParams'
import { getWebsellerSessionAccessData } from 'webseller/helpers/api/sessionAccessKey'
import { clearAllSessionParams } from 'webseller/helpers'
import { createRedirectUrlWebSellerSearch, handleSearchParams, handleSessionParams } from 'webseller/features/webSellerSearch/helpers'
import { hasOwnProperties } from 'webseller/helpers/hasOwnProperties'
import { isSuccessfulResponse } from 'webseller/helpers/api'

import { createNewSession, createNewSessionError, createNewSessionSuccess } from '../reducer/customersCheckReducer'
import BussinessLogicError, { isBussinessLogicError } from 'webseller/helpers/BussinessLogicError'

export function * createNewSessionSaga ({ payload }) {
  const { isCreateOrder, searchData } = payload
  const errorMessage = 'Ошибка ручного поиска'
  const { postCreateNewSession, deleteAllUserSessions } = api
  clearAllSessionParams()

  try {
    const { data: response, status } = yield call(postCreateNewSession, searchData)
    switch (status) {
      case 200: {
        window.sessionStorage.setItem(SEARCH_FORM_DATA, JSON.stringify(payload))
        const sessionParams = handleSessionParams(response)
        const searchParams = handleSearchParams(response)
        yield put(createNewSessionSuccess({ formData: payload, searchParams, sessionParams }))
        const isOpenCardScript = hasOwnProperties(searchParams, ['typeCard'])
        if (isOpenCardScript || isCreateOrder) {
          const query = setQueryParameters(sessionParams, [SESSION_PARAMS.SESSION_CLIENT_KEY])
          const redirectUrl = createRedirectUrlWebSellerSearch({ isCreateOrder, query })
          open(redirectUrl, '_self')
        }
        break
      }
      case 409: {
        yield call(deleteAllUserSessions)
        yield put(createNewSession(payload))
        break
      }
      default: {
        throw new BussinessLogicError(response?.message)
      }
    }
  } catch (exception) {
    yield put(createNewSessionError())
    notification.error({
      message: errorMessage,
      description: isBussinessLogicError(exception) ? exception.message : undefined
    })
  }
}

export function * deleteWebSellerCurrentSessionSaga () {
  const errorMessage = 'Ошибка при удалении сессии пользователя'
  const { deleteSessionByIdKey } = api
  const { sessionId, sessionKey: sessionClientKey } = getWebsellerSessionAccessData()

  try {
    const { status } = yield call(deleteSessionByIdKey, { sessionId, sessionClientKey })
    if (isSuccessfulResponse(status)) {
      history.push('/web-seller/dashboard')
    } else {
      notification.error({
        message: errorMessage
      })
    }
  } catch (exception) {
    notification.error({
      message: errorMessage,
      description: exception.message
    })
  }
}
