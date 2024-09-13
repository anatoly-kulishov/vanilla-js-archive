import { produce } from 'immer'
import { createAction, handleActions } from 'redux-actions'
import { CORRECTION_PROCESS_STEPS, CORRECTION_PROCESS_TYPES } from 'webseller/features/correctionData/helpers'
import { OperationStatus } from 'webseller/helpers'

export const INIT_CORRECTION_DATA = 'correctionData/INIT_CORRECTION_DATA'
export const INIT_CORRECTION_DATA_SUCCESS = 'correctionData/INIT_CORRECTION_DATA_SUCCESS'
export const INIT_CORRECTION_DATA_ERROR = 'correctionData/INIT_CORRECTION_DATA_ERROR'
export const INIT_ANONYMOUS_CORRECTION_DATA = 'correctionData/INIT_ANONYMOUS_CORRECTION_DATA'

export const SET_CORRECTION_DATA_STEP = 'correctionData/SET_CORRECTION_DATA_STEP'

export const SET_DOCUMENT_DATA = 'correctionData/SET_DOCUMENT_DATA'

export const REJECT_SMS_VERIFICATION = 'correctionData/REJECT_SMS_VERIFICATION'

export const GET_VERIFICATION_SMS_CODE = 'correctionData/GET_VERIFICATION_SMS_CODE'
export const GET_VERIFICATION_SMS_CODE_SUCCESS = 'correctionData/GET_VERIFICATION_SMS_CODE_SUCCESS'
export const GET_VERIFICATION_SMS_CODE_ERROR = 'correctionData/GET_VERIFICATION_SMS_CODE_ERROR'

export const CHECK_VERIFICATION_PEP_CODE = 'correctionData/CHECK_VERIFICATION_PEP_CODE'
export const CHECK_VERIFICATION_PEP_CODE_SUCCESS = 'correctionData/CHECK_VERIFICATION_PEP_CODE_SUCCESS'
export const CHECK_VERIFICATION_PEP_CODE_ERROR = 'correctionData/CHECK_VERIFICATION_PEP_CODE_ERROR'
export const STORE_REGISTRATION_ADDRESS = 'correctionData/STORE_REGISTRATION_ADDRESS'
export const STORE_DOCUMENT_TYPE = 'correctionData/STORE_DOCUMENT_TYPE'

export const GET_SMS_CODE = 'correctionData/GET_SMS_CODE'
export const CHECK_PEP_CODE = 'correctionData/CHECK_PEP_CODE'
export const GET_PAPER_DOCUMENTS = 'correctionData/GET_PAPER_DOCUMENTS'
export const SET_ONLY_PAPER_DOCUMENTS_SCENARIO = 'correctionData/SET_ONLY_PAPER_DOCUMENTS_SCENARIO'

export const EDIT_PERSONAL_DATA = 'correctionData/EDIT_PERSONAL_DATA'
export const EDIT_PERSONAL_DATA_PARTIALLY_SUCCESS = 'correctionData/EDIT_PERSONAL_DATA_PARTIALLY_SUCCESS'
export const EDIT_PERSONAL_DATA_SUCCESS = 'correctionData/EDIT_PERSONAL_DATA_SUCCESS'
export const EDIT_PERSONAL_DATA_ERROR = 'correctionData/EDIT_PERSONAL_DATA_ERROR'
export const APPROVE_PERSONAL_DATA = 'correctionData/APPROVE_PERSONAL_DATA'

export const ADD_SIGNED_DOCUMENTS_TO_REQUEST = 'correctionData/ADD_SIGNED_DOCUMENTS_TO_REQUEST'
export const ADD_SIGNED_DOCUMENTS_TO_REQUEST_ERROR = 'correctionData/ADD_SIGNED_DOCUMENTS_TO_REQUEST_ERROR'

export const CREATE_INTERACTION = 'correctionData/CREATE_INTERACTION'

export const RESET_CORRECTION_DATA = 'correctionData/RESET_CORRECTION_DATA'

