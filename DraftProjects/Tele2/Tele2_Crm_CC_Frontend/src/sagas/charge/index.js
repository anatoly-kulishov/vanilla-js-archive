import { all, takeEvery } from 'redux-saga/effects'

import {
  GET_CHARGE_COUNTER
} from 'reducers/charge/chargeReducer'

import {
  getChargeCounterSaga
} from './chargeSaga'

export default function * () {
  yield all([
    takeEvery(GET_CHARGE_COUNTER, getChargeCounterSaga)
  ])
}
