import { all, takeEvery } from 'redux-saga/effects'

import { GET_CUSTOMER_SCENARIO_HISTORY } from 'reducers/person/customerScenarioHistoryReducer'
import { CREATE_SCENARIO, GET_SCENARIOS, MODIFY_SCENARIO } from 'reducers/person/scenariosReducer'
import { GET_PERSON_ID } from 'reducers/person/personReducer'

import { getCustomerScenarioHistorySaga } from './customerScenarioHistorySaga'
import { createScenarioSaga, getScenariosSaga, modifyScenarioSaga } from './scenariosSaga'
import { getPersonIdSaga } from './personSaga'
import {
  CONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS,
  CONNECT_CUSTOMER_SEGMENTS_WS
} from 'reducers/person/customerSegmentsReducer'
import { connectCustomerSegmentsWsSaga, connectCustomerSegmentsPreviewWsSaga } from './customerSegmentsSaga'

export default function * () {
  yield all([
    takeEvery(GET_CUSTOMER_SCENARIO_HISTORY, getCustomerScenarioHistorySaga),
    takeEvery(GET_SCENARIOS, getScenariosSaga),
    takeEvery(CREATE_SCENARIO, createScenarioSaga),
    takeEvery(MODIFY_SCENARIO, modifyScenarioSaga),
    takeEvery(GET_PERSON_ID, getPersonIdSaga),
    takeEvery(CONNECT_CUSTOMER_SEGMENTS_WS, connectCustomerSegmentsWsSaga),
    takeEvery(CONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS, connectCustomerSegmentsPreviewWsSaga)
  ])
}
