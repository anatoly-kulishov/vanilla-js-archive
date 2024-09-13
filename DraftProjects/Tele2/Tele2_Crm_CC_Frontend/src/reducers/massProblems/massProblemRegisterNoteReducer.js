import { createAction, handleActions, combineActions } from 'redux-actions'

export const REGISTER_NOTE_FETCH = 'massProblems/REGISTER_NOTE_FETCH'
export const REGISTER_NOTE_FETCH_SUCCESS = 'massProblems/REGISTER_NOTE_FETCH_SUCCESS'
export const REGISTER_NOTE_FETCH_ERROR = 'massProblems/REGISTER_NOTE_FETCH_ERROR'
export const REGISTER_NOTE_FETCH_FAILURE = 'massProblems/REGISTER_NOTE_FETCH_FAILURE'

export const FETCH_SUBSCRIBER_INFO = 'massProblems/FETCH_SUBSCRIBER_INFO'
export const FETCH_SUBSCRIBER_INFO_SUCCESS = 'massProblems/FETCH_SUBSCRIBER_INFO_SUCCESS'
export const FETCH_SUBSCRIBER_INFO_FAILURE = 'massProblems/FETCH_SUBSCRIBER_INFO_FAILURE'

export const CHANGE_MSISDN_STATUS_ARRAY = 'massProblems/CHANGE_MSISDN_STATUS_ARRAY'
export const CLEAR_MSISDN_STATUS_ARRAY = 'massProblems/CLEAR_MSISDN_STATUS_ARRAY'

const initalState = {
  mtpNote: null,
  mtpNoteError: null,
  isMtpNoteLoading: false,

  msisdnStatusArray: [],
  fetchSubscriberInfoErrorMessage: null
}

export const registerMtpNote = createAction(REGISTER_NOTE_FETCH)
export const fetchSubscriberInfo = createAction(FETCH_SUBSCRIBER_INFO)

export const changeMsisdnStatusArray = createAction(CHANGE_MSISDN_STATUS_ARRAY)

export default handleActions({
  [REGISTER_NOTE_FETCH]: (state) => ({
    ...state,
    mtpNote: null,
    mtpNoteError: null,
    isMtpNoteLoading: true
  }),

  [REGISTER_NOTE_FETCH_SUCCESS]: (state, { payload: { mtpNote } }) => ({
    ...state,
    mtpNote,
    mtpNoteError: null,
    isMtpNoteLoading: false
  }),

  [combineActions(REGISTER_NOTE_FETCH_ERROR, REGISTER_NOTE_FETCH_FAILURE)]:
  (state, { payload: { error } }) => ({
    ...state,
    mtpNote: null,
    mtpNoteError: error,
    isMtpNoteLoading: false
  }),

  [FETCH_SUBSCRIBER_INFO_SUCCESS]: (state, { payload: { copyMsisdnStatusArray } }) => ({
    ...state,
    msisdnStatusArray: copyMsisdnStatusArray
  }),

  [FETCH_SUBSCRIBER_INFO_FAILURE]: (state, { payload: { message } }) => ({
    ...state,
    fetchSubscriberInfoErrorMessage: message
  }),

  [CHANGE_MSISDN_STATUS_ARRAY]: (state, { payload: { modifiedMsisdnStatusArray } }) => ({
    ...state,
    msisdnStatusArray: modifiedMsisdnStatusArray
  })

}, initalState)
