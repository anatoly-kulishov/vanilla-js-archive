import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

import { OperationStatus } from 'webseller/helpers'

import { CHANGE_CODE_WORD_PROCESS_STEPS } from './constants'

export const INIT_PROCESS = 'changeCodeWord/INIT_PROCESS'
export const SET_PROCESS_STEP = 'changeCodeWord/SET_PROCESS_STEP'
export const SET_DOCUMENT_DATA = 'changeCodeWord/SET_DOCUMENT_DATA'
export const RESET_PROCESS = 'changeCodeWord/RESET_PROCESS'

export const GET_SMS_CODE = 'changeCodeWord/GET_SMS_CODE'
export const CHECK_PEP_CODE = 'changeCodeWord/CHECK_PEP_CODE'
export const GET_PAPER_DOCUMENTS = 'changeCodeWord/GET_PAPER_DOCUMENTS'
export const CREATE_INTERACTION = 'changeCodeWord/CREATE_INTERACTION'

export const CHANGE_CODE_WORD = 'changeCodeWord/CHANGE_CODE_WORD'
export const SEND_CHANGE_CODE_WORD_SUCCESS = 'changeCodeWord/SEND_CHANGE_CODE_WORD_SUCCESS'
export const SEND_CHANGE_CODE_WORD_ERROR = 'changeCodeWord/SEND_CHANGE_CODE_WORD_ERROR'

export const GET_SUBSCRIBER_PERSONAL_DATA = 'changeCodeWord/GET_SUBSCRIBER_PERSONAL_DATA'
export const GET_SUBSCRIBER_PERSONAL_DATA_SUCCESS = 'changeCodeWord/GET_SUBSCRIBER_PERSONAL_DATA_SUCCESS'
export const GET_SUBSCRIBER_PERSONAL_DATA_ERROR = 'changeCodeWord/GET_SUBSCRIBER_PERSONAL_DATA_ERROR'

export const GET_B2B_CLIENT_MINIMAL_INFO = 'changeCodeWord/GET_B2B_CLIENT_MINIMAL_INFO'
export const GET_B2B_CLIENT_MINIMAL_INFO_SUCCESS = 'changeCodeWord/GET_B2B_CLIENT_MINIMAL_INFO_SUCCESS'
export const GET_B2B_CLIENT_MINIMAL_INFO_ERROR = 'changeCodeWord/GET_B2B_CLIENT_MINIMAL_INFO_ERROR'

export const initChangeCodeWordProcess = createAction(INIT_PROCESS)
export const setChangeCodeWordProcessStep = createAction(SET_PROCESS_STEP)
export const setDocumentData = createAction(SET_DOCUMENT_DATA)
export const resetChangeCodeWordProcess = createAction(RESET_PROCESS)

export const changeCodeSim = createAction(CHANGE_CODE_WORD)
export const changeCodeSuccess = createAction(SEND_CHANGE_CODE_WORD_SUCCESS)
export const changeCodeError = createAction(SEND_CHANGE_CODE_WORD_ERROR)

export const getSmsCode = createAction(GET_SMS_CODE)
export const checkPepCode = createAction(CHECK_PEP_CODE)
export const getPaperDocuments = createAction(GET_PAPER_DOCUMENTS)
export const createInteractionChangeCodeWord = createAction(CREATE_INTERACTION)

export const getSubscriberPersonalData = createAction(GET_SUBSCRIBER_PERSONAL_DATA)
export const getSubscriberPersonalDataSuccess = createAction(GET_SUBSCRIBER_PERSONAL_DATA_SUCCESS)
export const getSubscriberPersonalDataError = createAction(GET_SUBSCRIBER_PERSONAL_DATA_ERROR)

export const getB2bClientMinimalInfo = createAction(GET_B2B_CLIENT_MINIMAL_INFO)
export const getB2bClientMinimalInfoSuccess = createAction(GET_B2B_CLIENT_MINIMAL_INFO_SUCCESS)
export const getB2bClientMinimalInfoError = createAction(GET_B2B_CLIENT_MINIMAL_INFO_ERROR)

const initialState = {
  changeCodeWordStep: CHANGE_CODE_WORD_PROCESS_STEPS.NONE,
  operationStatus: OperationStatus.NONE,
  documentData: null,

  changeCodeWordAvailability: null,
  isChangeCodeWordAAvailabilityLoading: false,
  isChangeCodeWordAAvailabilityError: false,

  isSuccessChangeCodeWord: null,
  isChangeCodeWordLoading: false,
  isChangeCodeWordError: false,

  subscriberPersonalData: null,
  isSubscriberPersonalDataLoading: false,
  isSubscriberPersonalDataError: false,

  b2bClientMinimalInfo: null,
  isb2bClientMinimalInfoLoading: false,
  isb2bClientMinimalInfoError: false
}

export default handleActions({
  [INIT_PROCESS]: produce((state) => {
    state.changeCodeWordStep = CHANGE_CODE_WORD_PROCESS_STEPS.CODE_WORD
  }),
  [SET_PROCESS_STEP]: produce((state, { payload }) => {
    state.changeCodeWordStep = payload
  }),
  [SET_DOCUMENT_DATA]: produce((state, { payload }) => {
    state.documentData = {
      ...state.documentData,
      ...payload
    }
  }),

  [CHANGE_CODE_WORD]: produce((state) => {
    state.operationStatus = OperationStatus.NONE
    state.isSuccessChangeCodeWord = null
    state.isChangeCodeWordLoading = true
    state.isChangeCodeWordError = false
  }),
  [SEND_CHANGE_CODE_WORD_SUCCESS]: produce((state) => {
    state.operationStatus = OperationStatus.SUCCESSFUL
    state.isSuccessChangeCodeWord = true
    state.isChangeCodeWordLoading = false
  }),
  [SEND_CHANGE_CODE_WORD_ERROR]: produce((state) => {
    state.operationStatus = OperationStatus.FAILURE
    state.isSuccessChangeCodeWord = false
    state.isChangeCodeWordLoading = false
    state.isChangeCodeWordError = true
  }),

  [GET_SUBSCRIBER_PERSONAL_DATA]: produce((state) => {
    state.subscriberPersonalData = null
    state.isSubscriberPersonalDataLoading = true
    state.isSubscriberPersonalDataError = false
  }),
  [GET_SUBSCRIBER_PERSONAL_DATA_SUCCESS]: produce((state, { payload }) => {
    state.subscriberPersonalData = payload?.response
    state.isSubscriberPersonalDataLoading = false
  }),
  [GET_SUBSCRIBER_PERSONAL_DATA_ERROR]: produce((state) => {
    state.isChangeCodeWordLoading = false
    state.isSubscriberPersonalDataError = true
  }),

  [GET_B2B_CLIENT_MINIMAL_INFO]: produce((state) => {
    state.b2bClientMinimalInfo = null
    state.isb2bClientMinimalInfoLoading = true
    state.isb2bClientMinimalInfoError = false
  }),
  [GET_B2B_CLIENT_MINIMAL_INFO_SUCCESS]: produce((state, { payload }) => {
    state.b2bClientMinimalInfo = payload?.response
    state.isb2bClientMinimalInfoLoading = false
  }),
  [GET_B2B_CLIENT_MINIMAL_INFO_ERROR]: produce((state) => {
    state.isb2bClientMinimalInfoLoading = false
    state.isb2bClientMinimalInfoError = true
  }),

  [RESET_PROCESS]: produce(() => initialState)
}, initialState)
