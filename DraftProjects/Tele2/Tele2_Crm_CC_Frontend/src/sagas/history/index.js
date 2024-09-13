import { all, takeEvery } from 'redux-saga/effects'

import { HISTORY_INTERACTIONS_FETCH } from 'reducers/history/historyInteractionsReducer'
import { historyInteractionsSaga } from './historyInteractionsSaga'

import { FETCH_WG_HISTORY } from 'reducers/history/wgHistoryReducer'
import { fetchWgHistorySaga } from './wgHistorySaga'

import { FETCH_MNP_HISTORY } from 'reducers/history/mnpHistoryReducer'
import { fetchMnpHistorySaga } from './mnpHistorySaga'

export default function * () {
  yield all([
    takeEvery(HISTORY_INTERACTIONS_FETCH, historyInteractionsSaga),
    takeEvery(FETCH_WG_HISTORY, fetchWgHistorySaga),
    takeEvery(FETCH_MNP_HISTORY, fetchMnpHistorySaga)
  ])
}
