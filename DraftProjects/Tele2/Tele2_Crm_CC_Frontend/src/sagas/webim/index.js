import { FETCH_WEBIM_DNS, FETCH_WEBIM_HASH } from 'reducers/webim/webimReducer'
import { all, takeEvery } from 'redux-saga/effects'

import { fetchWebimDnsSaga, fetchWebimHashSaga } from './webimSaga'

export default function * () {
  yield all([takeEvery(FETCH_WEBIM_HASH, fetchWebimHashSaga), takeEvery(FETCH_WEBIM_DNS, fetchWebimDnsSaga)])
}
