import { all, takeEvery } from 'redux-saga/effects'

import { ACTIVE_SUBSCRIPTIONS_INFO_FETCH } from 'reducers/subscriptions/activeSubscriptionReducer'
import { UNSUBSCRIBE_FETCH, FETCH_UNSIBSCRIBE_REASON } from 'reducers/subscriptions/unsubscribeReducer'
import { SEND_SMS_FETCH } from 'reducers/subscriptions/sendSmsReducer'

import {
  fetchSubscriptionsSaga,
  unsubscribeSaga,
  sendSubscriptionSmsSaga,
  fetchUnsibscribeReasonsSaga
} from './subscriptionsSaga'

import {
  ACCRUE_SUBSCRIPTION_COMPENSATION,
  GET_SUBSCRIPTION_COMPENSATION_AMOUNTS,
  GET_SUBSCRIPTION_COMPENSATION_LIMITS
} from 'reducers/subscriptions/subscriptionCompensationReducer'
import {
  accrueSubscriptionCompensationSaga,
  getSubscriptionCompensationAmountsSaga,
  getSubscriptionCompensationLimitsSaga
} from '../subscriptions/subscriptionCompensationSaga'

export default function * () {
  yield all([
    takeEvery(ACTIVE_SUBSCRIPTIONS_INFO_FETCH, fetchSubscriptionsSaga),
    takeEvery(SEND_SMS_FETCH, sendSubscriptionSmsSaga),
    takeEvery(UNSUBSCRIBE_FETCH, unsubscribeSaga),
    takeEvery(FETCH_UNSIBSCRIBE_REASON, fetchUnsibscribeReasonsSaga),
    takeEvery(GET_SUBSCRIPTION_COMPENSATION_AMOUNTS, getSubscriptionCompensationAmountsSaga),
    takeEvery(GET_SUBSCRIPTION_COMPENSATION_LIMITS, getSubscriptionCompensationLimitsSaga),
    takeEvery(ACCRUE_SUBSCRIPTION_COMPENSATION, accrueSubscriptionCompensationSaga)
  ])
}
