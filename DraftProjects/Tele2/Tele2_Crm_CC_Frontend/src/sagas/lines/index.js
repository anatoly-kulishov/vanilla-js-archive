import { all, takeEvery } from 'redux-saga/effects'

import { FETCH_GROUP_LIST, FETCH_DELETE_GROUP, VALIDATE_AUTOPAY_SERVICE } from 'reducers/lines/groupsReducer'
import { fetchGroupListSaga, deleteGroupSaga, validateAutopayServiceSaga } from './groupsSaga'

import { DISCOUNTS_LIST_FETCH } from 'reducers/lines/discountsReducer'
import { fetchDiscountListSaga } from './discountsSaga'

import { FETCH_SUBSCRIBERS_LIST, FETCH_GROUP_NOTIFICATION_MESSAGES } from 'reducers/lines/subscribersReducer'
import { fetchSubscriberListSaga, fetchGroupNotificationMessagesSaga } from './subscribersSaga'

export default function * () {
  yield all([
    takeEvery(FETCH_GROUP_LIST, fetchGroupListSaga),
    takeEvery(FETCH_DELETE_GROUP, deleteGroupSaga),
    takeEvery(DISCOUNTS_LIST_FETCH, fetchDiscountListSaga),
    takeEvery(FETCH_SUBSCRIBERS_LIST, fetchSubscriberListSaga),
    takeEvery(VALIDATE_AUTOPAY_SERVICE, validateAutopayServiceSaga),
    takeEvery(FETCH_GROUP_NOTIFICATION_MESSAGES, fetchGroupNotificationMessagesSaga)
  ])
}
