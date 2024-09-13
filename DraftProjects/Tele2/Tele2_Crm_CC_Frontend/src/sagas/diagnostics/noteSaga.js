import { call, put } from 'redux-saga/effects'

import api from 'utils/api'

import { notification } from 'antd'
import { FETCH_INTERACTIONS } from 'reducers/reasonsRegisteringReducer'
import {
  CREATE_COVERAGE_AND_OFFICES_NOTE_ERROR,
  CREATE_COVERAGE_AND_OFFICES_NOTE_FAILURE,
  CREATE_COVERAGE_AND_OFFICES_NOTE_SUCCESS
} from 'reducers/diagnostics/noteReducer'

export function * createCoveragesAndOfficesNoteSaga ({ payload }) {
  const errorMessage = 'Ошибка создания заметки'
  const { createCoveragesAndOfficesNote } = api

  try {
    const { data } = yield call(createCoveragesAndOfficesNote, payload)
    if (data.IsSuccess) {
      yield put({
        type: FETCH_INTERACTIONS
      })
      yield put({ type: CREATE_COVERAGE_AND_OFFICES_NOTE_SUCCESS })
    } else {
      yield put({ type: CREATE_COVERAGE_AND_OFFICES_NOTE_ERROR, payload: { error: data } })
      notification.error({
        message: errorMessage,
        description: data.MessageText
      })
    }
  } catch (error) {
    yield put({ type: CREATE_COVERAGE_AND_OFFICES_NOTE_FAILURE, payload: { error: error.message } })
    notification.error({
      message: errorMessage,
      description: error.message
    })
  }
}