const initialState = {
  isFromMarkers: false,

  operationStatus: OperationStatus.NONE,

  correctionProcessType: CORRECTION_PROCESS_TYPES.DEFAULT,
  correctionDataProcessStep: CORRECTION_PROCESS_STEPS.NONE,

  isGetVerificationSmsCodeLoading: false,
  isGetVerificationSmsCodeError: false,

  isCheckVerificationPepCodeLoading: false,
  isCheckVerificationPepCodeError: false,

  isLoadingInitCorrectionData: false,

  documentData: null,
  isOnlyPaperDocumentsScenario: false,
  registrationAddress: null,
  documentType: null,

  ticketNumber: null,
  serviceRequestId: null,

  isEditPersonalDataLoading: false,
  errorEditPersonalData: null
}

export const initCorrectionDataProcess = createAction(INIT_CORRECTION_DATA)
export const initCorrectionDataProcessSuccess = createAction(INIT_CORRECTION_DATA_SUCCESS)
export const initCorrectionDataProcessError = createAction(INIT_CORRECTION_DATA_ERROR)

export const initAnonymousCorrectionData = createAction(INIT_ANONYMOUS_CORRECTION_DATA)

export const setCorrectionDataProcessStep = createAction(SET_CORRECTION_DATA_STEP)

export const setDocumentData = createAction(SET_DOCUMENT_DATA)

export const rejectSmsVerification = createAction(REJECT_SMS_VERIFICATION)

export const getVerificationSmsCode = createAction(GET_VERIFICATION_SMS_CODE)
export const getVerificationSmsCodeSuccess = createAction(GET_VERIFICATION_SMS_CODE_SUCCESS)
export const getVerificationSmsCodeError = createAction(GET_VERIFICATION_SMS_CODE_ERROR)

export const checkVerificationPepCode = createAction(CHECK_VERIFICATION_PEP_CODE)
export const checkVerificationPepCodeSuccess = createAction(CHECK_VERIFICATION_PEP_CODE_SUCCESS)
export const checkVerificationPepCodeError = createAction(CHECK_VERIFICATION_PEP_CODE_ERROR)
export const storeRegistrationAddress = createAction(STORE_REGISTRATION_ADDRESS)
export const storeDocumentType = createAction(STORE_DOCUMENT_TYPE)

export const getSmsCode = createAction(GET_SMS_CODE)
export const checkPepCode = createAction(CHECK_PEP_CODE)
export const getPaperDocuments = createAction(GET_PAPER_DOCUMENTS)
export const setOnlyPaperDocumentsScenario = createAction(SET_ONLY_PAPER_DOCUMENTS_SCENARIO)

export const editPersonalData = createAction(EDIT_PERSONAL_DATA)
export const editPersonalDataPartiallySuccess = createAction(EDIT_PERSONAL_DATA_PARTIALLY_SUCCESS)
export const editPersonalDataSuccess = createAction(EDIT_PERSONAL_DATA_SUCCESS)
export const editPersonalDataError = createAction(EDIT_PERSONAL_DATA_ERROR)
export const approvePersonalData = createAction(APPROVE_PERSONAL_DATA)

export const addSignedDocumentsToRequest = createAction(ADD_SIGNED_DOCUMENTS_TO_REQUEST)
export const addSignedDocumentsToRequestError = createAction(ADD_SIGNED_DOCUMENTS_TO_REQUEST_ERROR)

export const createInteractionCorrectionData = createAction(CREATE_INTERACTION)

export const resetCorrectionDataProcess = createAction(RESET_CORRECTION_DATA)

