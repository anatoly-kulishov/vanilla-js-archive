import { takeEvery, all } from 'redux-saga/effects'

import {
  FETCH_COVERAGES_AND_OFFICES,
  FETCH_ABONENT_COORDINATES,
  FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK,
  FETCH_PARAMETERS,
  REDIRECT_TO_SMART_GIS,
  FETCH_DEVIATION_LEVEL
} from 'reducers/diagnostics/diagnosticsReducer'
import {
  fetchCoveragesAndOfficesSaga,
  fetchAbonentCoordinatesSaga,
  fetchTechnologySubtechnologyLinkSaga,
  fetchParametersSaga,
  redirectToSmartGisSaga,
  fetchDeviationLevelSaga
} from './diagnosticsSaga'

import {
  FETCH_CLIENT_RESTRICTIONS,
  REMOVE_ALL_CLIENT_RESTRICTIONS,
  CHANGE_CLIENT_RESTRICTION
} from 'reducers/diagnostics/clientRestrictionsReducer'
import {
  fetchClientRestrictionsSaga,
  removeAllClientRestrictionsSaga,
  changeClientRestrictionSaga
} from './clientRestrictionsSaga'

import { CREATE_COVERAGE_AND_OFFICES_NOTE } from 'reducers/diagnostics/noteReducer'
import { createCoveragesAndOfficesNoteSaga } from './noteSaga'

export default function * () {
  yield all([
    takeEvery(FETCH_COVERAGES_AND_OFFICES, fetchCoveragesAndOfficesSaga),
    takeEvery(FETCH_ABONENT_COORDINATES, fetchAbonentCoordinatesSaga),
    takeEvery(FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK, fetchTechnologySubtechnologyLinkSaga),
    takeEvery(FETCH_PARAMETERS, fetchParametersSaga),
    takeEvery(FETCH_CLIENT_RESTRICTIONS, fetchClientRestrictionsSaga),
    takeEvery(REMOVE_ALL_CLIENT_RESTRICTIONS, removeAllClientRestrictionsSaga),
    takeEvery(REDIRECT_TO_SMART_GIS, redirectToSmartGisSaga),
    takeEvery(CHANGE_CLIENT_RESTRICTION, changeClientRestrictionSaga),
    takeEvery(FETCH_DEVIATION_LEVEL, fetchDeviationLevelSaga),
    takeEvery(CREATE_COVERAGE_AND_OFFICES_NOTE, createCoveragesAndOfficesNoteSaga)
  ])
}
