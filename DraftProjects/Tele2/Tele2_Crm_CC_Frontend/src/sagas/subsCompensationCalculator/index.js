import { all, takeEvery } from 'redux-saga/effects'

import {
  GET_AMOUNTS,
  GET_COMPENSATION_LIMITS,
  GET_LIMITS
} from 'reducers/subscriptions/subscriptionCompensationReducer'
import {
  getAmountsSaga,
  getCompensationLimitsSaga,
  getSubscriptionCompensationLimitsSaga
} from '../subscriptions/subscriptionCompensationSaga'

export default function * () {
  yield all([
    takeEvery(GET_AMOUNTS, getAmountsSaga),
    takeEvery(GET_LIMITS, getSubscriptionCompensationLimitsSaga),
    takeEvery(GET_COMPENSATION_LIMITS, getCompensationLimitsSaga)
  ])
}
