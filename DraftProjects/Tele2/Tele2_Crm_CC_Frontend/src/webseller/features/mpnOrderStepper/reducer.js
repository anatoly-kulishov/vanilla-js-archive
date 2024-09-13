import { produce } from 'immer'
import { handleActions } from 'redux-actions'

import { OperationStatus } from 'webseller/helpers'

import { MNP_ORDER_PROCESS_STEPS } from './constants'
import {
  CHECK_SIM_MNP,
  CHECK_SIM_MNP_ERROR,
  CHECK_SIM_MNP_SUCCESS,
  CREATE_MNP_REQUEST,
  CREATE_MNP_REQUEST_ERROR,
  CREATE_MNP_REQUEST_SUCCESS,
  GET_INITIAL_PERSONAL_DATA,
  GET_INITIAL_PERSONAL_DATA_ERROR,
  GET_INITIAL_PERSONAL_DATA_SUCCESS,
  GET_MNP_AVAILABLE_STATUS,
  GET_MNP_AVAILABLE_STATUS_ERROR,
  GET_MNP_AVAILABLE_STATUS_SUCCESS,
  INIT_MNP_ORDER_PROCESS,
  RESET_REPLACE_MNP_ORDER_PROCESS,
  SET_DOCUMENT_DATA,
  SET_MNP_ORDER_PROCESS_STEP,
  SUBMIT_PERSONAL_DATA
} from './actions'

const initialState = {
  mpnProcessStep: MNP_ORDER_PROCESS_STEPS.NONE,
  operationStatus: OperationStatus.NONE,

  mnpAvailableStatus: null,
  mnpAvailableStatusLoading: false,
  mnpAvailableStatusError: null,

  transferNumber: null,
  transferNumberOld: null,
  isCheckSimMnpLoading: false,
  checkSimMnpError: null,

  mnpOrderRequest: null,
  isMnpOrderRequestLoading: null,
  isMnpOrderRequestError: null,

  personalData: null,
  isLoadingGetInitialPersonalData: false,

  documentData: null
}

export default handleActions({
  [INIT_MNP_ORDER_PROCESS]: produce((state) => {
    state.mpnProcessStep = MNP_ORDER_PROCESS_STEPS.TRANSFER_NUMBER
  }),
  [SET_MNP_ORDER_PROCESS_STEP]: produce((state, { payload }) => {
    state.mpnProcessStep = payload
  }),

  [GET_MNP_AVAILABLE_STATUS]: (state) => ({
    ...state,
    mnpAvailableStatus: null,
    mnpAvailableStatusLoading: true,
    mnpAvailableStatusError: null
  }),
  [GET_MNP_AVAILABLE_STATUS_SUCCESS]: (state, { payload }) => ({
    ...state,
    mnpAvailableStatus: payload?.response,
    mnpAvailableStatusLoading: false,
    mnpAvailableStatusError: null
  }),
  [GET_MNP_AVAILABLE_STATUS_ERROR]: (state, { payload }) => ({
    ...state,
    mnpAvailableStatus: null,
    mnpAvailableStatusLoading: false,
    mnpAvailableStatusError: payload?.messageText
  }),

  [CHECK_SIM_MNP]: produce((state) => {
    state.isCheckSimMnpLoading = true
    state.checkSimMnpError = null
  }),
  [CHECK_SIM_MNP_SUCCESS]: produce((state, { payload }) => {
    state.transferNumber = payload?.NewNumber
    state.transferNumberOld = payload?.OldNumber
    state.isCheckSimMnpLoading = false
  }),
  [CHECK_SIM_MNP_ERROR]: produce((state, { payload }) => {
    state.isCheckSimMnpLoading = false
    state.checkSimMnpError = payload
  }),

  [CREATE_MNP_REQUEST]: produce((state) => {
    state.operationStatus = OperationStatus.NONE
    state.mnpOrderRequest = null
    state.isMnpOrderRequestLoading = true
    state.isMnpOrderRequestError = false
  }),
  [CREATE_MNP_REQUEST_SUCCESS]: produce((state, { payload }) => {
    state.operationStatus = OperationStatus.SUCCESSFUL
    state.mnpOrderRequest = payload
    state.isMnpOrderRequestLoading = false
    state.isMnpOrderRequestError = false
  }),
  [CREATE_MNP_REQUEST_ERROR]: produce((state) => {
    state.operationStatus = OperationStatus.FAILURE
    state.mnpOrderRequest = null
    state.isMnpOrderRequestLoading = false
    state.isMnpOrderRequestError = true
  }),

  [SET_DOCUMENT_DATA]: produce((state, { payload }) => {
    state.documentData = payload
  }),

  [GET_INITIAL_PERSONAL_DATA]: produce(state => {
    state.isLoadingGetInitialPersonalData = true
  }),
  [GET_INITIAL_PERSONAL_DATA_SUCCESS]: produce((state, { payload }) => {
    state.personalData = payload
    state.isLoadingGetInitialPersonalData = false
  }),
  [GET_INITIAL_PERSONAL_DATA_ERROR]: produce(state => {
    state.isLoadingGetInitialPersonalData = false
  }),

  [SUBMIT_PERSONAL_DATA]: produce((state, { payload }) => {
    state.personalData = payload
    state.mpnProcessStep = MNP_ORDER_PROCESS_STEPS.SIGNING
  }),

  [RESET_REPLACE_MNP_ORDER_PROCESS]: produce(() => initialState)
}, initialState)
