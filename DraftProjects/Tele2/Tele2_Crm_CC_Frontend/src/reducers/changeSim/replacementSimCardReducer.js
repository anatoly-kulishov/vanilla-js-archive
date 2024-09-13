import { createAction, handleActions, combineActions } from 'redux-actions'

export const HANDLE_VISIBLE_REPLACEMENT_SIM_CARD_MODAL = 'changeSim/replacementSimCard/HANDLE_VISIBLE_REPLACEMENT_SIM_CARD_MODAL'
export const HANDLE_VISIBLE_DUPLICATE_SEARCH_MODAL = 'changeSim/replacementSimCard/HANDLE_VISIBLE_DUPLICATE_SEARCH_MODAL'
export const HANDLE_VISIBLE_HISTORY_ICC_MODAL = 'changeSim/replacementSimCard/HANDLE_VISIBLE_HISTORY_ICC_MODAL'
export const CLEAR_REPLACEMENT_SIM_CARD_MODAL = 'changeSim/replacementSimCard/CLEAR_REPLACEMENT_SIM_CARD_MODAL'

export const VALIDATE_SIM_PROFILE = 'changeSim/replacementSimCard/VALIDATE_SIM_PROFILE'
export const VALIDATE_SIM_PROFILE_SUCCESS = 'changeSim/replacementSimCard/VALIDATE_SIM_PROFILE_SUCCESS'
export const VALIDATE_SIM_PROFILE_ERROR = 'changeSim/replacementSimCard/VALIDATE_SIM_PROFILE_ERROR'
export const VALIDATE_SIM_PROFILE_FAILURE = 'changeSim/replacementSimCard/VALIDATE_SIM_PROFILE_FAILURE'

export const SEND_SMS_REPLACEMENT_SIM = 'changeSim/replacementSimCard/SEND_SMS_REPLACEMENT_SIM'
export const SEND_SMS_REPLACEMENT_SIM_SUCCESS = 'changeSim/replacementSimCard/SEND_SMS_REPLACEMENT_SIM_SUCCESS'
export const SEND_SMS_REPLACEMENT_SIM_ERROR = 'changeSim/replacementSimCard/SEND_SMS_REPLACEMENT_SIM_ERROR'
export const SEND_SMS_REPLACEMENT_SIM_FAILURE = 'changeSim/replacementSimCard/SEND_SMS_REPLACEMENT_SIM_FAILURE'

export const CHANGE_SIM = 'changeSim/replacementSimCard/CHANGE_SIM'
export const CHANGE_SIM_SUCCESS = 'changeSim/replacementSimCard/CHANGE_SIM_SUCCESS'
export const CHANGE_SIM_ERROR = 'changeSim/replacementSimCard/CHANGE_SIM_ERROR'
export const CHANGE_SIM_FAILURE = 'changeSim/replacementSimCard/CHANGE_SIM_FAILURE'

export const GET_HISTORY_CHANGE_SIM = 'changeSim/replacementSimCard/GET_HISTORY_CHANGE_SIM'
export const GET_HISTORY_CHANGE_SIM_SUCCESS = 'changeSim/replacementSimCard/GET_HISTORY_CHANGE_SIM_SUCCESS'
export const GET_HISTORY_CHANGE_SIM_ERROR = 'changeSim/replacementSimCard/GET_HISTORY_CHANGE_SIM_ERROR'
export const GET_HISTORY_CHANGE_SIM_FAILURE = 'changeSim/replacementSimCard/GET_HISTORY_CHANGE_SIM_FAILURE'

export const GET_REASONS_CHANGE_SIM = 'changeSim/GET_REASONS_CHANGE_SIM'
export const GET_REASONS_CHANGE_SIM_SUCCESS = 'changeSim/GET_REASONS_CHANGE_SIM_SUCCESS'
export const GET_REASONS_CHANGE_SIM_ERROR = 'changeSim/GET_REASONS_CHANGE_SIM_ERROR'
export const GET_REASONS_CHANGE_SIM_FAILURE = 'changeSim/GET_REASONS_CHANGE_SIM_FAILURE'

const initialState = {
  isVisibleReplacementSimCardModal: false,
  isVisibleDuplicateSearchModal: false,
  isVisibleHistoryIccModal: false,
  dataForm: null,

  validateSimProfile: null,
  validateSimProfileLoading: false,
  validateSimProfileError: false,
  validateSimProfileMessage: null,

  isSendSms: false,
  sendSmsLoading: false,
  sendSmsError: false,
  sendSmsMessage: null,

  isChangeSimLoading: false,
  changeSimError: false,
  changeSimErrorMessage: null,

  historyChangeSim: null,
  getHistoryLoading: false,
  getHistoryError: false,
  getHistoryMessage: null,

  reasonsChangeSim: [],
  reasonsChangeSimLoading: false,
  reasonsChangeSimError: false
}

