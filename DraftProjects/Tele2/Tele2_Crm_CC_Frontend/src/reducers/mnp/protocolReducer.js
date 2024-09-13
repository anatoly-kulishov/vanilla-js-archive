import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_PROTOCOL_STATUS_CONTEXT = 'protocol/FETCH_PROTOCOL_STATUS_CONTEXT'
export const FETCH_PROTOCOL_STATUS_CONTEXT_SUCCESS = 'protocol/FETCH_PROTOCOL_STATUS_CONTEXT_SUCCESS'
export const FETCH_PROTOCOL_STATUS_CONTEXT_FULL_SUCCESS = 'protocol/FETCH_PROTOCOL_STATUS_CONTEXT_FULL_SUCCESS'
export const FETCH_PROTOCOL_STATUS_CONTEXT_ERROR = 'protocol/FETCH_PROTOCOL_STATUS_CONTEXT_ERROR'
export const FETCH_PROTOCOL_STATUS_CONTEXT_FAILURE = 'protocol/FETCH_PROTOCOL_STATUS_CONTEXT_FAILURE'

export const GET_QUESTION_PROTOCOL = 'protocol/GET_QUESTION_PROTOCOL'
export const GET_QUESTION_PROTOCOL_SUCCESS = 'protocol/GET_QUESTION_PROTOCOL_SUCCESS'
export const GET_QUESTION_PROTOCOL_ERROR = 'protocol/GET_QUESTION_PROTOCOL_ERROR'
export const GET_QUESTION_PROTOCOL_FAILURE = 'protocol/GET_QUESTION_PROTOCOL_FAILURE'

export const CREATE_DRAFT_PROTOCOL = 'protocol/CREATE_DRAFT_PROTOCOL'
export const CREATE_DRAFT_PROTOCOL_SUCCESS = 'protocol/CREATE_DRAFT_PROTOCOL_SUCCESS'
export const CREATE_DRAFT_PROTOCOL_ERROR = 'protocol/CREATE_DRAFT_PROTOCOL_ERROR'
export const CREATE_DRAFT_PROTOCOL_FAILURE = 'protocol/CREATE_DRAFT_PROTOCOL_FAILURE'

export const CHANGE_DRAFT_PROTOCOL = 'protocol/CHANGE_DRAFT_PROTOCOL'
export const CHANGE_DRAFT_PROTOCOL_SUCCESS = 'protocol/CHANGE_DRAFT_PROTOCOL_SUCCESS'
export const CHANGE_DRAFT_PROTOCOL_ERROR = 'protocol/CHANGE_DRAFT_PROTOCOL_ERROR'
export const CHANGE_DRAFT_PROTOCOL_FAILURE = 'protocol/CHANGE_DRAFT_PROTOCOL_FAILURE'

export const PROTOCOL = 'protocol/PROTOCOL'
export const PROTOCOL_SUCCESS = 'protocol/PROTOCOL_SUCCESS'
export const PROTOCOL_ERROR = 'protocol/PROTOCOL_ERROR'
export const PROTOCOL_FAILURE = 'protocol/PROTOCOL_FAILURE'

export const fetchProtocolStatusContext = createAction(FETCH_PROTOCOL_STATUS_CONTEXT)
export const getQuestionProtocol = createAction(GET_QUESTION_PROTOCOL)
export const createDraftProtocol = createAction(CREATE_DRAFT_PROTOCOL)
export const changeDraftProtocol = createAction(CHANGE_DRAFT_PROTOCOL)
export const protocol = createAction(PROTOCOL)

const initialState = {
  protocolStatusContextData: [],
  protocolStatusContextFullData: [],
  isProtocolStatusContextLoading: false,
  isProtocolStatusContextError: '',

  isGetQuestionProtocolLoading: false,
  isGetQuestionProtocolError: false,
  questionProtocolData: {},

  createProtocolResult: null,
  isCreateProtocolLoading: false,

  changeProtocolResult: null,
  isChangeProtocolLoading: false,

  protocolResult: null,
  isProtocolLoading: false
}

export default handleActions(
  {
    [FETCH_PROTOCOL_STATUS_CONTEXT]: produce(state => {
      state.isProtocolStatusContextLoading = true
    }),
    [FETCH_PROTOCOL_STATUS_CONTEXT_SUCCESS]: produce((state, { payload }) => {
      state.isProtocolStatusContextLoading = false
      state.protocolStatusContextData = payload
    }),
    [FETCH_PROTOCOL_STATUS_CONTEXT_FULL_SUCCESS]: produce((state, { payload }) => {
      state.isProtocolStatusContextLoading = false
      state.protocolStatusContextFullData = payload
    }),
    [combineActions(FETCH_PROTOCOL_STATUS_CONTEXT_ERROR, FETCH_PROTOCOL_STATUS_CONTEXT_FAILURE)]: produce((state, { payload }) => {
      state.isProtocolStatusContextLoading = false
      state.isProtocolStatusContextError = payload
    }),

    [GET_QUESTION_PROTOCOL]: produce(state => {
      state.isGetQuestionProtocolLoading = true
      state.isGetQuestionProtocolError = false
    }),
    [GET_QUESTION_PROTOCOL_SUCCESS]: produce((state, { payload }) => {
      state.isGetQuestionProtocolLoading = false
      state.questionProtocolData = payload
    }),
    [combineActions(GET_QUESTION_PROTOCOL_ERROR, GET_QUESTION_PROTOCOL_FAILURE)]: produce((state, { payload }) => {
      state.isGetQuestionProtocolLoading = false
      state.isGetQuestionProtocolError = payload
    }),

    [CREATE_DRAFT_PROTOCOL]: produce(state => {
      state.isCreateProtocolLoading = true
    }),
    [CREATE_DRAFT_PROTOCOL_SUCCESS]: produce((state, { payload }) => {
      state.isCreateProtocolLoading = false
      state.createProtocolResult = payload
    }),
    [combineActions(CREATE_DRAFT_PROTOCOL_ERROR, CREATE_DRAFT_PROTOCOL_FAILURE)]: produce((state, { payload }) => {
      state.isCreateProtocolLoading = false
      state.isCreateProtocolError = payload
    }),

    [CHANGE_DRAFT_PROTOCOL]: produce(state => {
      state.isChangeProtocolLoading = true
    }),
    [CHANGE_DRAFT_PROTOCOL_SUCCESS]: produce((state, { payload }) => {
      state.isChangeProtocolLoading = false
      state.changeProtocolResult = payload
    }),
    [combineActions(CHANGE_DRAFT_PROTOCOL_ERROR, CHANGE_DRAFT_PROTOCOL_FAILURE)]: produce((state, { payload }) => {
      state.isChangeProtocolLoading = false
      state.isChangeProtocolError = payload
    }),

    [PROTOCOL]: produce(state => {
      state.isProtocolLoading = true
    }),
    [PROTOCOL_SUCCESS]: produce((state, { payload }) => {
      state.isProtocolLoading = false
      state.protocolResult = payload
    }),
    [combineActions(PROTOCOL_ERROR, PROTOCOL_FAILURE)]: produce((state, { payload }) => {
      state.isProtocolLoading = false
      state.isDraftProtocolError = payload
    })
  },
  initialState
)
