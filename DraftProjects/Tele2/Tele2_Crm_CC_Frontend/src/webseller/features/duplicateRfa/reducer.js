import { produce } from 'immer'
import { createAction, handleActions } from 'redux-actions'

import { DuplicateRfaStep } from './helpers'
import { OperationStatus } from 'webseller/helpers'

const GET_MARKER = 'duplicateRfa/GET_MARKER'
const GET_MARKER_SUCCESS = 'duplicateRfa/GET_MARKER_SUCCESS'
const GET_MARKER_ERROR = 'duplicateRfa/GET_MARKER_ERROR'

const CHANGE_STEP = 'duplicateRfa/CHANGE_STEP'

const INIT_PROCESS = 'duplicateRfa/INIT_PROCESS'

const CHECK_ICC = 'duplicateRfa/CHECK_ICC'
const CHECK_ICC_SUCCESS = 'duplicateRfa/CHECK_ICC_SUCCESS'
const CHECK_ICC_ERROR = 'duplicateRfa/CHECK_ICC_ERROR'
const CHECK_ICC_FAILURE = 'duplicateRfa/CHECK_ICC_FAILURE'

const GET_INITIAL_PERSONAL_DATA = 'duplicateRfa/GET_INITIAL_PERSONAL_DATA'
const GET_INITIAL_PERSONAL_DATA_SUCCESS = 'duplicateRfa/GET_INITIAL_PERSONAL_DATA_SUCCESS'
const GET_INITIAL_PERSONAL_DATA_ERROR = 'duplicateRfa/GET_INITIAL_PERSONAL_DATA_ERROR'

const SUBMIT_PERSONAL_DATA = 'duplicateRfa/SUBMIT_PERSONAL_DATA'

const GET_SMS_CODE = 'duplicateRfa/GET_SMS_CODE'
const CHECK_PEP_CODE = 'duplicateRfa/CHECK_PEP_CODE'
const GET_PAPER_DOCUMENTS = 'duplicateRfa/GET_PAPER_DOCUMENTS'

const EXECUTE_OPERATION = 'duplicateRfa/EXECUTE_OPERATION'
const EXECUTE_OPERATION_SUCCESS = 'duplicateRfa/EXECUTE_OPERATION_SUCCESS'
const EXECUTE_OPERATION_ERROR = 'duplicateRfa/EXECUTE_OPERATION_ERROR'

const RESET_PROCESS = 'duplicateRfa/RESET_PROCESS'

const CREATE_INTERACTION = 'duplicateRfa/CREATE_INTERACTION'

const initialState = {
  isFromMarkers: false,

  isNeedDuplicateRfa: false,

  status: OperationStatus.NONE,

  activeStep: DuplicateRfaStep.NONE,

  attemptsCountCheckIcc: 0,
  checkedIcc: null,
  isLoadingCheckIcc: false,

  personalData: null,
  isLoadingGetInitialPersonalData: false,

  isLoadingExecuteOperation: false,
  errorExecuteOperation: null
}

export const getMarkerDuplicateRfa = createAction(GET_MARKER)
export const getMarkerDuplicateRfaSuccess = createAction(GET_MARKER_SUCCESS)
export const getMarkerDuplicateRfaError = createAction(GET_MARKER_ERROR)

export const changeStepDuplicateRfa = createAction(CHANGE_STEP)

export const initDuplicateRfa = createAction(INIT_PROCESS)

export const checkIccDuplicateRfa = createAction(CHECK_ICC)
export const checkIccDuplicateRfaSuccess = createAction(CHECK_ICC_SUCCESS)
export const checkIccDuplicateRfaError = createAction(CHECK_ICC_ERROR)
export const checkIccDuplicateRfaFailure = createAction(CHECK_ICC_FAILURE)

export const getInitialPersonalDataDuplicateRfa = createAction(GET_INITIAL_PERSONAL_DATA)
export const getInitialPersonalDataDuplicateRfaSuccess = createAction(GET_INITIAL_PERSONAL_DATA_SUCCESS)
export const getInitialPersonalDataDuplicateRfaError = createAction(GET_INITIAL_PERSONAL_DATA_ERROR)

export const submitPersonalDataDuplicateRfa = createAction(SUBMIT_PERSONAL_DATA)

export const getSmsCodeDuplicateRfa = createAction(GET_SMS_CODE)
export const checkPepCodeDuplicateRfa = createAction(CHECK_PEP_CODE)
export const getPaperDocumentsDuplicateRfa = createAction(GET_PAPER_DOCUMENTS)

export const executeDuplicateRfa = createAction(EXECUTE_OPERATION)
export const executeDuplicateRfaSuccess = createAction(EXECUTE_OPERATION_SUCCESS)
export const executeDuplicateRfaError = createAction(EXECUTE_OPERATION_ERROR)

export const resetDuplicateRfa = createAction(RESET_PROCESS)

export const createInteractionDuplicateRfa = createAction(CREATE_INTERACTION)

export default handleActions(
  {
    [INIT_PROCESS]: produce((state, { payload }) => {
      const { isFromMarkers } = payload || {}
      if (typeof isFromMarkers === 'boolean') {
        state.isFromMarkers = isFromMarkers
      }
      state.activeStep = DuplicateRfaStep.CHECK_ICC
    }),

    [GET_MARKER_SUCCESS]: produce((state, { payload }) => {
      state.isNeedDuplicateRfa = payload
    }),
    [GET_MARKER_ERROR]: produce(state => {
      state.isNeedDuplicateRfa = false
    }),

    [CHANGE_STEP]: produce((state, { payload }) => {
      state.activeStep = payload
    }),

    [CHECK_ICC]: produce(state => {
      state.isLoadingCheckIcc = true
    }),
    [CHECK_ICC_SUCCESS]: produce((state, { payload }) => {
      state.checkedIcc = payload
      state.activeStep = DuplicateRfaStep.PERSONAL_DATA
      state.isLoadingCheckIcc = false
    }),
    [CHECK_ICC_ERROR]: produce((state, { payload }) => {
      state.checkedIcc = null
      state.attemptsCountCheckIcc = payload
      state.isLoadingCheckIcc = false
    }),
    [CHECK_ICC_FAILURE]: produce(state => {
      state.checkedIcc = null
      state.attemptsCountCheckIcc = 0
      state.isLoadingCheckIcc = false
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

    [EXECUTE_OPERATION]: produce(state => {
      state.isLoadingExecuteOperation = true
    }),
    [EXECUTE_OPERATION_SUCCESS]: produce(state => {
      state.status = OperationStatus.SUCCESSFUL
      state.isLoadingExecuteOperation = false
    }),
    [EXECUTE_OPERATION_ERROR]: produce((state, { payload }) => {
      state.status = OperationStatus.FAILURE
      state.isLoadingExecuteOperation = false
      state.errorExecuteOperation = payload
    }),

    [SUBMIT_PERSONAL_DATA]: produce((state, { payload }) => {
      state.personalData = payload
      state.activeStep = DuplicateRfaStep.APPROVE_PERSONAL_DATA
    }),

    [RESET_PROCESS]: produce(state => {
      state.status = OperationStatus.NONE
      state.activeStep = DuplicateRfaStep.NONE
      state.attemptsCountCheckIcc = 0
      state.checkedIcc = null
      state.isLoadingCheckIcc = false
      state.personalData = null
      state.isLoadingGetInitialPersonalData = false
      state.isLoadingExecuteOperation = false
      state.errorExecuteOperation = null
    })
  },
  initialState
)
