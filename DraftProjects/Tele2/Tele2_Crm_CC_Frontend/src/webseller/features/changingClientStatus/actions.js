import { createAction } from 'redux-actions'

export const INIT_PROCESS = 'changingClientStatus/INIT_PROCESS'
export const INIT_PROCESS_SUCCESS = 'changingClientStatus/INIT_PROCESS_SUCCESS'
export const INIT_PROCESS_ERROR = 'changingClientStatus/INIT_PROCESS_ERROR'

export const CHANGE_STEP = 'changingClientStatus/CHANGE_STEP'

export const SUBMIT_CHANGING_CLIENT_STATUS_PARAMS = 'changingClientStatus/SUBMIT_CHANGING_CLIENT_STATUS_PARAMS'

export const GET_SMS_CODE = 'changingClientStatus/GET_SMS_CODE'
export const CHECK_PEP_CODE = 'changingClientStatus/CHECK_PEP_CODE'
export const GET_PAPER_DOCUMENTS = 'changingClientStatus/GET_PAPER_DOCUMENTS'

export const EXECUTE_OPERATION = 'changingClientStatus/EXECUTE_OPERATION'
export const EXECUTE_OPERATION_SUCCESS = 'changingClientStatus/EXECUTE_OPERATION_SUCCESS'
export const EXECUTE_OPERATION_ERROR = 'changingClientStatus/EXECUTE_OPERATION_ERROR'

export const CREATE_INTERACTION = 'changingClientStatus/CREATE_INTERACTION'

export const RESET_PROCESS = 'changingClientStatus/RESET_PROCESS'

export const initChangingClientStatus = createAction(INIT_PROCESS)
export const initChangingClientStatusSuccess = createAction(INIT_PROCESS_SUCCESS)
export const initChangingClientStatusError = createAction(INIT_PROCESS_ERROR)

export const changeStepChangingClientStatus = createAction(CHANGE_STEP)

export const submitChangingClientStatusParams = createAction(SUBMIT_CHANGING_CLIENT_STATUS_PARAMS)

export const getSmsCodeChangingClientStatus = createAction(GET_SMS_CODE)
export const checkPepCodeChangingClientStatus = createAction(CHECK_PEP_CODE)
export const getPaperDocumentsChangingClientStatus = createAction(GET_PAPER_DOCUMENTS)

export const executeOperationChangingClientStatus = createAction(EXECUTE_OPERATION)
export const executeOperationChangingClientStatusSuccess = createAction(EXECUTE_OPERATION_SUCCESS)
export const executeOperationChangingClientStatusError = createAction(EXECUTE_OPERATION_ERROR)

export const createIntercationChangingClientStatus = createAction(CREATE_INTERACTION)

export const resetChangingClientStatus = createAction(RESET_PROCESS)
