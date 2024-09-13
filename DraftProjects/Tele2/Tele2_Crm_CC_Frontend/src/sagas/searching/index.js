import { all, takeEvery } from 'redux-saga/effects'

// KMS searching
import { KMS_SEARCHING_FETCH, KMS_SEARCHING_AND_REDIRECT_FETCH } from 'reducers/searching/kmsSearchingReducer'
import { FETCH_IRREGULAR_WORDS } from 'reducers/searching/smartSearchingReducer'

// smartSearching
import { fetchKmsSearchSaga, fetchKmsSearchAndRedirectSaga } from './kmsSearchingSaga'
import { fetchIrregularWordsSaga } from './smartSearchingSaga'
import { RC_SEARCH_CONNECT } from 'reducers/searching/reasonCategorySearchReducer'
import { RcSearchConnectSaga } from './reasonCategorySearchSaga'

export default function * () {
  yield all([
    // kmsSearchingSaga
    takeEvery(KMS_SEARCHING_FETCH, fetchKmsSearchSaga),
    takeEvery(KMS_SEARCHING_AND_REDIRECT_FETCH, fetchKmsSearchAndRedirectSaga),

    // smartSearchingSaga
    takeEvery(FETCH_IRREGULAR_WORDS, fetchIrregularWordsSaga),

    // reasonCategory
    takeEvery(RC_SEARCH_CONNECT, RcSearchConnectSaga)
  ])
}
