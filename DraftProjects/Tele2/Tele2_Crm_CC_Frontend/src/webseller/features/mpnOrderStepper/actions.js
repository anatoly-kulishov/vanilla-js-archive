import { createAction } from 'redux-actions'

export const INIT_MNP_ORDER_PROCESS = 'mpnOrderStepper/INIT_REPLACE_SIM_PROCESS'
export const SET_MNP_ORDER_PROCESS_STEP = 'mpnOrderStepper/SET_REPLACING_PROCESS_STEP'
export const RESET_REPLACE_MNP_ORDER_PROCESS = 'mpnOrderStepper/RESET_REPLACE_MNP_PROCESS'

export const GET_INITIAL_PERSONAL_DATA = 'mpnOrderStepper/GET_INITIAL_PERSONAL_DATA'
export const GET_INITIAL_PERSONAL_DATA_SUCCESS = 'mpnOrderStepper/GET_INITIAL_PERSONAL_DATA_SUCCESS'
export const GET_INITIAL_PERSONAL_DATA_ERROR = 'mpnOrderStepper/GET_INITIAL_PERSONAL_DATA_ERROR'

export const GET_MNP_AVAILABLE_STATUS = 'mpnOrderStepper/GET_MNP_AVAILABLE_STATUS'
export const GET_MNP_AVAILABLE_STATUS_SUCCESS = 'mpnOrderStepper/GET_MNP_AVAILABLE_STATUS_SUCCESS'
export const GET_MNP_AVAILABLE_STATUS_ERROR = 'mpnOrderStepper/GET_MNP_AVAILABLE_STATUS_ERROR'

export const CHECK_SIM_MNP = 'mpnOrderStepper/CHECK_SIM_MNP'
export const CHECK_SIM_MNP_SUCCESS = 'mpnOrderStepper/CHECK_SIM_MNP_SUCCESS'
export const CHECK_SIM_MNP_ERROR = 'mpnOrderStepper/CHECK_SIM_MNP_ERROR'

export const GET_SMS_CODE = 'mpnOrderStepper/GET_SMS_CODE'
export const CHECK_PEP_CODE = 'mpnOrderStepper/CHECK_PEP_CODE'
export const GET_PAPER_DOCUMENTS = 'mpnOrderStepper/GET_PAPER_DOCUMENTS'
export const CREATE_INTERACTION = 'mpnOrderStepper/CREATE_INTERACTION'

export const SET_DOCUMENT_DATA = 'mpnOrderStepper/SET_DOCUMENT_DATA'
export const SUBMIT_PERSONAL_DATA = 'mpnOrderStepper/SUBMIT_PERSONAL_DATA'

export const CREATE_MNP_REQUEST = 'mpnOrderStepper/CREATE_MNP_REQUEST'
export const CREATE_MNP_REQUEST_SUCCESS = 'mpnOrderStepper/CREATE_MNP_REQUEST_SUCCESS'
export const CREATE_MNP_REQUEST_ERROR = 'mpnOrderStepper/CREATE_MNP_REQUEST_ERROR'

export const getMnpAvailableStatus = createAction(GET_MNP_AVAILABLE_STATUS)
export const getMnpAvailableStatusSuccess = createAction(GET_MNP_AVAILABLE_STATUS_SUCCESS)
export const getMnpAvailableStatusError = createAction(GET_MNP_AVAILABLE_STATUS_ERROR)

export const initMnpOrderProcess = createAction(INIT_MNP_ORDER_PROCESS)
export const setMnpOrderProcessStep = createAction(SET_MNP_ORDER_PROCESS_STEP)

export const getSmsCode = createAction(GET_SMS_CODE)
export const checkPepCode = createAction(CHECK_PEP_CODE)
export const getPaperDocuments = createAction(GET_PAPER_DOCUMENTS)
export const createInteractionMnpOrder = createAction(CREATE_INTERACTION)

export const checkSimMnp = createAction(CHECK_SIM_MNP)
export const checkSimMnpSuccess = createAction(CHECK_SIM_MNP_SUCCESS)
export const checkSimMnpError = createAction(CHECK_SIM_MNP_ERROR)

export const getInitialPersonalDataMnp = createAction(GET_INITIAL_PERSONAL_DATA)
export const getInitialPersonalDataMnpSuccess = createAction(GET_INITIAL_PERSONAL_DATA_SUCCESS)
export const getInitialPersonalDataMnpError = createAction(GET_INITIAL_PERSONAL_DATA_ERROR)

export const setDocumentData = createAction(SET_DOCUMENT_DATA)
export const resetMnpOrderProcess = createAction(RESET_REPLACE_MNP_ORDER_PROCESS)

export const submitPersonalDataDuplicateRfa = createAction(SUBMIT_PERSONAL_DATA)

export const createMnpRequest = createAction(CREATE_MNP_REQUEST)
export const createMnpRequestSuccess = createAction(CREATE_MNP_REQUEST_SUCCESS)
export const createMnpRequestError = createAction(CREATE_MNP_REQUEST_ERROR)
