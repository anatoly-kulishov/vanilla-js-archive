import { all, takeEvery, takeLatest } from 'redux-saga/effects'

import {
  GET_CONNECTED_SERVICES_FETCH,
  GET_AVAILABLE_SERVICES_FETCH,
  GET_CHARGE_SERVICE_LIST_FETCH,
  CHANGE_SERVICE_STATUS_FETCH,
  FETCH_SERVICES_PENDING_ORDERS,
  DELETE_SERVICES_PENDING_ORDERS,
  RESEND_SERVICE_ORDER,
  FETCH_MULTISUBSCRIPTION_SERVICE,
  FETCH_CLIENT_OFFERING_PROFILE,
  CHANGE_MULTISUBSCRIPTION_SERVICE,
  changeMultisubscriptionServiceWebSeller
} from 'reducers/services/serviceReducer'

import {
  fetchAvailableServicesSaga,
  fetchChargeServiceListSaga,
  fetchServicesPendingOrdersSaga,
  deleteServicesPendingOrdersSaga,
  fetchConnectedServicesSaga,
  fetchChangeServiceStatusSaga,
  resendServiceOrderSaga,
  fetchMultisubscriptionServiceSaga,
  fetchClientProductOfferingProfileServiceSaga,
  сhangeMultisubscriptionServiceSaga,
  changeMultisubscriptionServiceSagaWebSeller
} from './servicesSaga'

// Tariff modal
import {
  FETCH_TARIFF_INFO,
  FETCH_AVAILABLE_TARIFFS,
  CHANGE_TARIFF,
  FETCH_AVAILABLE_TARIFF_DETAILS,
  CHANGE_SERVICES,
  FETCH_ENABLED_TARIFF_DETAILS
} from 'reducers/services/tariffModalReducer'

import {
  fetchTariffInfoSaga,
  fetchAvailableTariffsSaga,
  changeTariffSaga,
  fetchAvailableTariffDetailsSaga,
  changeServicesSaga,
  fetchEnabledTariffDetailsSaga
} from './tariffModalSaga'

import { FETCH_TARIFF_INFO_PREVIEW } from 'reducers/services/tariffInfoReducer'
import { fetchTariffInfoPreviewSaga } from './tariffInfoSaga'

// History services
import { GET_SERVICE_HISTORY_FETCH } from 'reducers/services/serviceHistoryReducer'
import { fetchServiceHistorySaga } from './serviceHistorySaga'

// Call Forwarding

import { FETCH_HLR, RESET_HLR, CHANGE_HLR } from 'reducers/services/servicesCallForwarding'
import { fetchHlrSaga, resetHlrSaga, changeHlrSaga } from './servicesCallForwarding'

import { FETCH_SUBSCRIBER_TARIFF_HISTORY } from 'reducers/services/tariffHistoryReducer'
import { fetchSubscriberTariffHistorySaga } from './tariffHistorySaga'

export default function * () {
  yield all([
    takeEvery(FETCH_TARIFF_INFO, fetchTariffInfoSaga),
    takeEvery(FETCH_TARIFF_INFO_PREVIEW, fetchTariffInfoPreviewSaga),
    takeEvery(FETCH_AVAILABLE_TARIFFS, fetchAvailableTariffsSaga),
    takeEvery(CHANGE_TARIFF, changeTariffSaga),
    takeEvery(FETCH_AVAILABLE_TARIFF_DETAILS, fetchAvailableTariffDetailsSaga),
    takeEvery(CHANGE_SERVICES, changeServicesSaga),
    takeEvery(FETCH_ENABLED_TARIFF_DETAILS, fetchEnabledTariffDetailsSaga),

    takeEvery(GET_CONNECTED_SERVICES_FETCH, fetchConnectedServicesSaga),
    takeEvery(GET_AVAILABLE_SERVICES_FETCH, fetchAvailableServicesSaga),
    takeEvery(GET_CHARGE_SERVICE_LIST_FETCH, fetchChargeServiceListSaga),
    takeEvery(FETCH_SERVICES_PENDING_ORDERS, fetchServicesPendingOrdersSaga),
    takeEvery(DELETE_SERVICES_PENDING_ORDERS, deleteServicesPendingOrdersSaga),
    takeEvery(GET_SERVICE_HISTORY_FETCH, fetchServiceHistorySaga),
    takeEvery(CHANGE_SERVICE_STATUS_FETCH, fetchChangeServiceStatusSaga),

    takeEvery(FETCH_HLR, fetchHlrSaga),
    takeEvery(RESET_HLR, resetHlrSaga),
    takeEvery(CHANGE_HLR, changeHlrSaga),
    takeEvery(RESEND_SERVICE_ORDER, resendServiceOrderSaga),

    takeEvery(FETCH_SUBSCRIBER_TARIFF_HISTORY, fetchSubscriberTariffHistorySaga),

    takeLatest(FETCH_MULTISUBSCRIPTION_SERVICE, fetchMultisubscriptionServiceSaga),
    takeLatest(FETCH_CLIENT_OFFERING_PROFILE, fetchClientProductOfferingProfileServiceSaga),

    takeLatest(CHANGE_MULTISUBSCRIPTION_SERVICE, сhangeMultisubscriptionServiceSaga),
    takeLatest(changeMultisubscriptionServiceWebSeller().type, changeMultisubscriptionServiceSagaWebSeller)
  ])
}
