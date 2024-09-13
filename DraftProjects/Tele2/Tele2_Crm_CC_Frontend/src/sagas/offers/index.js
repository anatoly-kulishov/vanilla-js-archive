import { all, takeEvery } from 'redux-saga/effects'

import {
  FETCH_OFFERS,
  FETCH_REGISTERED_OFFERS,
  ADD_OFFERS,
  CHANGE_OFFER,
  DELETE_OFFER,
  GET_OFFERS_HISTORY_FETCH,
  HANDLE_AUTO_CONNECT_OFFER,
  GET_OFFERS_CBM_HISTORY_FETCH
} from 'reducers/offersReducer'
import {
  fetchOffersSaga,
  fetchRegisteredOffersSaga,
  addOfferSaga,
  changeOfferSaga,
  deleteOfferSaga,
  handleAutoConnectOfferSaga
} from './offersSaga'
import { fetchOffersHistorySaga, fetchOffersCbmHistorySaga } from './offersHistorySaga'

export default function * () {
  yield all([
    takeEvery(FETCH_OFFERS, fetchOffersSaga),
    takeEvery(FETCH_REGISTERED_OFFERS, fetchRegisteredOffersSaga),
    takeEvery(ADD_OFFERS, addOfferSaga),
    takeEvery(CHANGE_OFFER, changeOfferSaga),
    takeEvery(DELETE_OFFER, deleteOfferSaga),
    takeEvery(GET_OFFERS_HISTORY_FETCH, fetchOffersHistorySaga),
    takeEvery(HANDLE_AUTO_CONNECT_OFFER, handleAutoConnectOfferSaga),
    takeEvery(GET_OFFERS_CBM_HISTORY_FETCH, fetchOffersCbmHistorySaga)
  ])
}
