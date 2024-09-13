import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_CURRENT_CONVERSATION = 'twinspot/FETCH_CURRENT_CONVERSATION'
export const FETCH_CURRENT_CONVERSATION_SUCCESS = 'twinspot/FETCH_CURRENT_CONVERSATION_SUCCESS'
export const FETCH_CURRENT_CONVERSATION_ERROR = 'twinspot/FETCH_CURRENT_CONVERSATION_ERROR'
export const FETCH_CURRENT_CONVERSATION_FAILURE = 'twinspot/FETCH_CURRENT_CONVERSATION_FAILURE'

export const FETCH_SENDERS_CONVERSATIONS = 'twinspot/FETCH_SENDERS_CONVERSATIONS'
export const FETCH_SENDERS_CONVERSATIONS_SUCCESS = 'twinspot/FETCH_SENDERSCONVERSATIONS_SUCCESS'
export const FETCH_SENDERS_CONVERSATIONS_ERROR = 'twinspot/FETCH_SENDERSCONVERSATIONS_ERROR'
export const FETCH_SENDERS_CONVERSATIONS_FAILURE = 'twinspot/FETCH_SENDERSCONVERSATIONS_FAILURE'

export const SET_WORK_STATUS = 'twinspot/SET_WORK_STATUS'
export const SET_WORK_STATUS_SUCCESS = 'twinspot/SET_WORK_STATUS_SUCCESS'
export const SET_WORK_STATUS_ERROR = 'twinspot/SET_WORK_STATUS_ERROR'
export const SET_WORK_STATUS_FAILURE = 'twinspot/SET_WORK_STATUS_FAILURE'

export const SET_DELAY_STATUS = 'twinspot/SET_DELAY_STATUS'
export const SET_DELAY_STATUS_SUCCESS = 'twinspot/SET_DELAY_STATUS_SUCCESS'
export const SET_DELAY_STATUS_ERROR = 'twinspot/SET_DELAY_STATUS_ERROR'
export const SET_DELAY_STATUS_FAILURE = 'twinspot/SET_DELAY_STATUS_FAILURE'

export const SET_CLOSE_STATUS = 'twinspot/SET_CLOSE_STATUS'
export const SET_CLOSE_STATUS_SUCCESS = 'twinspot/SET_CLOSE_STATUS_SUCCESS'
export const SET_CLOSE_STATUS_ERROR = 'twinspot/SET_CLOSE_STATUS_ERROR'
export const SET_CLOSE_STATUS_FAILURE = 'twinspot/SET_CLOSE_STATUS_FAILURE'

export const FETCH_IDENTIFY_CONVERSATION = 'twinspot/FETCH_IDENTIFY_CONVERSATION'
export const FETCH_IDENTIFY_CONVERSATION_SUCCESS = 'twinspot/FETCH_IDENTIFY_CONVERSATION_SUCCESS'
export const FETCH_IDENTIFY_CONVERSATION_ERROR = 'twinspot/FETCH_IDENTIFY_CONVERSATION_ERROR'
export const FETCH_IDENTIFY_CONVERSATION_FAILURE = 'twinspot/FETCH_IDENTIFY_CONVERSATION_FAILURE'

export const UDPATE_IDENTIFICATION_LEVEL = 'twinspot/UDPATE_IDENTIFICATION_LEVEL'
export const UDPATE_IDENTIFICATION_LEVEL_SUCCESS = 'twinspot/UDPATE_IDENTIFICATION_LEVEL_SUCCESS'
export const UDPATE_IDENTIFICATION_LEVEL_ERROR = 'twinspot/UDPATE_IDENTIFICATION_LEVEL_ERROR'
export const UDPATE_IDENTIFICATION_LEVEL_FAILURE = 'twinspot/UDPATE_IDENTIFICATION_LEVEL_FAILURE'

export const FETCH_IDENTIFICATION_LEVELS = 'twinspot/FETCH_IDENTIFICATION_LEVELS'
export const FETCH_IDENTIFICATION_LEVELS_SUCCESS = 'twinspot/FETCH_IDENTIFICATION_LEVELS_SUCCESS'
export const FETCH_IDENTIFICATION_LEVELS_ERROR = 'twinspot/FETCH_IDENTIFICATION_LEVELS_ERROR'
export const FETCH_IDENTIFICATION_LEVELS_FAILURE = 'twinspot/FETCH_IDENTIFICATION_LEVELS_FAILURE'

const initialState = {
  currentConversation: {},
  isCurrentConversationLoading: true,
  currentConversationError: '',

  sendersConversations: {
    active: [],
    inactive: []
  },
  isSendersConversationsLoading: true,
  isSendersConversationsError: '',

  isSetWorkStatusLoading: false,
  setWorkStatusError: '',

  isSetDelayStatusLoading: false,
  setDelayStatusError: '',

  isSetCloseStatusLoading: false,
  setCloseStatusError: '',

  updateIdentificationLevelResult: null,
  isIdentificationLevelUpdating: false,
  identificationLevelUpdatingError: '',

  identificationLevels: [],
  isIdentificationLevelsLoading: false,
  identificationLevelsError: '',

  identifyConversation: {
    indentifiers: [],
    dsText: 'С этого почтового ящика ранее были обработаны обращения от'
  },
  isIdentifyConversationLoading: false,
  identifyError: ''
}

