import { produce } from 'immer'
import { createAction, handleActions } from 'redux-actions'
import { SigningType } from './helpers'

const CHANGE_SIGNING_TYPE = 'signing/CHANGE_SIGNING_TYPE'

export const CHECK_IS_CLIENT_HAS_PEP = 'signing/CHECK_IS_CLIENT_HAS_PEP'
const CHECK_IS_CLIENT_HAS_PEP_SUCCESS = 'signing/CHECK_IS_CLIENT_HAS_PEP_SUCCESS'
const CHECK_IS_CLIENT_HAS_PEP_ERROR = 'signing/CHECK_IS_CLIENT_HAS_PEP_ERROR'

const GET_PEP_NUMBERS = 'signing/GET_PEP_NUMBERS'
const GET_PEP_NUMBERS_SUCCESS = 'signing/GET_PEP_NUMBERS_SUCCESS'
const GET_PEP_NUMBERS_ERROR = 'signing/GET_PEP_NUMBERS_ERROR'

export const CHANGE_ACTIVE_PEP_NUMBER = 'signing/CHANGE_ACTIVE_PEP_NUMBER'

export const GET_SMS_CODE = 'signing/GET_SMS_CODE'
const GET_SMS_CODE_SUCCESS = 'signing/GET_SMS_CODE_SUCCESS'
const GET_SMS_CODE_ERROR = 'signing/GET_SMS_CODE_ERROR'

const GET_DOCUMENT_CODE = 'signing/GET_DOCUMENT_CODE'
const GET_DOCUMENT_CODE_SUCCESS = 'signing/GET_DOCUMENT_CODE_SUCCESS'
const GET_DOCUMENT_CODE_ERROR = 'signing/GET_DOCUMENT_CODE_ERROR'

export const CHECK_PEP_CODE = 'signing/CHECK_PEP_CODE'
const CHECK_PEP_CODE_SUCCESS = 'signing/CHECK_PEP_CODE_SUCCESS'
const CHECK_PEP_CODE_ERROR = 'signing/CHECK_PEP_CODE_ERROR'

const GET_PAPER_DOCUMENTS = 'signing/GET_PAPER_DOCUMENTS'
const GET_PAPER_DOCUMENTS_SUCCESS = 'signing/GET_PAPER_DOCUMENTS_SUCCESS'
const GET_PAPER_DOCUMENTS_ERROR = 'signing/GET_PAPER_DOCUMENTS_ERROR'

export const CANCEL_GET_DOCUMENT_CODE = 'signing/CANCEL_GET_DOCUMENT_CODE'
export const CANCEL_GET_PAPER_DOCUMENTS = 'signing/CANCEL_GET_PAPER_DOCUMENTS'

const ADD_SIGNED_DOCUMENT = 'signing/ADD_SIGNED_DOCUMENT'
const REMOVE_SIGNED_DOCUMENT = 'signing/REMOVE_SIGNED_DOCUMENT'

const CHANGE_COMMENTARY = 'signing/CHANGE_COMMENTARY'

const SUBMIT_SIGNING = 'signing/SUBMIT_SIGNING'
const SKIP_SIGNING = 'signing/SKIP_SIGNING'
const RESET_SIGNING = 'signing/RESET_SIGNING'

const initialState = {
  signingType: SigningType.NONE,

  isSuccessfulSigning: false,
  isSigningSkipped: false,

  subscriberData: null,
  isClientHasPep: false,
  isLoadingCheckIsClientHasPep: false,
  isErrorCheckIsClientHasPep: false,

  pepNumbers: null,
  isLoadingGetPepNumbers: false,
  isErrorGetPepNumbers: false,

  activePepNumber: null,

  isLoadingGetSmsCode: false,
  isErrorGetSmsCode: false,

  isLoadingGetDocumentCode: false,
  isErrorGetDocumentCode: false,

  pepCode: null,
  isLoadingCheckPepCode: false,
  isErrorCheckPepCode: false,

  paperDocuments: null,
  isLoadingGetPaperDocuments: false,
  isErrorGetPaperDocuments: false,

  commentary: null,

  signedDocuments: []
}

export const changeSigningType = createAction(CHANGE_SIGNING_TYPE)

export const checkIsClientHasPep = createAction(CHECK_IS_CLIENT_HAS_PEP)
export const checkIsClientHasPepSuccess = createAction(CHECK_IS_CLIENT_HAS_PEP_SUCCESS)
export const checkIsClientHasPepError = createAction(CHECK_IS_CLIENT_HAS_PEP_ERROR)

export const getPepNumbers = createAction(GET_PEP_NUMBERS)
export const getPepNumbersSuccess = createAction(GET_PEP_NUMBERS_SUCCESS)
export const getPepNumbersError = createAction(GET_PEP_NUMBERS_ERROR)

export const changeActivePepNumber = createAction(CHANGE_ACTIVE_PEP_NUMBER)

export const getSmsCode = createAction(GET_SMS_CODE)
export const getSmsCodeSuccess = createAction(GET_SMS_CODE_SUCCESS)
export const getSmsCodeError = createAction(GET_SMS_CODE_ERROR)

export const getDocumentCode = createAction(GET_DOCUMENT_CODE)
export const getDocumentCodeSuccess = createAction(GET_DOCUMENT_CODE_SUCCESS)
export const getDocumentCodeError = createAction(GET_DOCUMENT_CODE_ERROR)

export const checkPepCode = createAction(CHECK_PEP_CODE)
export const checkPepCodeSuccess = createAction(CHECK_PEP_CODE_SUCCESS)
export const checkPepCodeError = createAction(CHECK_PEP_CODE_ERROR)

