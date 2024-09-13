import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FEEDBACK_MODAL_OPEN = 'feedback/FEEDBACK_MODAL_OPEN'
export const FEEDBACK_MODAL_CLOSE = 'feedback/FEEDBACK_MODAL_CLOSE'

export const PREFILL_FEEDBACK_MODAL = 'feedback/PREFILL_FEEDBACK_MODAL'

export const GET_FEEDBACK_TYPES = 'feedback/GET_FEEDBACK_TYPES'
export const GET_FEEDBACK_TYPES_SUCCESS = 'feedback/GET_FEEDBACK_TYPES_SUCCESS'
export const GET_FEEDBACK_TYPES_ERROR = 'feedback/GET_FEEDBACK_TYPES_ERROR'
export const GET_FEEDBACK_TYPES_FAILURE = 'feedback/GET_FEEDBACK_TYPES_FAILURE'

export const GET_FEEDBACK_COMPONENTS = 'feedback/GET_FEEDBACK_COMPONENTS'
export const GET_FEEDBACK_COMPONENTS_SUCCESS = 'feedback/GET_FEEDBACK_COMPONENTS_SUCCESS'
export const GET_FEEDBACK_COMPONENTS_ERROR = 'feedback/GET_FEEDBACK_COMPONENTS_ERROR'
export const GET_FEEDBACK_COMPONENTS_FAILURE = 'feedback/GET_FEEDBACK_COMPONENTS_FAILURE'

export const GET_FEEDBACK_TEMPLATES = 'feedback/GET_FEEDBACK_TEMPLATES'
export const GET_FEEDBACK_TEMPLATES_SUCCESS = 'feedback/GET_FEEDBACK_TEMPLATES_SUCCESS'
export const GET_FEEDBACK_TEMPLATES_ERROR = 'feedback/GET_FEEDBACK_TEMPLATES_ERROR'
export const GET_FEEDBACK_TEMPLATES_FAILURE = 'feedback/GET_FEEDBACK_TEMPLATES_FAILURE'

export const SEND_FEEDBACK = 'feedback/SEND_FEEDBACK'
export const SEND_FEEDBACK_SUCCESS = 'feedback/SEND_FEEDBACK_SUCCESS'
export const SEND_FEEDBACK_ERROR = 'feedback/SEND_FEEDBACK_ERROR'
export const SEND_FEEDBACK_FAILURE = 'feedback/SEND_FEEDBACK_FAILURE'

export const CANCEL_FEEDBACK = 'feedback/CANCEL_FEEDBACK'
export const CANCEL_FEEDBACK_SUCCESS = 'feedback/CANCEL_FEEDBACK_SUCCESS'
export const CANCEL_FEEDBACK_ERROR = 'feedback/CANCEL_FEEDBACK_ERROR'
export const CANCEL_FEEDBACK_FAILURE = 'feedback/CANCEL_FEEDBACK_FAILURE'

const initialState = {
  isVisible: false,

  prefilledData: {},

  feedbackTypes: [],
  isFeedbackLoading: false,
  isFeedbackSending: false,
  isFeedbackCanceling: false,

  feedbackError: '',

  feedbackComponents: [],
  feedbackComponentsError: '',

  feedbackTemplates: '',
  feedbackTemplatesError: ''
}

export const feedbackModalOpen = createAction(FEEDBACK_MODAL_OPEN)
export const feedbackModalClose = createAction(FEEDBACK_MODAL_CLOSE)

export const prefillFeedbackModal = createAction(PREFILL_FEEDBACK_MODAL)

export const getFeedbackTypes = createAction(GET_FEEDBACK_TYPES)

export const sendFeedback = createAction(SEND_FEEDBACK)
export const cancelFeedback = createAction(CANCEL_FEEDBACK)

export const getFeedbackComponents = createAction(GET_FEEDBACK_COMPONENTS)
export const getFeedbackTemplates = createAction(GET_FEEDBACK_TEMPLATES)

export default handleActions(
  {
    [FEEDBACK_MODAL_OPEN]: produce((state, action) => {
      state.isVisible = true
    }),

    [FEEDBACK_MODAL_CLOSE]: produce((state, action) => {
      state.isVisible = false
    }),

    [PREFILL_FEEDBACK_MODAL]: produce((state, { payload }) => {
      state.prefilledData = payload
    }),

    [GET_FEEDBACK_TYPES]: produce((state, action) => {
      state.isFeedbackLoading = true
    }),

    [GET_FEEDBACK_TYPES_SUCCESS]: produce((state, { payload }) => {
      state.feedbackTypes = payload
      state.isFeedbackLoading = false
    }),

    [GET_FEEDBACK_COMPONENTS_SUCCESS]: produce((state, { payload }) => {
      state.feedbackComponents = payload
    }),

    [GET_FEEDBACK_TEMPLATES_SUCCESS]: produce((state, { payload }) => {
      state.feedbackTemplates = payload
    }),

    [SEND_FEEDBACK]: produce((state, action) => {
      state.isFeedbackSending = true
    }),

    [SEND_FEEDBACK_SUCCESS]: produce((state, action) => {
      state.isFeedbackSending = false
    }),

    [CANCEL_FEEDBACK]: produce((state, action) => {
      state.isFeedbackCanceling = true
    }),

    [CANCEL_FEEDBACK_SUCCESS]: produce((state, action) => {
      state.isFeedbackCanceling = false
    }),

    [combineActions(GET_FEEDBACK_TYPES_ERROR, GET_FEEDBACK_TYPES_FAILURE, SEND_FEEDBACK_ERROR, SEND_FEEDBACK_FAILURE, CANCEL_FEEDBACK_ERROR, CANCEL_FEEDBACK_FAILURE)]:
    produce((state, { payload }) => {
      state.feedbackError = payload
      state.isFeedbackLoading = false
      state.isFeedbackSending = false
    }),

    [combineActions(GET_FEEDBACK_COMPONENTS_ERROR, GET_FEEDBACK_COMPONENTS_FAILURE)]: produce((state, { payload }) => {
      state.feedbackComponentsError = payload
    }),

    [combineActions(GET_FEEDBACK_TEMPLATES_ERROR, GET_FEEDBACK_TEMPLATES_FAILURE)]: produce((state, { payload }) => {
      state.feedbackTemplatesError = payload
    })
  },
  initialState
)