export const fetchConversations = createAction(FETCH_CURRENT_CONVERSATION)
export const fetchSendersConversations = createAction(FETCH_SENDERS_CONVERSATIONS)
export const setWorkStatus = createAction(SET_WORK_STATUS)
export const setDelayStatus = createAction(SET_DELAY_STATUS)
export const setCloseStatus = createAction(SET_CLOSE_STATUS)
export const updateIdentificationLevel = createAction(UDPATE_IDENTIFICATION_LEVEL)
export const fetchIdentificationLevels = createAction(FETCH_IDENTIFICATION_LEVELS)
export const fetchIdentifyConversation = createAction(FETCH_IDENTIFY_CONVERSATION)

export default handleActions(
  {
    // Current conversation
    [FETCH_CURRENT_CONVERSATION]: produce((state) => {
      state.isCurrentConversationLoading = true
    }),
    [FETCH_CURRENT_CONVERSATION_SUCCESS]: produce((state, { payload }) => {
      state.currentConversation = payload
      state.isCurrentConversationLoading = false
    }),
    [combineActions(FETCH_CURRENT_CONVERSATION_ERROR, FETCH_CURRENT_CONVERSATION_FAILURE)]: produce((state, { payload }) => {
      state.currentConversationError = payload
      state.isCurrentConversationLoading = false
    }),

    // All senders conversation
    [FETCH_SENDERS_CONVERSATIONS]: produce((state) => {
      state.isSendersConversationsLoading = true
    }),
    [FETCH_SENDERS_CONVERSATIONS_SUCCESS]: produce((state, { payload }) => {
      state.sendersConversations = payload
      state.isSendersConversationsLoading = false
    }),
    [combineActions(FETCH_SENDERS_CONVERSATIONS_ERROR, FETCH_SENDERS_CONVERSATIONS_FAILURE)]: produce((state, { payload }) => {
      state.isSendersConversationsError = payload
      state.isSendersConversationsLoading = false
    }),

    // Conversation work status
    [SET_WORK_STATUS]: produce((state) => {
      state.isSetWorkStatusLoading = true
    }),
    [SET_WORK_STATUS_SUCCESS]: produce((state) => {
      state.isSetWorkStatusLoading = false
    }),
    [combineActions(SET_WORK_STATUS_ERROR, SET_WORK_STATUS_FAILURE)]: produce((state, { payload }) => {
      state.setWorkStatusError = payload
      state.isSetWorkStatusLoading = false
    }),

    // Conversation delay status
    [SET_DELAY_STATUS]: produce((state) => {
      state.isSetDelayStatusLoading = true
    }),
    [SET_DELAY_STATUS_SUCCESS]: produce((state) => {
      state.isSetDelayStatusLoading = false
    }),
    [combineActions(SET_DELAY_STATUS_ERROR, SET_DELAY_STATUS_FAILURE)]: produce((state, { payload }) => {
      state.setDelayStatusError = payload
      state.isSetDelayStatusLoading = false
    }),

    // Conversation close status
    [SET_CLOSE_STATUS]: produce((state) => {
      state.isSetCloseStatusLoading = true
    }),
    [SET_CLOSE_STATUS_SUCCESS]: produce((state) => {
      state.isSetCloseStatusLoading = false
    }),
    [combineActions(SET_CLOSE_STATUS_ERROR, SET_CLOSE_STATUS_FAILURE)]: produce((state, { payload }) => {
      state.setCloseStatusError = payload
      state.isSetCloseStatusLoading = false
    }),

    // Update identification level
    [UDPATE_IDENTIFICATION_LEVEL]: produce((state) => {
      state.isIdentificationLevelUpdating = true
    }),
    [UDPATE_IDENTIFICATION_LEVEL_SUCCESS]: produce((state, { payload }) => {
      state.updateIdentificationLevelResult = payload
      state.isIdentificationLevelUpdating = false
    }),
    [combineActions(UDPATE_IDENTIFICATION_LEVEL_ERROR, UDPATE_IDENTIFICATION_LEVEL_FAILURE)]: produce((state, { payload }) => {
      state.identificationLevelUpdatingError = payload
      state.isIdentificationLevelUpdating = false
    }),

    // Fetch identification levels
    [FETCH_IDENTIFICATION_LEVELS]: produce((state) => {
      state.isIdentificationLevelsLoading = true
    }),
    [FETCH_IDENTIFICATION_LEVELS_SUCCESS]: produce((state, { payload }) => {
      state.identificationLevels = payload
      state.isIdentificationLevelsLoading = false
    }),
    [combineActions(FETCH_IDENTIFICATION_LEVELS_ERROR, FETCH_IDENTIFICATION_LEVELS_FAILURE)]: produce((state, { payload }) => {
      state.identificationLevelsError = payload
      state.isIdentificationLevelsLoading = false
    }),

    // Identify conversation
    [FETCH_IDENTIFY_CONVERSATION]: produce((state) => {
      state.isIdentifyConversationLoading = true
    }),
    [FETCH_IDENTIFY_CONVERSATION_SUCCESS]: produce((state, { payload }) => {
      state.identifyConversation = payload
      state.isIdentifyConversationLoading = false
    }),
    [combineActions(FETCH_IDENTIFY_CONVERSATION_ERROR, FETCH_IDENTIFY_CONVERSATION_FAILURE)]: produce((state, { payload }) => {
      state.identifyError = payload
      state.isIdentifyConversationLoading = false
    })
  },
  initialState
)