export const handleVisibleReplacementSimCardModal = createAction(HANDLE_VISIBLE_REPLACEMENT_SIM_CARD_MODAL)
export const handleVisibleDuplicateSearchModal = createAction(HANDLE_VISIBLE_DUPLICATE_SEARCH_MODAL)
export const handleVisibleHistoryIccModal = createAction(HANDLE_VISIBLE_HISTORY_ICC_MODAL)
export const validateSimProfile = createAction(VALIDATE_SIM_PROFILE)
export const sendSmsReplacementSim = createAction(SEND_SMS_REPLACEMENT_SIM)
export const clearReplacementSimCardModal = createAction(CLEAR_REPLACEMENT_SIM_CARD_MODAL)
export const changeSim = createAction(CHANGE_SIM)
export const getHistoryChangeSim = createAction(GET_HISTORY_CHANGE_SIM)
export const getReasonsChangeSim = createAction(GET_REASONS_CHANGE_SIM)

export default handleActions({
  [HANDLE_VISIBLE_REPLACEMENT_SIM_CARD_MODAL]: (state) => ({
    ...state,
    isVisibleReplacementSimCardModal: !state.isVisibleReplacementSimCardModal
  }),
  [HANDLE_VISIBLE_DUPLICATE_SEARCH_MODAL]: (state) => ({
    ...state,
    isVisibleDuplicateSearchModal: !state.isVisibleDuplicateSearchModal
  }),
  [HANDLE_VISIBLE_HISTORY_ICC_MODAL]: (state) => ({
    ...state,
    isVisibleHistoryIccModal: !state.isVisibleHistoryIccModal
  }),
  [CLEAR_REPLACEMENT_SIM_CARD_MODAL]: (state) => ({
    ...state,
    isSendSms: false
  }),

  [VALIDATE_SIM_PROFILE]: (state, { payload: { dataForm } }) => ({
    ...state,
    dataForm,
    validateSimProfileLoading: true,
    validateSimProfileError: false
  }),
  [VALIDATE_SIM_PROFILE_SUCCESS]: (state, { payload: { Data } }) => ({
    ...state,
    validateSimProfile: Data,
    validateSimProfileLoading: false,
    validateSimProfileError: false
  }),
  [combineActions(VALIDATE_SIM_PROFILE_ERROR, VALIDATE_SIM_PROFILE_FAILURE)]: (state) => ({
    ...state,
    validateSimProfileLoading: false,
    validateSimProfileError: true
  }),

  [SEND_SMS_REPLACEMENT_SIM]: (state) => ({
    ...state,
    sendSmsLoading: true,
    sendSmsError: false
  }),
  [SEND_SMS_REPLACEMENT_SIM_SUCCESS]: (state, { payload: { Data } }) => ({
    ...state,
    isSendSms: true,
    sendSmsLoading: false,
    sendSmsError: false
  }),
  [SEND_SMS_REPLACEMENT_SIM_ERROR]: (state, { payload: { MessageText } }) => ({
    ...state,
    isSendSms: false,
    sendSmsLoading: false,
    sendSmsError: true,
    sendSmsMessage: MessageText
  }),
  [SEND_SMS_REPLACEMENT_SIM_FAILURE]: (state, { message }) => ({
    ...state,
    isSendSms: false,
    sendSmsLoading: false,
    sendSmsError: true,
    sendSmsMessage: message
  }),

  [CHANGE_SIM]: (state) => ({
    ...state,
    isChangeSimLoading: true,
    changeSimError: false
  }),
  [CHANGE_SIM_SUCCESS]: (state) => ({
    ...state,
    isChangeSimLoading: false,
    changeSimError: false
  }),
  [CHANGE_SIM_ERROR]: (state, { payload: { MessageText } }) => ({
    ...state,
    isChangeSimLoading: false,
    changeSimError: true,
    changeSimErrorMessage: MessageText
  }),
  [CHANGE_SIM_FAILURE]: (state, { message }) => ({
    ...state,
    isChangeSimLoading: false,
    changeSimError: true,
    changeSimErrorMessage: message
  }),

  [GET_HISTORY_CHANGE_SIM]: (state) => ({
    ...state,
    historyChangeSim: null,
    getHistoryLoading: true,
    getHistoryError: false
  }),
  [GET_HISTORY_CHANGE_SIM_SUCCESS]: (state, { payload: { Data } }) => ({
    ...state,
    historyChangeSim: Data,
    getHistoryLoading: false,
    getHistoryError: false
  }),
  [combineActions(GET_HISTORY_CHANGE_SIM_ERROR, GET_HISTORY_CHANGE_SIM_FAILURE)]: (state) => ({
    ...state,
    getHistoryLoading: false,
    getHistoryError: true
  }),
  [GET_REASONS_CHANGE_SIM]: state => ({
    ...state,
    reasonsChangeSimLoading: true
  }),
  [GET_REASONS_CHANGE_SIM_SUCCESS]: (state, { payload }) => ({
    ...state,
    reasonsChangeSim: payload,
    reasonsChangeSimLoading: false,
    reasonsChangeSimError: false
  }),
  [combineActions(GET_REASONS_CHANGE_SIM_ERROR, GET_REASONS_CHANGE_SIM_FAILURE)]: (state) => ({
    ...state,
    reasonsChangeSim: [],
    reasonsChangeSimLoading: false,
    reasonsChangeSimError: true
  })
}, initialState)
