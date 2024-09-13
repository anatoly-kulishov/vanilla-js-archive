import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const UPLOAD_FILE = 'file/UPLOAD_FILE'
export const UPLOAD_FILE_SUCCESS = 'file/UPLOAD_FILE_SUCCESS'
export const UPLOAD_FILE_ERROR = 'file/UPLOAD_FILE_ERROR'
export const UPLOAD_FILE_FAILURE = 'file/UPLOAD_FILE_FAILURE'

export const DOWNLOAD_FILE = 'file/DOWNLOAD_FILE'
export const DOWNLOAD_FILE_SUCCESS = 'file/DOWNLOAD_FILE_SUCCESS'
export const DOWNLOAD_FILE_ERROR = 'file/DOWNLOAD_FILE_ERROR'
export const DOWNLOAD_FILE_FAILURE = 'file/DOWNLOAD_FILE_FAILURE'

export const DELETE_FILE = 'file/DELETE_FILE'
export const DELETE_FILE_SUCCESS = 'file/DELETE_FILE_SUCCESS'
export const DELETE_FILE_ERROR = 'file/DELETE_FILE_ERROR'
export const DELETE_FILE_FAILURE = 'file/DELETE_FILE_FAILURE'

export const FETCH_SESSION_FILES = 'file/FETCH_SESSION_FILES'
export const FETCH_SESSION_FILES_SUCCESS = 'file/FETCH_SESSION_FILES_SUCCESS'
export const FETCH_SESSION_FILES_ERROR = 'file/FETCH_SESSION_FILES_ERROR'
export const FETCH_SESSION_FILES_FAILURE = 'file/FETCH_SESSION_FILES_FAILURE'

const initalState = {
  files: [],
  isFileLoading: false,
  fileError: ''
}

export const uploadFile = createAction(UPLOAD_FILE)
export const downloadFile = createAction(DOWNLOAD_FILE)
export const deleteFile = createAction(DELETE_FILE)
export const fetchSessionFiles = createAction(FETCH_SESSION_FILES)

export default handleActions(
  {

    [combineActions(UPLOAD_FILE, DOWNLOAD_FILE, DELETE_FILE)]: produce((state, action) => {
      state.isFileLoading = true
    }),

    [UPLOAD_FILE_SUCCESS]: produce((state, { payload }) => {
      state.files.push(...payload)
      state.isFileLoading = false
    }),

    [DELETE_FILE_SUCCESS]: produce((state, { payload }) => {
      state.files = payload
      state.isFileLoading = false
    }),

    [FETCH_SESSION_FILES]: produce((state, action) => {
      state.files.length = 0
      state.isFileLoading = true
    }),

    [FETCH_SESSION_FILES_SUCCESS]: produce((state, { payload }) => {
      state.files.push(...payload)
      state.isFileLoading = false
    }),

    [combineActions(DELETE_FILE_ERROR, DELETE_FILE_FAILURE, UPLOAD_FILE_ERROR, UPLOAD_FILE_FAILURE, DOWNLOAD_FILE_ERROR, DOWNLOAD_FILE_FAILURE, FETCH_SESSION_FILES_ERROR, FETCH_SESSION_FILES_FAILURE)]: produce((state, { payload }) => {
      state.isFileLoading = false
      state.fileError = payload
    })
  },
  initalState
)
