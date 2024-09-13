import { all, takeEvery, takeLatest } from 'redux-saga/effects'

import {
  CREATE_TICKET,
  FETCH_CONTACT_LINES,
  TICKET_ADD_PARAMS,
  FETCH_REASONS_CATEGORIES,
  FILTER_REASONS,
  FETCH_VALIDATED_COORDINATES,
  CHECK_COVERAGES,
  CHECK_MTP_BY_SERVICE_ID
} from 'reducers/tickets/createTicketReducer'

import {
  createTicketSaga,
  fetchContactLinesSaga,
  fetchAddParamsSaga,
  fetchReasonsCategoriesDelaySaga,
  fetchReasonsCategoriesSaga,
  fetchValidatedCoordinatesSaga
} from './createTicketSaga'

import { TICKET_ADD_FILE, TICKET_ADD_COMMENT, TICKET_DELETE_FILE } from 'reducers/tickets/ticketReducer'

import {
  ticketAddFileSaga,
  fetchDeleteFileSaga,
  ticketAddCommentSaga,
  checkCoveragesSaga,
  checkMTPByServiceIdSaga
} from './ticketSaga'

import {
  FETCH_TICKETS,
  FETCH_TICKET,
  FETCH_TICKET_CHECKLIST,
  FETCH_TICKET_COMMENTS,
  FETCH_TICKET_STATUSES,
  FETCH_TICKETS_REASONS_CATEGORIES,
  FETCH_TICKET_FILES,
  TICKET_GRID_BY_FILTERS_FETCH,
  TICKET_GRID_BY_TICKET_FETCH
} from 'reducers/tickets/historyTicketReducer'

import {
  fetchTicketsSaga,
  fetchTicketSaga,
  fetchTicketsReasonsCategoriesSaga,
  fetchTicketGridDataByTicketSaga,
  fetchTicketGridDataByFiltersSaga,
  fetchTicketCheckListSaga,
  fetchTicketCommentsSaga,
  fetchTicketStatusesSaga,
  fetchTicketFilesSaga
} from './historyTicketSaga'

export default function * () {
  yield all([
    // createTicket
    takeEvery(FETCH_CONTACT_LINES, fetchContactLinesSaga),
    takeEvery(TICKET_ADD_PARAMS, fetchAddParamsSaga),
    takeEvery(CREATE_TICKET, createTicketSaga),
    takeEvery(FETCH_REASONS_CATEGORIES, fetchReasonsCategoriesSaga),
    takeLatest(FILTER_REASONS, fetchReasonsCategoriesDelaySaga),
    takeLatest(FETCH_VALIDATED_COORDINATES, fetchValidatedCoordinatesSaga),

    // ticket
    takeEvery(TICKET_ADD_FILE, ticketAddFileSaga),
    takeEvery(TICKET_DELETE_FILE, fetchDeleteFileSaga),
    takeEvery(TICKET_ADD_COMMENT, ticketAddCommentSaga),
    takeEvery(CHECK_COVERAGES, checkCoveragesSaga),
    takeEvery(CHECK_MTP_BY_SERVICE_ID, checkMTPByServiceIdSaga),

    // historyTicket
    takeEvery(FETCH_TICKETS, fetchTicketsSaga),
    takeEvery(FETCH_TICKET, fetchTicketSaga),
    takeEvery(FETCH_TICKET_CHECKLIST, fetchTicketCheckListSaga),
    takeEvery(FETCH_TICKET_COMMENTS, fetchTicketCommentsSaga),
    takeEvery(FETCH_TICKET_FILES, fetchTicketFilesSaga),
    takeEvery(TICKET_GRID_BY_FILTERS_FETCH, fetchTicketGridDataByFiltersSaga),
    takeEvery(TICKET_GRID_BY_TICKET_FETCH, fetchTicketGridDataByTicketSaga),
    takeEvery(FETCH_TICKET_STATUSES, fetchTicketStatusesSaga),
    takeEvery(FETCH_TICKETS_REASONS_CATEGORIES, fetchTicketsReasonsCategoriesSaga)
  ])
}
