import { takeEvery, all } from 'redux-saga/effects'

import { CATEGORIES_LIST_FETCH } from 'reducers/reasonsCategories/categoriesListReducer'
import { fetchCategoriesListSaga } from './categoriesListSaga'

import { RC_FOR_ESCALATION_FETCH } from 'reducers/reasonsCategories/reasonCategoryForEscalationReducer'
import { fetchReasonCategoryForEscalationSaga } from './reasonCategoryForEscalationSaga'

import {
  REASONS_LIST_FETCH,
  FILTERED_REASONS_LIST_FETCH,
  CLIENT_CATEGORIES_FETCH,
  CHANNELS_FETCH
} from 'reducers/reasonsCategories/reasonsListReducer'
import {
  fetchReasonsListSaga,
  fetchFilteredReasonsListSaga,
  fetchClientCategoriesSaga,
  fetchChannelsSaga
} from './reasonsListSaga'

import { FETCH_LOCATION_HISTORY } from 'reducers/reasonsCategories/reasonCategoryDiagnosticsReducer'
import { fetchLocationHistorySaga } from './reasonCategoryDiagnosticsSaga'

export default function * () {
  yield all([
    takeEvery(CATEGORIES_LIST_FETCH, fetchCategoriesListSaga),
    takeEvery(RC_FOR_ESCALATION_FETCH, fetchReasonCategoryForEscalationSaga),
    takeEvery(REASONS_LIST_FETCH, fetchReasonsListSaga),
    takeEvery(FILTERED_REASONS_LIST_FETCH, fetchFilteredReasonsListSaga),
    takeEvery(CLIENT_CATEGORIES_FETCH, fetchClientCategoriesSaga),
    takeEvery(CHANNELS_FETCH, fetchChannelsSaga),
    takeEvery(FETCH_LOCATION_HISTORY, fetchLocationHistorySaga)
  ])
}
