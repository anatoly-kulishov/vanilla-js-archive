import { takeEvery } from 'redux-saga/effects'
import {
  REGIONS_FETCH
} from 'reducers/massProblems/massProblemServiceReducer'
import { GET_SERVICE_CHANNEL_INTERFACES, REGION_PROBLEM_FETCH } from 'reducers/massProblems/massProblemForRegionReducer'
import { REGISTER_NOTE_FETCH, FETCH_SUBSCRIBER_INFO } from 'reducers/massProblems/massProblemRegisterNoteReducer'
import { FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD } from 'reducers/massProblems/massProblemDiagnosticsReducer'
import {
  fetchMassProblemForRegionSaga,
  fetchMassProblemRegisterNoteSaga,
  fetchSubsriberInfoSaga,
  getServiceChannelInterfaceSaga
} from './massProblemsSaga'

import {
  fetchMassProblemsRegionsSaga
} from './massProblemServiceSaga'

import {
  fetchActualMtpJournalForPeriodSaga
} from './massProblemDiagnosticsSaga'

export default function * () {
  yield takeEvery(REGIONS_FETCH, fetchMassProblemsRegionsSaga)
  yield takeEvery(REGION_PROBLEM_FETCH, fetchMassProblemForRegionSaga)
  yield takeEvery(REGISTER_NOTE_FETCH, fetchMassProblemRegisterNoteSaga)
  yield takeEvery(FETCH_SUBSCRIBER_INFO, fetchSubsriberInfoSaga)
  yield takeEvery(FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD, fetchActualMtpJournalForPeriodSaga)
  yield takeEvery(GET_SERVICE_CHANNEL_INTERFACES, getServiceChannelInterfaceSaga)
}
