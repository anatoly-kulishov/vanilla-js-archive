import { all, takeEvery } from 'redux-saga/effects'

import { fetchManualSearchGridDataSaga } from './manualSearchSaga'

import { FETCH_MANUAL_SEARCH_GRID_DATA } from 'reducers/manualSearchReducer'

export default function * () {
  yield all([takeEvery(FETCH_MANUAL_SEARCH_GRID_DATA, fetchManualSearchGridDataSaga)])
}
