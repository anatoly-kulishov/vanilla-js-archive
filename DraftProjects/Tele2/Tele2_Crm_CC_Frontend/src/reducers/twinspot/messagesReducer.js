import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_MESSAGES = 'twinspot/FETCH_MESSAGES'
export const FETCH_MESSAGES_SUCCESS = 'twinspot/FETCH_MESSAGES_SUCCESS'
export const FETCH_MESSAGES_ERROR = 'twinspot/FETCH_MESSAGES_ERROR'
export const FETCH_MESSAGES_FAILURE = 'twinspot/FETCH_MESSAGES_FAILURE'

export const SEND_MESSAGE = 'twinspot/SEND_MESSAGE'
export const SEND_MESSAGE_SUCCESS = 'twinspot/SEND_MESSAGE_SUCCESS'
export const SEND_MESSAGE_ERROR = 'twinspot/SEND_MESSAGE_ERROR'
export const SEND_MESSAGE_FAILURE = 'twinspot/SEND_MESSAGE_FAILURE'

export const UPLOAD_FILE = 'twinspot/UPLOAD_FILE'
export const UPLOAD_FILE_SUCCESS = 'twinspot/UPLOAD_FILE_SUCCESS'
export const UPLOAD_FILE_ERROR = 'twinspot/UPLOAD_FILE_ERROR'
export const UPLOAD_FILE_FAILURE = 'twinspot/UPLOAD_FILE_FAILURE'
export const DELETE_FILE = 'twinspot/DELETE_FILE'

export const FETCH_CUVO_LINK = 'twinspot/FETCH_CUVO_LINK'
export const FETCH_CUVO_LINK_SUCCESS = 'twinspot/FETCH_CUVO_LINK_SUCCESS'
export const FETCH_CUVO_LINK_ERROR = 'twinspot/FETCH_CUVO_LINK_ERROR'
export const FETCH_CUVO_LINK_FAILURE = 'twinspot/FETCH_CUVO_LINK_FAILURE'

const initialState = {
  messages: [],
  isMessagesLoading: true,
  messageError: '',

  isSending: false,
  sendingError: '',

  messageFiles: [],
  isUploadMessageFilesLoading: false,
  uploadMessageFilesError: '',

  cuvoLink: '',
  isCuvoLinkLoading: false,
  cuvoLinkError: ''
}

export const fetchMessages = createAction(FETCH_MESSAGES)
export const sendMessage = createAction(SEND_MESSAGE)
export const uploadMessageFiles = createAction(UPLOAD_FILE)
export const deleteMessageFiles = createAction(DELETE_FILE)
export const fetchCuvoLink = createAction(FETCH_CUVO_LINK)

export default handleActions(
  {
    // Messages
    [FETCH_MESSAGES]: produce((state) => {
      state.isMessagesLoading = true
    }),
    [FETCH_MESSAGES_SUCCESS]: produce((state, { payload }) => {
      state.messages = payload
      state.isMessagesLoading = false
    }),
    [combineActions(FETCH_MESSAGES_ERROR, FETCH_MESSAGES_FAILURE)]: produce((state, { payload }) => {
      state.messageError = payload
      state.isMessagesLoading = false
    }),

    // Send Message
    [SEND_MESSAGE]: produce((state) => {
      state.isSending = true
    }),
    [SEND_MESSAGE_SUCCESS]: produce((state, { payload }) => {
      state.isSending = false
    }),
    [combineActions(FETCH_MESSAGES_ERROR, FETCH_MESSAGES_FAILURE)]: produce((state, { payload }) => {
      state.sendingError = payload
      state.isSending = false
    }),

    // Message file
    [UPLOAD_FILE]: produce((state) => {
      state.isUploadMessageFilesLoading = true
    }),
    [UPLOAD_FILE_SUCCESS]: produce((state, { payload }) => {
      state.messageFiles.push(...payload)
      state.isUploadMessageFilesLoading = false
    }),
    [combineActions(UPLOAD_FILE_ERROR, UPLOAD_FILE_FAILURE)]: produce((state, { payload }) => {
      state.uploadMessageFilesError = payload
      state.isUploadMessageFilesLoading = false
    }),
    [DELETE_FILE]: produce((state, { payload: fileIndex }) => {
      state.messageFiles.splice(fileIndex, 1)
    }),

    // Cuvo link
    [FETCH_CUVO_LINK]: produce((state) => {
      state.isCuvoLinkLoading = true
    }),
    [FETCH_CUVO_LINK_SUCCESS]: produce((state, { payload }) => {
      state.cuvoLink = payload
      state.isCuvoLinkLoading = false
    }),
    [combineActions(FETCH_CUVO_LINK_ERROR, FETCH_CUVO_LINK_FAILURE)]: produce((state, { payload }) => {
      state.cuvoLinkError = payload
      state.isCuvoLinkLoading = false
    })
  },
  initialState
)
