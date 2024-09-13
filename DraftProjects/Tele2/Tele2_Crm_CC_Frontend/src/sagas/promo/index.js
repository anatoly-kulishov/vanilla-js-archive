import { all, takeEvery } from 'redux-saga/effects'

import {
  ACTIVATE_PROMO_FETCH,
  GET_PROMO_HISTORY_FETCH,
  GET_PROMO_HISTORY_FILTERS_FETCH,
  CANCEL_PROMO_FETCH,
  NOTIFY_PROMO_FETCH
} from 'reducers/promo/promoReducer'
import {
  fetchPromoHistorySaga,
  fetchPromoHistoryFiltersSaga,
  fetchPromoActivationSaga,
  fetchPromoCancelationSaga,
  fetchPromoNotificationSaga
} from './promoSaga'

export default function * () {
  yield all([
    takeEvery(GET_PROMO_HISTORY_FETCH, fetchPromoHistorySaga),
    takeEvery(GET_PROMO_HISTORY_FILTERS_FETCH, fetchPromoHistoryFiltersSaga),
    takeEvery(ACTIVATE_PROMO_FETCH, fetchPromoActivationSaga),
    takeEvery(CANCEL_PROMO_FETCH, fetchPromoCancelationSaga),
    takeEvery(NOTIFY_PROMO_FETCH, fetchPromoNotificationSaga)
  ])
}
