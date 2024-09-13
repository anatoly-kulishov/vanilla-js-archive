import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_MESSAGE_TEMPLATES = 'twinspot/FETCH_MESSAGE_TEMPLATES'
export const FETCH_MESSAGE_TEMPLATES_SUCCESS = 'twinspot/FETCH_MESSAGE_TEMPLATES_SUCCESS'
export const FETCH_MESSAGE_TEMPLATES_ERROR = 'twinspot/FETCH_MESSAGE_TEMPLATES_ERROR'
export const FETCH_MESSAGE_TEMPLATES_FAILURE = 'twinspot/FETCH_MESSAGE_TEMPLATES_FAILURE'

const initialState = {
  messageTemplates: [],
  isMessageTemplatesLoading: true,
  isMessageTemplasteError: ''
}

export const fetchMessageTemplates = createAction(FETCH_MESSAGE_TEMPLATES)

export default handleActions(
  {
    // Message templates
    [FETCH_MESSAGE_TEMPLATES]: produce((state) => {
      state.isMessageTemplatesLoading = true
    }),
    [FETCH_MESSAGE_TEMPLATES_SUCCESS]: produce((state, { payload }) => {
      state.messageTemplates = payload
      state.isMessageTemplatesLoading = false
    }),
    [combineActions(FETCH_MESSAGE_TEMPLATES_ERROR, FETCH_MESSAGE_TEMPLATES_FAILURE)]: produce((state, { payload }) => {
      state.isMessageTemplasteError = payload
      state.isMessageTemplatesLoading = false
    })
  },
  initialState
)
