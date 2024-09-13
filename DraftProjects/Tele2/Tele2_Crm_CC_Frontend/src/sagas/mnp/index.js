import { all, takeEvery } from 'redux-saga/effects'

import { FETCH_BLACKLIST_INFO, FETCH_WEBIM_BLACKLIST_INFO } from 'reducers/mnp/blacklistReducer'
import { fetchBlacklistSaga, fetchWebimBlacklistSaga } from './blacklistSaga'

import {
  FETCH_PROTOCOL_STATUS_CONTEXT,
  GET_QUESTION_PROTOCOL,
  CREATE_DRAFT_PROTOCOL,
  CHANGE_DRAFT_PROTOCOL,
  PROTOCOL
} from 'reducers/mnp/protocolReducer'

import {
  fetchProtocolStatusContextSaga,
  getQuestionProtocolSaga,
  createDraftProtocolSaga,
  changeDraftProtocolSaga,
  protocolSaga
} from '../mnp/protocolSaga'

import {
  GET_WEBSELLER_MARKERS,
  FETCH_MARKERS,
  GET_MARKER_MNP,
  GET_MARKER_TARIFF_HOLD
} from 'reducers/mnp/mnpMarkersReducer'
import { fetchMarkersSaga, getMarkerMnpSaga, getMarkerTariffHoldSaga } from './mnpMarkersSaga'

import {
  CANCEL_MNP_ORDER,
  CHECK_MNP_HANDLING,
  GET_CANCELLATIONS_NUMBER,
  GET_MNP_ORDER,
  GET_ORDER_HISTORY,
  GET_CLOSED_ORDERS,
  GET_HISTORY_ORDER_ID_LIST
} from 'reducers/mnp/mnpReducer'
import { GET_RECOGNITION_VALUES, GET_SCAN_FILES, UPDATE_RECOGNITION_VALUES } from '../../reducers/mnp/mnpVerifyReducer'
import {
  cancelMnpOrderSaga,
  checkMnpHandlingSaga,
  getCancellationsNumberSaga,
  getMnpOrderSaga,
  getOrderHistorySaga,
  getClosedOrdersSaga,
  getHistoryOrderIdListSaga
} from './mnpSaga'
import { getRecognitionValuesSaga, getScanFilesSaga, updateRecognitionValuesSaga } from './mnpVerifySaga'

import { getWebSellerMarkersSaga } from 'webseller/integration/markers/sagas'

export default function * () {
  yield all([
    takeEvery(FETCH_BLACKLIST_INFO, fetchBlacklistSaga),
    takeEvery(FETCH_MARKERS, fetchMarkersSaga),
    takeEvery(FETCH_WEBIM_BLACKLIST_INFO, fetchWebimBlacklistSaga),
    takeEvery(CHECK_MNP_HANDLING, checkMnpHandlingSaga),
    takeEvery(FETCH_PROTOCOL_STATUS_CONTEXT, fetchProtocolStatusContextSaga),
    takeEvery(GET_MNP_ORDER, getMnpOrderSaga),
    takeEvery(CANCEL_MNP_ORDER, cancelMnpOrderSaga),
    takeEvery(GET_ORDER_HISTORY, getOrderHistorySaga),
    takeEvery(GET_CANCELLATIONS_NUMBER, getCancellationsNumberSaga),
    takeEvery(GET_QUESTION_PROTOCOL, getQuestionProtocolSaga),
    takeEvery(GET_SCAN_FILES, getScanFilesSaga),
    takeEvery(GET_RECOGNITION_VALUES, getRecognitionValuesSaga),
    takeEvery(UPDATE_RECOGNITION_VALUES, updateRecognitionValuesSaga),
    takeEvery(GET_CLOSED_ORDERS, getClosedOrdersSaga),
    takeEvery(GET_HISTORY_ORDER_ID_LIST, getHistoryOrderIdListSaga),
    takeEvery(GET_MARKER_MNP, getMarkerMnpSaga),
    takeEvery(GET_MARKER_TARIFF_HOLD, getMarkerTariffHoldSaga),
    takeEvery(CREATE_DRAFT_PROTOCOL, createDraftProtocolSaga),
    takeEvery(CHANGE_DRAFT_PROTOCOL, changeDraftProtocolSaga),
    takeEvery(PROTOCOL, protocolSaga),

    // WebSeller
    takeEvery(GET_WEBSELLER_MARKERS, getWebSellerMarkersSaga)
  ])
}
