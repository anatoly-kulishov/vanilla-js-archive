import { call, put } from 'redux-saga/effects'

import {
  GET_SMS_TEMPLATES_FETCH_SUCCESS,
  GET_SMS_TEMPLATES_FETCH_ERROR,
  GET_SMS_TEMPLATES_FETCH_FAILURE
} from 'reducers/sms/getSmsTemplatesReducer'

import { fetchSmsTemplates } from 'utils/api'

export function * getSmsTemplatesSaga ({ payload }) {
  try {
    const { data } = yield call(fetchSmsTemplates, payload)
    if (data.IsSuccess) {
      yield put({ type: GET_SMS_TEMPLATES_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: GET_SMS_TEMPLATES_FETCH_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: GET_SMS_TEMPLATES_FETCH_FAILURE, message: exception.message })
  }
}
