import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

import {
  GET_CHARGE_COUNTER_SUCCESS,
  GET_CHARGE_COUNTER_ERROR,
  GET_CHARGE_COUNTER_FAILURE
} from 'reducers/charge/chargeReducer'

const { getChargeCounter } = api

export function * getChargeCounterSaga ({ payload }) {
  try {
    const { data, status } = yield call(getChargeCounter, payload)

    if (status === 200) {
      yield put({ type: GET_CHARGE_COUNTER_SUCCESS, payload: data })
    } else {
      yield put({ type: GET_CHARGE_COUNTER_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: GET_CHARGE_COUNTER_FAILURE, payload: exception.message })
  }
}
