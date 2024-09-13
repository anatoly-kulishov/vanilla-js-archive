import { all, takeEvery } from 'redux-saga/effects'
import {
  CREATE_HANDLING,
  CHECK_REPEATED_HANDLING,
  CLOSE_HANDLING_FETCH,
  LAST_HANDLINGS,
  GET_HANDLING_COORDINATES,
  SET_HANDLING_COORDINATES,
  GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING,
  FETCH_HANDLING_STATUS,
  FETCH_LINKED_INTERACTIONS
} from 'reducers/internal/handlingReducer'

import {
  createHandlingSaga,
  closeHandlingSaga,
  checkRepeatedHandlingSaga,
  fetchLastHandligsSaga,
  fetchHandligCoordinatesSaga,
  setHandligCoordinatesSaga,
  fetchInteractionParamsForLinkedHandlingSaga,
  fetchHandlingStatusSaga,
  fetchLinkedInteractionsSaga
} from './handlingSaga'

export default function * () {
  yield all([
    takeEvery(CREATE_HANDLING, createHandlingSaga),
    takeEvery(CLOSE_HANDLING_FETCH, closeHandlingSaga),
    takeEvery(CHECK_REPEATED_HANDLING, checkRepeatedHandlingSaga),
    takeEvery(LAST_HANDLINGS, fetchLastHandligsSaga),
    takeEvery(GET_HANDLING_COORDINATES, fetchHandligCoordinatesSaga),
    takeEvery(SET_HANDLING_COORDINATES, setHandligCoordinatesSaga),
    takeEvery(GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING, fetchInteractionParamsForLinkedHandlingSaga),
    takeEvery(FETCH_HANDLING_STATUS, fetchHandlingStatusSaga),
    takeEvery(FETCH_LINKED_INTERACTIONS, fetchLinkedInteractionsSaga)
  ])
}
