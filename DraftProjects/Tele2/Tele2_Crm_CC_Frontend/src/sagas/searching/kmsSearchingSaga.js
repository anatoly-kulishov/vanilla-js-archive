import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'
import { handleQueryToKms } from 'utils/helpers/kms'

import {
  KMS_SEARCHING_FETCH_SUCCESS,
  KMS_SEARCHING_FETCH_ERROR,
  KMS_SEARCHING_FETCH_FAILURE,
  KMS_SEARCHING_AND_REDIRECT_FETCH_SUCCESS,
  KMS_SEARCHING_AND_REDIRECT_FETCH_ERROR,
  KMS_SEARCHING_AND_REDIRECT_FETCH_FAILURE
} from 'reducers/searching/kmsSearchingReducer'

export function * fetchKmsSearchSaga ({ payload }) {
  const { fetchKmsSearch } = api

  try {
    const { data } = yield call(fetchKmsSearch, payload)

    if (data) {
      yield put({ type: KMS_SEARCHING_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: KMS_SEARCHING_FETCH_ERROR, payload: data })
      notification.error({
        message: 'Запрос к KMS',
        description: data.messageText
      })
    }
  } catch (exception) {
    yield put({ type: KMS_SEARCHING_FETCH_FAILURE, message: exception.message })
  }
}

export function * fetchKmsSearchAndRedirectSaga ({ payload }) {
  const { fetchKmsSearch } = api
  const { searchParams, redirectParams } = payload
  const { handlingId, personalAccount } = redirectParams
  try {
    const { data } = yield call(fetchKmsSearch, searchParams)

    if (data) {
      yield put({ type: KMS_SEARCHING_AND_REDIRECT_FETCH_SUCCESS, payload: data })
      if (data.getAnswerLink) {
        return
      }
    } else {
      yield put({ type: KMS_SEARCHING_AND_REDIRECT_FETCH_ERROR, payload: data })
      notification.error({
        message: 'Запрос к KMS',
        description: data.messageText
      })
    }
  } catch (exception) {
    yield put({ type: KMS_SEARCHING_AND_REDIRECT_FETCH_FAILURE, message: exception.message })
  }
  handleQueryToKms(searchParams.query, handlingId, personalAccount)
}
