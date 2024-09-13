import { FETCH_ECOMMERCE_TYPES } from 'reducers/mnpJournal/eCommerceTypesReducer'
import { FETCH_MNP_JOURNAL } from 'reducers/mnpJournal/mnpJournalReducer'
import { all, takeEvery } from 'redux-saga/effects'

import { fetchECommerceTypesSaga } from './eCommerceTypesSaga'
import { fetchMnpJournalSaga } from './mnpJournalSaga'

export default function * () {
  yield all([takeEvery(FETCH_ECOMMERCE_TYPES, fetchECommerceTypesSaga)])
  yield all([takeEvery(FETCH_MNP_JOURNAL, fetchMnpJournalSaga)])
}