export default handleActions(
  {
    [INIT_CORRECTION_DATA]: produce((state, { payload }) => {
      const { isFromMarkers } = payload || {}
      if (typeof isFromMarkers === 'boolean') {
        state.isFromMarkers = isFromMarkers
      }
      state.correctionProcessType = CORRECTION_PROCESS_TYPES.DEFAULT
      state.isLoadingInitCorrectionData = true
    }),
    [INIT_CORRECTION_DATA_SUCCESS]: produce((state, { payload }) => {
      state.isLoadingInitCorrectionData = false
      state.documentData = payload
      state.correctionDataProcessStep = CORRECTION_PROCESS_STEPS.DOCUMENT_DATA
    }),
    [INIT_CORRECTION_DATA_ERROR]: produce(state => {
      state.isLoadingInitCorrectionData = false
      state.correctionDataProcessStep = CORRECTION_PROCESS_STEPS.DOCUMENT_DATA
    }),

    [INIT_ANONYMOUS_CORRECTION_DATA]: produce(state => {
      state.correctionProcessType = CORRECTION_PROCESS_TYPES.ANONYMOUS
      state.correctionDataProcessStep = CORRECTION_PROCESS_STEPS.SMS_VERIFICATION
    }),

    [REJECT_SMS_VERIFICATION]: produce(state => {
      state.isOnlyPaperDocumentsScenario = true
      state.correctionDataProcessStep = CORRECTION_PROCESS_STEPS.DOCUMENT_DATA
    }),

    [GET_VERIFICATION_SMS_CODE]: produce(state => {
      state.isGetVerificationSmsCodeLoading = true
      state.isGetVerificationSmsCodeError = false
    }),
    [GET_VERIFICATION_SMS_CODE_SUCCESS]: produce(state => {
      state.isGetVerificationSmsCodeLoading = false
    }),
    [GET_VERIFICATION_SMS_CODE_ERROR]: produce(state => {
      state.isGetVerificationSmsCodeLoading = false
      state.isGetVerificationSmsCodeError = true
    }),

    [CHECK_VERIFICATION_PEP_CODE]: produce(state => {
      state.isCheckVerificationPepCodeLoading = true
      state.isCheckVerificationPepCodeError = false
    }),
    [CHECK_VERIFICATION_PEP_CODE_SUCCESS]: produce(state => {
      state.isCheckVerificationPepCodeLoading = false
    }),
    [CHECK_VERIFICATION_PEP_CODE_ERROR]: produce(state => {
      state.isCheckVerificationPepCodeLoading = false
      state.isCheckVerificationPepCodeError = true
    }),

    [SET_CORRECTION_DATA_STEP]: produce((state, { payload }) => {
      state.correctionDataProcessStep = payload
    }),

    [SET_DOCUMENT_DATA]: produce((state, { payload }) => {
      state.documentData = payload
      state.correctionDataProcessStep = CORRECTION_PROCESS_STEPS.APPROVE_DOCUMENT_DATA
    }),

    [STORE_REGISTRATION_ADDRESS]: produce((state, { payload }) => {
      state.registrationAddress = payload
    }),

    [STORE_DOCUMENT_TYPE]: produce((state, { payload }) => {
      state.documentType = payload
    }),

    [STORE_REGISTRATION_ADDRESS]: produce((state, { payload }) => {
      state.registrationAddress = payload
    }),

    [STORE_DOCUMENT_TYPE]: produce((state, { payload }) => {
      state.documentType = payload
    }),

    [EDIT_PERSONAL_DATA]: produce(state => {
      state.isEditPersonalDataLoading = true
    }),
    [EDIT_PERSONAL_DATA_PARTIALLY_SUCCESS]: produce((state, { payload }) => {
      state.isEditPersonalDataLoading = false
      state.operationStatus = OperationStatus.PARTIALLY_SUCCESSFUL
      state.ticketNumber = payload.ticketNumber
      state.serviceRequestId = payload.serviceRequestId
    }),
    [EDIT_PERSONAL_DATA_SUCCESS]: produce(state => {
      state.isEditPersonalDataLoading = false
      state.operationStatus = OperationStatus.SUCCESSFUL
    }),
    [EDIT_PERSONAL_DATA_ERROR]: produce((state, { payload }) => {
      state.isEditPersonalDataLoading = false
      state.operationStatus = OperationStatus.FAILURE
      state.errorEditPersonalData = payload
    }),
    [APPROVE_PERSONAL_DATA]: produce(state => {
      state.correctionDataProcessStep = CORRECTION_PROCESS_STEPS.SIGNING
    }),

    [SET_ONLY_PAPER_DOCUMENTS_SCENARIO]: produce(state => {
      state.isOnlyPaperDocumentsScenario = true
    }),

    [ADD_SIGNED_DOCUMENTS_TO_REQUEST]: produce(state => {
      state.isEditPersonalDataLoading = true
    }),

    [ADD_SIGNED_DOCUMENTS_TO_REQUEST_ERROR]: produce(state => {
      state.isEditPersonalDataLoading = false
      state.operationStatus = OperationStatus.PARTIALLY_SUCCESSFUL
    }),

    [RESET_CORRECTION_DATA]: () => initialState
  },
  initialState
)
