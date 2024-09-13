import { createAction, handleActions } from 'redux-actions'

export const SMEV_LOADING = 'checkSmev/SMEV_LOADING'

export const GET_SMEV_DATA = 'checkSmev/GET_SMEV_DATA'

export const CHECK_SMEV_SUCCESS = 'checkSmev/CHECK_SMEV_SUCCESS'
export const CHECK_SMEV_PARTIAL_SUCCESS = 'checkSmev/CHECK_SMEV_PARTIAL_SUCCESS'
export const CHECK_SMEV_ERROR = 'checkSmev/CHECK_SMEV_ERROR'

export const UPLOAD_DOCUMENT = 'checkSmev/UPLOAD_DOCUMENT'
export const UPLOAD_DOCUMENT_SUCCESS = 'checkSmev/UPLOAD_DOCUMENT_SUCCESS'
export const UPLOAD_DOCUMENT_ERROR = 'checkSmev/UPLOAD_DOCUMENT_ERROR'

export const FINISH_CHECK_SMEV_POLLING = 'checkSmev/FINISH_CHECK_SMEV_POLLING'

export const SEND_DOCUMENT = 'checkSmev/SEND_DOCUMENT'

export const RESET_CHECK_SMEV = 'checkSmev/RESET_CHECK_SMEV'

const initalState = {
  checkId: null,
  encryption: null,
  smevLoading: false,
  smevDataError: false,
  checkSmevSuccess: false,
  checkSmevPartialSuccess: false,
  checkSmevError: false,
  uploadingDocument: false,
  uploadDocumentError: false
}

export const getSmevData = createAction(GET_SMEV_DATA)

export const checkSmevSuccess = createAction(CHECK_SMEV_SUCCESS)
export const checkSmevPartialSuccess = createAction(CHECK_SMEV_PARTIAL_SUCCESS)
export const checkSmevError = createAction(CHECK_SMEV_ERROR)

export const uploadDocument = createAction(UPLOAD_DOCUMENT)
export const uploadDocumentSuccess = createAction(UPLOAD_DOCUMENT_SUCCESS)
export const uploadDocumentError = createAction(UPLOAD_DOCUMENT_ERROR)

export const finishCheckSmevPolling = createAction(FINISH_CHECK_SMEV_POLLING)

export const sendDocumentSmev = createAction(SEND_DOCUMENT)

export const resetCheckSmev = createAction(RESET_CHECK_SMEV)

export default handleActions({
  [GET_SMEV_DATA]: (state) => ({
    ...state,
    smevLoading: true
  }),

  [CHECK_SMEV_SUCCESS]: (state) => ({
    ...state,
    smevLoading: false,
    checkSmevSuccess: true
  }),
  [CHECK_SMEV_PARTIAL_SUCCESS]: (state) => ({
    ...state,
    smevLoading: false,
    checkSmevPartialSuccess: true
  }),
  [CHECK_SMEV_ERROR]: (state) => ({
    ...state,
    smevLoading: false,
    checkSmevError: true
  }),

  [FINISH_CHECK_SMEV_POLLING]: (state, { payload }) => ({
    ...state,
    checkId: payload
  }),

  [UPLOAD_DOCUMENT]: (state) => ({
    ...state,
    uploadingDocument: true
  }),
  [UPLOAD_DOCUMENT_SUCCESS]: (state, { payload }) => ({
    ...state,
    encryption: payload
  }),
  [UPLOAD_DOCUMENT_ERROR]: (state) => ({
    ...state,
    uploadingDocument: false,
    uploadDocumentError: true
  }),

  [RESET_CHECK_SMEV]: () => initalState
}, initalState)
