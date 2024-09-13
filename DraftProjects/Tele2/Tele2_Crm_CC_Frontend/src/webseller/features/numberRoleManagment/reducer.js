import { produce } from 'immer'
import { createAction, handleActions } from 'redux-actions'

import { NumberRoleManagmentStep } from './helpers'
import { OperationStatus } from 'webseller/helpers'

const CHANGE_STEP = 'numberRoleManagment/CHANGE_STEP'

const INIT_PROCESS = 'numberRoleManagment/INIT_PROCESS'
const INIT_PROCESS_SUCCESS = 'numberRoleManagment/INIT_PROCESS_SUCCESS'
const INIT_PROCESS_ERROR = 'numberRoleManagment/INIT_PROCESS_ERROR'

const SUBMIT_NEW_ROLE = 'numberRoleManagment/SUBMIT_NEW_ROLE'

const GET_PAPER_DOCUMENTS = 'numberRoleManagment/GET_PAPER_DOCUMENTS'

const EXECUTE_OPERATION = 'numberRoleManagment/EXECUTE_OPERATION'
const EXECUTE_OPERATION_SUCCESS = 'numberRoleManagment/EXECUTE_OPERATION_SUCCESS'
const EXECUTE_OPERATION_ERROR = 'numberRoleManagment/EXECUTE_OPERATION_ERROR'

const RESET_PROCESS = 'numberRoleManagment/RESET_PROCESS'

const CREATE_INTERACTION = 'numberRoleManagment/CREATE_INTERACTION'

const initialNumberRole = {
  roleId: null,
  roleName: null,
  clientEmail: null
}

const initialState = {
  status: OperationStatus.NONE,

  activeStep: NumberRoleManagmentStep.NONE,

  isLoadingInitProccess: false,
  initialRoleId: null,
  numberRole: initialNumberRole,
  numberRoles: null,

  isLoadingExecuteOperation: false,
  errorExecuteOperation: null
}

export const changeStepNumberRoleManagment = createAction(CHANGE_STEP)

export const initNumberRoleManagment = createAction(INIT_PROCESS)
export const initNumberRoleManagmentSuccess = createAction(INIT_PROCESS_SUCCESS)
export const initNumberRoleManagmentError = createAction(INIT_PROCESS_ERROR)

export const submitNewRoleNumberRoleManagment = createAction(SUBMIT_NEW_ROLE)

export const getPaperDocumentNumberRoleManagment = createAction(GET_PAPER_DOCUMENTS)

export const executeNumberRoleManagment = createAction(EXECUTE_OPERATION)
export const executeNumberRoleManagmentSuccess = createAction(EXECUTE_OPERATION_SUCCESS)
export const executeNumberRoleManagmentError = createAction(EXECUTE_OPERATION_ERROR)

export const resetNumberRoleManagment = createAction(RESET_PROCESS)

export const createInteractionNumberRoleManagment = createAction(CREATE_INTERACTION)

export default handleActions(
  {
    [CHANGE_STEP]: produce((state, { payload }) => {
      state.activeStep = payload
    }),

    [INIT_PROCESS]: produce(state => {
      state.isLoadingInitProccess = true
    }),
    [INIT_PROCESS_SUCCESS]: produce((state, { payload }) => {
      const { numberRole, numberRoles } = payload || {}

      state.initialRoleId = numberRole.roleId
      state.numberRole = numberRole
      state.numberRoles = numberRoles
      state.isLoadingInitProccess = false
      state.activeStep = NumberRoleManagmentStep.ACCESS_LEVEL
    }),
    [INIT_PROCESS_ERROR]: produce(state => {
      state.isLoadingInitProccess = false
    }),

    [SUBMIT_NEW_ROLE]: produce((state, { payload }) => {
      state.numberRole = payload
      state.activeStep = NumberRoleManagmentStep.SIGNING
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

    [RESET_PROCESS]: produce(() => initialState)
  },
  initialState
)
