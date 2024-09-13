import { call, put, select } from 'redux-saga/effects'

import {
  RECOGNIZE_VOICE_SUCCESS,
  RECOGNIZE_VOICE_ERROR,
  RECOGNIZE_VOICE_FAILURE
} from 'reducers/internal/voiceRecognitionReducer'
import { getHandlingState, getUserState } from 'selectors'

import api from 'utils/api'

function createFormData ({ blob, handlingId, user }) {
  const formData = new FormData()
  formData.set('data', blob)
  formData.set('handlingId', handlingId)
  formData.set('user', user)
  return formData
}

export function * recognizeVoiceSaga ({ payload }) {
  const { recognizeVoice } = api

  const { Id } = yield select(getHandlingState)
  const { login } = yield select(getUserState)

  const bodyFormData = yield call(createFormData, { blob: payload, handlingId: Id, user: login })
  try {
    const { data } = yield call(recognizeVoice, bodyFormData)
    if (data.result) {
      const { result } = data
      yield put({ type: RECOGNIZE_VOICE_SUCCESS, payload: result })
    } else {
      yield put({ type: RECOGNIZE_VOICE_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: RECOGNIZE_VOICE_FAILURE, message: exception.message })
  }
}
