import { produce } from 'immer'
import { createAction, handleActions } from 'redux-actions'

import { BeneficiaryParam, BalanceTransferParam, OperationParamsFormFields, SignatoryParam, TerminationClientStep, TerminationClientType } from './helpers'
import { OperationStatus } from 'webseller/helpers'

const CHANGE_STEP = 'terminationClient/CHANGE_STEP'
const CHANGE_TYPE = 'terminationClient/CHANGE_TYPE'

const INIT_PROCESS = 'terminationClient/INIT_PROCESS'
const INIT_PROCESS_SUCCESS = 'terminationClient/INIT_PROCESS_SUCCESS'
const INIT_PROCESS_ERROR = 'terminationClient/INIT_PROCESS_ERROR'

const SUBMIT_CLIENT_INFORMED = 'terminationClient/SUBMIT_CLIENT_INFORMED'

const SUBMIT_OPERATION_PARAMS = 'terminationClient/SUBMIT_OPERATION_PARAMS'

const GET_PAPER_DOCUMENTS = 'terminationClient/GET_PAPER_DOCUMENTS'

const VERIFY_SMS_CODE = 'terminationClient/VERIFY_SMS_CODE'
const VERIFY_SMS_CODE_SUCCESS = 'terminationClient/VERIFY_SMS_CODE_SUCCESS'

const EXECUTE_OPERATION = 'terminationClient/EXECUTE_OPERATION'
const EXECUTE_OPERATION_PARTIALLY_SUCCESS = 'terminationClient/EXECUTE_OPERATION_PARTIALLY_SUCCESS'
const EXECUTE_OPERATION_SUCCESS = 'terminationClient/EXECUTE_OPERATION_SUCCESS'
const EXECUTE_OPERATION_ERROR = 'terminationClient/EXECUTE_OPERATION_ERROR'

const ADD_SIGNED_DOCUMENTS = 'terminationClient/ADD_SIGNED_DOCUMENTS'
const ADD_SIGNED_DOCUMENTS_ERROR = 'terminationClient/ADD_SIGNED_DOCUMENTS_ERROR'

const CANCEL_TERMINATION_CLIENT_ONLINE = 'terminationClient/CANCEL_TERMINATION_CLIENT_ONLINE'

const RESET_PROCESS = 'terminationClient/RESET_PROCESS'

const initialOperationParams = {
  [OperationParamsFormFields.SIGNATORY]: SignatoryParam.CLIENT,
  [OperationParamsFormFields.BENEFICIARY]: BeneficiaryParam.SELF_INTEREST,
  [OperationParamsFormFields.BALANCE_TRANSFER]: BalanceTransferParam.NUMBER
}

const initialState = {
  status: OperationStatus.NONE,
  type: TerminationClientType.NONE,

  activeStep: TerminationClientStep.NONE,

  isLoadingInitProcess: false,

  personalData: null,

  operationParams: initialOperationParams,

  isLoadingExecuteOperation: false,
  errorExecuteOperation: null,

  ticketNumber: null,
  serviceRequestId: null
}

export const changeStepTerminationClient = createAction(CHANGE_STEP)
export const changeTypeTerminationClient = createAction(CHANGE_TYPE)

export const initTerminationClient = createAction(INIT_PROCESS)
export const initTerminationClientSuccess = createAction(INIT_PROCESS_SUCCESS)
export const initTerminationClientError = createAction(INIT_PROCESS_ERROR)

export const submitClientInformedTerminationClient = createAction(SUBMIT_CLIENT_INFORMED)

export const submitOperationParamsTerminationClient = createAction(SUBMIT_OPERATION_PARAMS)

export const getPaperDocumentsTerminationClient = createAction(GET_PAPER_DOCUMENTS)

export const verifySmsCodeTerminationClient = createAction(VERIFY_SMS_CODE)
export const verifySmsCodeTerminationClientSuccess = createAction(VERIFY_SMS_CODE_SUCCESS)

export const executeTerminationClient = createAction(EXECUTE_OPERATION)
export const executeTerminationClientPartiallySuccess = createAction(EXECUTE_OPERATION_PARTIALLY_SUCCESS)
export const executeTerminationClientSuccess = createAction(EXECUTE_OPERATION_SUCCESS)
export const executeTerminationClientError = createAction(EXECUTE_OPERATION_ERROR)

export const addSignedDocumentsTerminationClient = createAction(ADD_SIGNED_DOCUMENTS)
export const addSignedDocumentsTerminationClientError = createAction(ADD_SIGNED_DOCUMENTS_ERROR)

export const cancelTerminationClient = createAction(CANCEL_TERMINATION_CLIENT_ONLINE)

export const resetTerminationClient = createAction(RESET_PROCESS)

export default handleActions(
  {
    [CHANGE_STEP]: produce((state, { payload }) => {
      state.activeStep = payload
    }),
    [CHANGE_TYPE]: produce((state, { payload }) => {
      state.type = payload
    }),

    [INIT_PROCESS]: produce(state => {
      state.isLoadingInitProcess = true
    }),
    [INIT_PROCESS_SUCCESS]: produce((state, { payload }) => {
      state.type = payload.isOnline ? TerminationClientType.ONLINE : TerminationClientType.OFFLINE
      state.personalData = payload.personalData
      state.activeStep = TerminationClientStep.INFORM_CLIENT
      state.isLoadingInitProcess = false
    }),
    [INIT_PROCESS_ERROR]: produce(state => {
      state.isLoadingInitProcess = false
    }),

    [SUBMIT_CLIENT_INFORMED]: produce(state => {
      state.activeStep = TerminationClientStep.OPERATION_PARAMS
    }),

    [SUBMIT_OPERATION_PARAMS]: produce((state, { payload }) => {
      state.operationParams = payload
      state.activeStep = TerminationClientStep.SIGNING
    }),

    [VERIFY_SMS_CODE_SUCCESS]: produce((state) => {
      state.activeStep = TerminationClientStep.RESULT
    }),

    [EXECUTE_OPERATION]: produce((state) => {
      state.isLoadingExecuteOperation = true
    }),
    [EXECUTE_OPERATION_PARTIALLY_SUCCESS]: produce((state, { payload }) => {
      state.isLoadingExecuteOperation = false
      state.status = OperationStatus.PARTIALLY_SUCCESSFUL
      state.ticketNumber = payload.ticketNumber
      state.serviceRequestId = payload.serviceRequestId
    }),
    [EXECUTE_OPERATION_SUCCESS]: produce((state, { payload }) => {
      state.isLoadingExecuteOperation = false
      state.status = OperationStatus.SUCCESSFUL
      state.type = payload?.isOnline ? TerminationClientType.ONLINE : TerminationClientType.OFFLINE
    }),
    [EXECUTE_OPERATION_ERROR]: produce((state, { payload }) => {
      state.isLoadingExecuteOperation = false
      state.status = OperationStatus.FAILURE
      state.errorExecuteOperation = payload
    }),

    [ADD_SIGNED_DOCUMENTS]: produce((state) => {
      state.isLoadingExecuteOperation = true
    }),
    [ADD_SIGNED_DOCUMENTS_ERROR]: produce((state) => {
      state.isLoadingExecuteOperation = false
      state.status = OperationStatus.PARTIALLY_SUCCESSFUL
    }),

    [CANCEL_TERMINATION_CLIENT_ONLINE]: produce((state) => {
      state.type = TerminationClientType.OFFLINE
      state.activeStep = TerminationClientStep.RESULT
    }),

    [RESET_PROCESS]: () => initialState
  },
  initialState
)
