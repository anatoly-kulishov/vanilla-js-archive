import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

import {
  FETCH_PSYCHOTYPE_SUCCESS,
  FETCH_PSYCHOTYPE_ERROR,
  FETCH_PSYCHOTYPE_FAILURE
} from 'reducers/personalInfo/psychotypeReducer'
import { ADD_NOTIFICATION } from 'reducers/internal/notifications'
import { NONE } from 'constants/redirectTypes'

const { fetchSubscriberPsychotype } = api

export function * fetchSubscriberPsychotypeSaga ({ payload }) {
  try {
    const { data } = yield call(fetchSubscriberPsychotype, payload)
    if (data.IsSuccess) {
      yield put({ type: FETCH_PSYCHOTYPE_SUCCESS })
      if (data.Data) {
        const { Psychotype, Instruction } = data.Data
        yield put({
          type: ADD_NOTIFICATION,
          payload: {
            message: Psychotype,
            description: Instruction,
            type: 'success',
            redirectType: NONE
          }
        })
      }
    } else {
      yield put({ type: FETCH_PSYCHOTYPE_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: FETCH_PSYCHOTYPE_FAILURE, message: exception.message })
  }
}
