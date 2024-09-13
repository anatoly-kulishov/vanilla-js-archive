import { all, takeEvery } from 'redux-saga/effects'

import { PERSONAL_ACCOUNT_FETCH } from 'reducers/personalInfo/personalInfoReducer'
import { fetchPersonalInfoSaga } from './personalInfoSaga'

import { SUBSCRIBER_LIST_FETCH, SUBSCRIBER_STATUSES_FETCH } from 'reducers/personalInfo/subscriberListReducer'
import { fetchSubscriberListSaga, fetchSubscriberStatusesSaga } from './subscriberListSaga'

import { FETCH_WHO_IS_IT } from 'reducers/personalInfo/numberOperatorBelongingReducer'
import { fetchWhoIsItSaga } from './numberOperatorBelongingSaga'

import {
  FETCH_SUBSCRIBER_STATUS_LIST,
  RECOMMENDATION_CHANGE_STATUS_FETCH,
  SUBSCRIBER_STATUS_HISTORY_FETCH,
  SUBSCRIBER_STATUS_UPDATE_FETCH
} from 'reducers/personalInfo/subscriberStatusReducer'

import {
  fetchRecommendationChangeStatusSaga,
  fetchSubscriberServiceStatusHistorySaga,
  fetchSubscriberServiceStatusUpdateSaga,
  fetchSubscriberStatusListSaga
} from './subscriberStatusSaga'

import {
  DELETE_FROM_SPACE,
  FETCH_DATA_CLIENT,
  FETCH_DATA_SUBSCRIBER,
  FETCH_REVOKE,
  FETCH_VIP_SEGMENTATION,
  PAYMENT_DELIVERY_TYPES_FETCH,
  POST_SEND_AGREE,
  UPDATE_CLIENT_DATA,
  UPDATE_SUBSCRIBER_DATA
} from 'reducers/personalInfo/dataClientSubscriberReducer'
import {
  deleteFromSpaceSaga,
  fetchDataClientSaga,
  fetchDataSubscriberSaga,
  fetchPaymentDeliveryTypesSaga,
  fetchRevokeSaga,
  fetchVipSegmentationSaga,
  postSendAgreeSaga,
  updateSubscriberDataSaga
} from './dataClientSubscriberSaga'

import { PERSONAL_DATA_FETCH, SET_PERSONAL_DATA } from 'reducers/personalInfo/personalDataReducer'
import { fetchPersonalDataSaga, setPersonalDataSaga } from './pesonalDataSaga'

import { FETCH_PSYCHOTYPE } from 'reducers/personalInfo/psychotypeReducer'
import { fetchSubscriberPsychotypeSaga } from './psychotypeSaga'

import { GET_RTK_SEGMENT } from 'reducers/personalInfo/markersReducer'
import {
  DELETE_SUBSCRIBER_NOTIFICATION,
  FETCH_SUBSCRIBER_NOTIFICATIONS,
  MODIFY_SUBSCRIBER_NOTIFICATION
} from 'reducers/personalInfo/subscriberNotificationsReducer'
import { getRtkSegmentSaga } from './markersSaga'
import {
  deleteSubscriberNotificationSaga,
  fetchSubscriberNotificationsSaga,
  modifySubscriberNotificationSaga
} from './subscriberNotificationsSaga'

export default function * () {
  yield all([
    takeEvery(SUBSCRIBER_STATUS_UPDATE_FETCH, fetchSubscriberServiceStatusUpdateSaga),
    takeEvery(SUBSCRIBER_STATUS_HISTORY_FETCH, fetchSubscriberServiceStatusHistorySaga),
    takeEvery(RECOMMENDATION_CHANGE_STATUS_FETCH, fetchRecommendationChangeStatusSaga),
    takeEvery(FETCH_SUBSCRIBER_STATUS_LIST, fetchSubscriberStatusListSaga),
    takeEvery(PERSONAL_ACCOUNT_FETCH, fetchPersonalInfoSaga),
    takeEvery(SUBSCRIBER_LIST_FETCH, fetchSubscriberListSaga),
    takeEvery(SUBSCRIBER_STATUSES_FETCH, fetchSubscriberStatusesSaga),
    takeEvery(FETCH_WHO_IS_IT, fetchWhoIsItSaga),
    takeEvery(FETCH_DATA_SUBSCRIBER, fetchDataSubscriberSaga),
    takeEvery(FETCH_DATA_CLIENT, fetchDataClientSaga),
    takeEvery(FETCH_SUBSCRIBER_STATUS_LIST, fetchSubscriberStatusListSaga),
    takeEvery(PERSONAL_DATA_FETCH, fetchPersonalDataSaga),
    takeEvery(SET_PERSONAL_DATA, setPersonalDataSaga),
    takeEvery(PAYMENT_DELIVERY_TYPES_FETCH, fetchPaymentDeliveryTypesSaga),
    takeEvery(UPDATE_SUBSCRIBER_DATA, updateSubscriberDataSaga),
    takeEvery(UPDATE_CLIENT_DATA, updateSubscriberDataSaga),
    takeEvery(FETCH_PSYCHOTYPE, fetchSubscriberPsychotypeSaga),
    takeEvery(GET_RTK_SEGMENT, getRtkSegmentSaga),
    takeEvery(FETCH_REVOKE, fetchRevokeSaga),
    takeEvery(FETCH_VIP_SEGMENTATION, fetchVipSegmentationSaga),
    takeEvery(DELETE_FROM_SPACE, deleteFromSpaceSaga),
    takeEvery(POST_SEND_AGREE, postSendAgreeSaga),
    takeEvery(FETCH_SUBSCRIBER_NOTIFICATIONS, fetchSubscriberNotificationsSaga),
    takeEvery(MODIFY_SUBSCRIBER_NOTIFICATION, modifySubscriberNotificationSaga),
    takeEvery(DELETE_SUBSCRIBER_NOTIFICATION, deleteSubscriberNotificationSaga)
  ])
}
