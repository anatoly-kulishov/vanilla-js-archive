import { createAction, handleActions } from 'redux-actions'

export const TICKET_DELETE_FILE = 'ticket/TICKET_DELETE_FILE'
export const TICKET_DELETE_FILE_SUCCESS = 'ticket/TICKET_DELETE_FILE_SUCCESS'
export const TICKET_DELETE_FILE_ERROR = 'ticket/TICKET_DELETE_FILE_ERROR'
export const TICKET_DELETE_FILE_FAILURE = 'ticket/TICKET_DELETE_FILE_FAILURE'

export const TICKET_ADD_COMMENT = 'ticket/TICKET_ADD_COMMENT'
export const TICKET_ADD_COMMENT_SUCCESS = 'ticket/TICKET_ADD_COMMENT_SUCCESS'
export const TICKET_ADD_COMMENT_ERROR = 'ticket/TICKET_ADD_COMMENT_ERROR'
export const TICKET_ADD_COMMENT_FAILURE = 'ticket/TICKET_ADD_COMMENT_FAILURE'

export const TICKET_ADD_FILE = 'ticket/TICKET_ADD_FILE'
export const TICKET_ADD_FILE_SUCCESS = 'ticket/TICKET_ADD_FILE_SUCCESS'
export const TICKET_ADD_FILE_ERROR = 'ticket/TICKET_ADD_FILE_ERROR'
export const TICKET_ADD_FILE_FAILURE = 'ticket/TICKET_ADD_FILE_FAILURE'

const initialState = {
  deleteFile: null,
  deleteFileError: null,
  isDeleteFileLoading: false
}

export const ticketDeleteFile = createAction(TICKET_DELETE_FILE)
export const ticketAddComment = createAction(TICKET_ADD_COMMENT)
export const ticketAddFile = createAction(TICKET_ADD_FILE)

export default handleActions({
  [TICKET_DELETE_FILE]: (state) => ({
    ...state,
    deleteFile: null,
    deleteFileError: false,
    isDeleteFileLoading: true
  }),

  [TICKET_DELETE_FILE_SUCCESS]: (state, { payload: { data, isSuccess } }) => ({
    ...state,
    deleteFile: data,
    deleteFileError: false,
    isDeleteFileLoading: false
  }),

  [TICKET_DELETE_FILE_ERROR]: (state, { payload: { data, isSuccess } }) => ({
    ...state,
    deleteFile: data,
    deleteFileError: true,
    isDeleteFileLoading: false
  }),

  [TICKET_DELETE_FILE_FAILURE]: (state) => ({
    ...state,
    deleteFile: null,
    deleteFileError: true,
    isDeleteFileLoading: false
  }),

  [TICKET_ADD_COMMENT]: (state) => ({ ...state }),
  [TICKET_ADD_COMMENT_SUCCESS]: (state, { payload: { data, isSuccess } }) => ({ ...state }),
  [TICKET_ADD_COMMENT_ERROR]: (state, { payload: { errorCode, errorText, stateCode } }) => ({ ...state }),
  [TICKET_ADD_COMMENT_FAILURE]: (state) => ({ ...state }),

  [TICKET_ADD_FILE]: (state) => ({ ...state }),
  [TICKET_ADD_FILE_SUCCESS]: (state, { payload: { data, isSuccess } }) => ({ ...state }),
  [TICKET_ADD_FILE_ERROR]: (state, { payload: { errorCode, errorText, stateCode } }) => ({ ...state }),
  [TICKET_ADD_FILE_FAILURE]: (state) => ({ ...state })
}, initialState)