export const getPaperDocuments = createAction(GET_PAPER_DOCUMENTS)
export const getPaperDocumentsSuccess = createAction(GET_PAPER_DOCUMENTS_SUCCESS)
export const getPaperDocumentsError = createAction(GET_PAPER_DOCUMENTS_ERROR)

export const cancelGetDocumentCode = createAction(CANCEL_GET_DOCUMENT_CODE)
export const cancelGetPaperDocuments = createAction(CANCEL_GET_PAPER_DOCUMENTS)

export const addSignedDocument = createAction(ADD_SIGNED_DOCUMENT)
export const removeSignedDocument = createAction(REMOVE_SIGNED_DOCUMENT)

export const changeCommentary = createAction(CHANGE_COMMENTARY)

export const submitSigning = createAction(SUBMIT_SIGNING)
export const skipSigning = createAction(SKIP_SIGNING)
export const resetSigning = createAction(RESET_SIGNING)

export default handleActions(
  {
    [CHANGE_SIGNING_TYPE]: produce((state, { payload }) => {
      state.signingType = payload
    }),

    [CHECK_IS_CLIENT_HAS_PEP]: produce(state => {
      state.subscriberData = null
      state.isLoadingCheckIsClientHasPep = true
      state.isErrorCheckIsClientHasPep = false
    }),
    [CHECK_IS_CLIENT_HAS_PEP_SUCCESS]: produce((state, { payload }) => {
      state.isLoadingCheckIsClientHasPep = false
      state.isClientHasPep = payload?.isClientHasPep
      state.subscriberData = payload?.subscriberData
    }),
    [CHECK_IS_CLIENT_HAS_PEP_ERROR]: produce(state => {
      state.isLoadingCheckIsClientHasPep = false
      state.isErrorCheckIsClientHasPep = true
    }),

    [GET_PEP_NUMBERS]: produce(state => {
      state.isLoadingGetPepNumbers = true
      state.isErrorGetPepNumbers = false
    }),
    [GET_PEP_NUMBERS_SUCCESS]: produce((state, { payload }) => {
      state.isLoadingGetPepNumbers = false
      const hasMsisdns = payload?.length && payload.length > 0
      if (hasMsisdns) {
        state.pepNumbers = payload
        state.activePepNumber = payload[0].msisdn
      }
    }),
    [GET_PEP_NUMBERS_ERROR]: produce(state => {
      state.isLoadingGetPepNumbers = false
      state.isErrorGetPepNumbers = true
      state.pepNumbers = null
    }),

    [CHANGE_ACTIVE_PEP_NUMBER]: produce((state, { payload }) => {
      state.activePepNumber = payload
    }),

    [GET_SMS_CODE]: produce(state => {
      state.isLoadingGetSmsCode = true
      state.isErrorGetSmsCode = false
    }),
    [GET_SMS_CODE_SUCCESS]: produce(state => {
      state.isLoadingGetSmsCode = false
    }),
    [GET_SMS_CODE_ERROR]: produce(state => {
      state.isLoadingGetSmsCode = false
      state.isErrorGetSmsCode = true
    }),

    [GET_DOCUMENT_CODE]: produce(state => {
      state.isLoadingGetDocumentCode = true
      state.isErrorGetDocumentCode = false
    }),
    [GET_DOCUMENT_CODE_SUCCESS]: produce(state => {
      state.isLoadingGetDocumentCode = false
    }),
    [GET_DOCUMENT_CODE_ERROR]: produce(state => {
      state.isLoadingGetDocumentCode = false
      state.isErrorGetDocumentCode = true
    }),

    [CHECK_PEP_CODE]: produce(state => {
      state.isLoadingCheckPepCode = true
      state.isErrorCheckPepCode = false
    }),
    [CHECK_PEP_CODE_SUCCESS]: produce((state, { payload }) => {
      state.isLoadingCheckPepCode = true
      state.isSuccessfulSigning = true
      state.pepCode = payload
    }),
    [CHECK_PEP_CODE_ERROR]: produce(state => {
      state.isLoadingCheckPepCode = false
      state.isErrorCheckPepCode = true
    }),

    [GET_PAPER_DOCUMENTS]: produce(state => {
      state.isLoadingGetPaperDocuments = true
      state.isErrorGetPaperDocuments = false
    }),
    [GET_PAPER_DOCUMENTS_SUCCESS]: produce((state, { payload }) => {
      state.isLoadingGetPaperDocuments = false
      state.paperDocuments = payload
    }),
    [GET_PAPER_DOCUMENTS_ERROR]: produce(state => {
      state.isLoadingGetPaperDocuments = false
      state.isErrorGetPaperDocuments = true
    }),

    [ADD_SIGNED_DOCUMENT]: produce((state, { payload }) => {
      state.signedDocuments.push(payload)
    }),
    [REMOVE_SIGNED_DOCUMENT]: produce((state, { payload }) => {
      state.signedDocuments = state.signedDocuments.filter(({ uid }) => uid !== payload)
    }),

    [CHANGE_COMMENTARY]: produce((state, { payload }) => {
      state.commentary = payload
    }),

    [SUBMIT_SIGNING]: produce(state => {
      state.isSuccessfulSigning = true
    }),
    [SKIP_SIGNING]: produce(state => {
      state.isSigningSkipped = true
      state.isErrorGetDocumentCode = false
      state.isErrorGetPaperDocuments = false
    }),
    [RESET_SIGNING]: () => initialState
  },
  initialState
)
