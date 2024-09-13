import { createAction, handleActions } from 'redux-actions'

export const FETCH_TICKETS = 'ticket/FETCH_TICKETS'
export const FETCH_TICKETS_SUCCESS = 'ticket/FETCH_TICKETS_SUCCESS'
export const FETCH_TICKETS_ERROR = 'ticket/FETCH_TICKETS_ERROR'
export const FETCH_TICKETS_FAILURE = 'ticket/FETCH_TICKETS_FAILURE'

export const FETCH_TICKET = 'ticket/FETCH_TICKET'
export const FETCH_TICKET_SUCCESS = 'ticket/FETCH_TICKET_SUCCESS'
export const FETCH_TICKET_ERROR = 'ticket/FETCH_TICKET_ERROR'
export const FETCH_TICKET_FAILURE = 'ticket/FETCH_TICKET_FAILURE'

export const FETCH_TICKET_CHECKLIST = 'ticket/FETCH_TICKET_CHECKLIST'
export const FETCH_TICKET_CHECKLIST_SUCCESS = 'ticket/FETCH_TICKET_CHECKLIST_SUCCESS'
export const FETCH_TICKET_CHECKLIST_ERROR = 'ticket/FETCH_TICKET_CHECKLIST_ERROR'
export const FETCH_TICKET_CHECKLIST_FAILURE = 'ticket/FETCH_TICKET_CHECKLIST_FAILURE'

export const FETCH_TICKET_COMMENTS = 'ticket/FETCH_TICKET_COMMENTS'
export const FETCH_TICKET_COMMENTS_SUCCESS = 'ticket/FETCH_TICKET_COMMENTS_SUCCESS'
export const FETCH_TICKET_COMMENTS_ERROR = 'ticket/FETCH_TICKET_COMMENTS_ERROR'
export const FETCH_TICKET_COMMENTS_FAILURE = 'ticket/FETCH_TICKET_COMMENTS_FAILURE'

export const FETCH_TICKET_FILES = 'ticket/FETCH_TICKET_FILES'
export const FETCH_TICKET_FILES_SUCCESS = 'ticket/FETCH_TICKET_FILES_SUCCESS'
export const FETCH_TICKET_FILES_ERROR = 'ticket/FETCH_TICKET_FILES_ERROR'
export const FETCH_TICKET_FILES_FAILURE = 'ticket/FETCH_TICKET_FILES_FAILURE'

export const FETCH_TICKETS_REASONS_CATEGORIES = 'ticket/FETCH_TICKETS_REASONS_CATEGORIES'
export const FETCH_TICKETS_REASONS_CATEGORIES_SUCCESS = 'ticket/FETCH_TICKETS_REASONS_CATEGORIES_SUCCESS'
export const FETCH_TICKETS_REASONS_CATEGORIES_ERROR = 'ticket/FETCH_TICKETS_REASONS_CATEGORIES_ERROR'
export const FETCH_TICKETS_REASONS_CATEGORIES_FAILURE = 'ticket/FETCH_TICKETS_REASONS_CATEGORIES_FAILURE'

export const FETCH_TICKET_STATUSES = 'ticketsStatus/FETCH_TICKET_STATUSES'
export const FETCH_TICKET_STATUSES_SUCCESS = 'ticketsStatus/FETCH_TICKET_STATUSES_SUCCESS'
export const FETCH_TICKET_STATUSES_ERROR = 'ticketsStatus/FETCH_TICKET_STATUSES_ERROR'
export const FETCH_TICKET_STATUSES_FAILURE = 'ticketsStatus/FETCH_TICKET_STATUSES_FAILURE'

export const TICKET_GRID_BY_FILTERS_FETCH = 'ticket/TICKET_GRID_BY_FILTERS_FETCH'
export const TICKET_GRID_BY_TICKET_FETCH = 'ticket/TICKET_GRID_BY_TICKET_FETCH'

export const HANDLE_VISIBLE_TICKET_INFO_MODAL = 'ticket/HANDLE_VISIBLE_TICKET_INFO_MODAL'

