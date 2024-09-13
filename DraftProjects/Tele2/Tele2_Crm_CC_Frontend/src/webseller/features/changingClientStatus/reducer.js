import { produce } from 'immer'
import { handleActions } from 'redux-actions'

import * as actionTypes from './actions'
import { ChangingClientStatusStep } from './helpers'
import { OperationStatus } from 'webseller/helpers'

const initialState = {
  status: OperationStatus.NONE,

  activeStep: ChangingClientStatusStep.NONE,

  isLoadingInitProcess: false,
  personalData: null,

  newStatus: null,
  subscriberCscId: null,

  isLoadingExecuteOperation: false,
  errorExecuteOperation: null
}

export default handleActions(
  {
    [actionTypes.CHANGE_STEP]: produce((state, { payload }) => {
      state.activeStep = payload
    }),

    [actionTypes.INIT_PROCESS]: produce(state => {
      state.isLoadingInitProcess = true
    }),
    [actionTypes.INIT_PROCESS_SUCCESS]: produce((state, { payload }) => {
      state.isLoadingInitProcess = false
      state.personalData = payload
      state.activeStep = ChangingClientStatusStep.CHANGING_PARAMS
    }),
    [actionTypes.INIT_PROCESS_ERROR]: produce(state => {
      state.isLoadingInitProcess = false
    }),

    [actionTypes.SUBMIT_CHANGING_CLIENT_STATUS_PARAMS]: produce((state, { payload }) => {
      state.newStatus = payload.newStatus
      state.subscriberCscId = payload.subscriberCscId
      state.activeStep = ChangingClientStatusStep.SIGNING
    }),

    [actionTypes.EXECUTE_OPERATION]: produce(state => {
      state.isLoadingExecuteOperation = true
    }),
    [actionTypes.EXECUTE_OPERATION_SUCCESS]: produce(state => {
      state.status = OperationStatus.SUCCESSFUL
      state.isLoadingExecuteOperation = false
    }),
    [actionTypes.EXECUTE_OPERATION_ERROR]: produce((state, { payload }) => {
      state.status = OperationStatus.FAILURE
      state.errorExecuteOperation = payload
      state.isLoadingExecuteOperation = false
    }),

    [actionTypes.RESET_PROCESS]: () => initialState
  },
  initialState
)
