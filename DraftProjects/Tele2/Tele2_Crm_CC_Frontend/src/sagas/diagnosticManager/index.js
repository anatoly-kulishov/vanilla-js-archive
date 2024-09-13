import { all, takeEvery } from 'redux-saga/effects'

import { DIAGNOSTIC_SCENARIOS_FETCH } from 'reducers/diagnosticManager/diagnosticScenarioReducer'
import { fetchDiagnosticScenariosSaga } from './diagnosticScenarioSaga'

import { START_DIAGNOSTIC, STEP_DIAGNOSTIC } from 'reducers/diagnosticManager/diagnosticManagerReducer'
import { startDiagnosticSaga, stepDiagnosticSaga } from './diagnosticManagerSaga'

export default function * () {
  yield all([
    takeEvery(DIAGNOSTIC_SCENARIOS_FETCH, fetchDiagnosticScenariosSaga),
    takeEvery(START_DIAGNOSTIC, startDiagnosticSaga),
    takeEvery(STEP_DIAGNOSTIC, stepDiagnosticSaga)
  ])
}