const initialState = {
  isVisibleTicketInfoModal: false,

  ticketGrid: null,
  ticketGridError: null,
  isTicketGridLoading: false,

  ticket: null,
  ticketError: null,
  isTicketLoading: false,

  ticketChecklist: null,
  ticketChecklistError: null,
  isTicketChecklistLoading: false,

  ticketComments: null,
  ticketCommentsError: null,
  isTicketCommentsLoading: false,

  ticketStatuses: null,
  ticketStatusesError: null,
  isTicketStatusesLoading: false,

  ticketFiles: null,

  ticketsReasonsCategories: null,
  ticketsReasonsCategoriesError: null,
  isTicketsReasonsCategoriesLoading: false
}

export const fetchLeftBlockValues = createAction(FETCH_TICKET)
export const fetchRightBlockValues = createAction(FETCH_TICKET_CHECKLIST)
export const fetchTicketsReasonsCategories = createAction(FETCH_TICKETS_REASONS_CATEGORIES)
export const fetchTicketComments = createAction(FETCH_TICKET_COMMENTS)
export const fetchTicketStatuses = createAction(FETCH_TICKET_STATUSES)
export const fetchTicketFiles = createAction(FETCH_TICKET_FILES)
export const handleVisibleTicketInfoModal = createAction(HANDLE_VISIBLE_TICKET_INFO_MODAL)
export const fetchTickets = createAction(FETCH_TICKETS)
export const fetchTicketGridDataByFilters = createAction(TICKET_GRID_BY_FILTERS_FETCH)
export const fetchTicketGridDataByTicket = createAction(TICKET_GRID_BY_TICKET_FETCH)

export default handleActions({
  [FETCH_TICKETS]: (state) => ({
    ...state,
    ticketGrid: null,
    ticketGridError: false,
    isTicketGridLoading: true
  }),

  [FETCH_TICKETS_SUCCESS]: (
    state, { payload: { data } }) => ({
    ...state,
    ticketGrid: data,
    ticketGridError: false,
    isTicketGridLoading: false
  }),

  [FETCH_TICKETS_ERROR]: (state, { payload: { errorCode, errorText, stateCode } }) => ({
    ...state,
    ticketGrid: { ErrorCode: errorCode, ErrorText: errorText, StateCode: stateCode },
    ticketGridError: true,
    isTicketGridLoading: false
  }),

  [FETCH_TICKETS_FAILURE]: (state) => ({
    ...state,
    ticketGrid: {},
    ticketGridError: true,
    isTicketGridLoading: false
  }),

  [TICKET_GRID_BY_FILTERS_FETCH]: (state) => ({
    ...state,
    isTicketGridLoading: true
  }),

  [TICKET_GRID_BY_TICKET_FETCH]: (state) => ({
    ...state,
    isTicketGridLoading: true
  }),

  [HANDLE_VISIBLE_TICKET_INFO_MODAL]: state => ({
    ...state,
    isVisibleTicketInfoModal: !state.isVisibleTicketInfoModal
  }),

  [FETCH_TICKET]: (state) => ({
    ...state,
    ticket: null,
    ticketError: false,
    isTicketLoading: true
  }),

  [FETCH_TICKET_SUCCESS]: (
    state, { payload: {
      data, isSuccess
    } }) => ({
    ...state,
    ticket: data,
    ticketError: false,
    isTicketLoading: false
  }),

  [FETCH_TICKET_ERROR]: (state, { payload: { errorCode, errorText, stateCode } }) => ({
    ...state,
    ticket: { ErrorCode: errorCode, ErrorText: errorText, StateCode: stateCode },
    ticketError: true,
    isTicketLoading: false
  }),

  [FETCH_TICKET_FAILURE]: (state) => ({
    ...state,
    ticket: {},
    ticketError: true,
    isTicketLoading: false
  }),

  [FETCH_TICKET_CHECKLIST]: (state) => ({
    ...state,
    ticketChecklist: null,
    ticketChecklistError: false,
    isTicketChecklistLoading: true
  }),

  [FETCH_TICKET_CHECKLIST_SUCCESS]: (
    state, { payload: {
      data, isSuccess
    } }) => ({
    ...state,
    ticketChecklist: data,
    ticketChecklistError: false,
    isTicketChecklistLoading: false
  }),

  [FETCH_TICKET_CHECKLIST_ERROR]: (state, { payload: { errorCode, errorText, stateCode } }) => ({
    ...state,
    ticketChecklist: { ErrorCode: errorCode, ErrorText: errorText, StateCode: stateCode },
    ticketChecklistError: true,
    isTicketChecklistLoading: false
  }),

  [FETCH_TICKET_CHECKLIST_FAILURE]: (state) => ({
    ...state,
    ticketChecklist: {},
    ticketChecklistError: true,
    isTicketChecklistLoading: false
  }),

  [FETCH_TICKETS_REASONS_CATEGORIES]: (state) => ({
    ...state,
    ticketsReasonsCategories: null,
    ticketsReasonsCategoriesError: false,
    isTicketsReasonsCategoriesLoading: true
  }),

  [FETCH_TICKETS_REASONS_CATEGORIES_SUCCESS]: (
    state, { payload: {
      data, isSuccess
    } }) => ({
    ...state,
    ticketsReasonsCategories: data,
    ticketsReasonsCategoriesError: false,
    isTicketsReasonsCategoriesLoading: false
  }),

  [FETCH_TICKETS_REASONS_CATEGORIES_ERROR]: (state, { payload: { errorCode, errorText, stateCode } }) => ({
    ...state,
    ticketsReasonsCategories: { ErrorCode: errorCode, ErrorText: errorText, StateCode: stateCode },
    ticketsReasonsCategoriesError: true,
    isAddFileLoading: false
  }),

  [FETCH_TICKETS_REASONS_CATEGORIES_FAILURE]: (state) => ({
    ...state,
    ticketsReasonsCategories: {},
    ticketsReasonsCategoriesError: true,
    isTicketsReasonsCategoriesLoading: false
  }),

  [FETCH_TICKET_STATUSES]: (state) => ({
    ...state,
    ticketStatuses: null,
    ticketStatusesError: false,
    isTicketStatusesLoading: true
  }),

  [FETCH_TICKET_STATUSES_SUCCESS]: (
    state, { payload: {
      bpmIncidentStatus, success
    } }) => ({
    ...state,
    ticketStatuses: {
      BpmIncidentStatus: bpmIncidentStatus
    },
    ticketStatusesError: false,
    isTicketStatusesLoading: false
  }),

  [FETCH_TICKET_STATUSES_ERROR]: (state, { payload: { errorCode, errorText, stateCode } }) => ({
    ...state,
    ticketStatuses: { ErrorCode: errorCode, ErrorText: errorText, StateCode: stateCode },
    ticketStatusesError: true,
    isTicketStatusesLoading: false
  }),

  [FETCH_TICKET_STATUSES_FAILURE]: (state) => ({
    ...state,
    ticketStatuses: {},
    ticketStatusesError: true,
    isTicketStatusesLoading: false
  }),

  [FETCH_TICKET_COMMENTS]: (state) => ({
    ...state,
    ticketComments: null,
    ticketCommentsError: false,
    isTicketCommentsLoading: true
  }),

  [FETCH_TICKET_COMMENTS_SUCCESS]: (
    state, { payload: {
      data, isSuccess
    } }) => ({
    ...state,
    ticketComments: data,
    ticketCommentsError: false,
    isTicketCommentsLoading: false
  }),

  [FETCH_TICKET_COMMENTS_ERROR]: (state, { payload: { errorCode, errorText, stateCode } }) => ({
    ...state,
    ticketComments: { ErrorCode: errorCode, ErrorText: errorText, StateCode: stateCode },
    ticketCommentsError: true,
    isTicketCommentsLoading: false
  }),

  [FETCH_TICKET_COMMENTS_FAILURE]: (state) => ({
    ...state,
    ticketComments: {},
    ticketCommentsError: true,
    isTicketCommentsLoading: false
  }),

  [FETCH_TICKET_FILES]: (state) => ({ ...state, ticketFiles: null }),
  [FETCH_TICKET_FILES_SUCCESS]: (state, { payload: { data, isSuccess } }) => ({ ...state, ticketFiles: data }),
  [FETCH_TICKET_FILES_ERROR]: (state, { payload: { errorCode, errorText, stateCode } }) => ({
    ...state,
    ticketFiles: { ErrorCode: errorCode, ErrorText: errorText, StateCode: stateCode }
  }),
  [FETCH_TICKET_FILES_FAILURE]: (state) => ({ ...state, ticketFiles: {} })
}, initialState)
