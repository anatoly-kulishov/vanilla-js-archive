import { createAction, handleActions, combineActions } from 'redux-actions'

export const VALIDATE_PAYD_HISTORY = 'compensations/VALIDATE_PAYD_HISTORY'
export const VALIDATE_PAYD_HISTORY_SUCCESS = 'compensations/VALIDATE_PAYD_HISTORY_SUCCESS'
export const VALIDATE_PAYD_HISTORY_ERROR = 'compensations/VALIDATE_PAYD_HISTORY_ERROR'
export const VALIDATE_PAYD_HISTORY_FAILURE = 'compensations/VALIDATE_PAYD_HISTORY_FAILURE'

export const VALIDATE_PAYD_SERVICE = 'compensations/VALIDATE_PAYD_SERVICE'
export const VALIDATE_PAYD_SERVICE_SUCCESS = 'compensations/VALIDATE_PAYD_SERVICE_SUCCESS'
export const VALIDATE_PAYD_SERVICE_ERROR = 'compensations/VALIDATE_PAYD_SERVICE_ERROR'
export const VALIDATE_PAYD_SERVICE_FAILURE = 'compensations/VALIDATE_PAYD_SERVICE_FAILURE'

export const VALIDATE_PAYD_SERVICE_HISTORY = 'compensations/VALIDATE_PAYD_SERVICE_HISTORY'
export const VALIDATE_PAYD_SERVICE_HISTORY_SUCCESS = 'compensations/VALIDATE_PAYD_SERVICE_HISTORY_SUCCESS'
export const VALIDATE_PAYD_SERVICE_HISTORY_ERROR = 'compensations/VALIDATE_PAYD_SERVICE_HISTORY_ERROR'
export const VALIDATE_PAYD_SERVICE_HISTORY_FAILURE = 'compensations/VALIDATE_PAYD_SERVICE_HISTORY_FAILURE'

export const VALIDATE_PAYD_SERVICE_ENABLED = 'compensations/VALIDATE_PAYD_SERVICE_ENABLED'
export const VALIDATE_PAYD_SERVICE_ENABLED_SUCCESS = 'compensations/VALIDATE_PAYD_SERVICE_ENABLED_SUCCESS'
export const VALIDATE_PAYD_SERVICE_ENABLED_ERROR = 'compensations/VALIDATE_PAYD_SERVICE_ENABLED_ERROR'
export const VALIDATE_PAYD_SERVICE_ENABLED_FAILURE = 'compensations/VALIDATE_PAYD_SERVICE_ENABLED_FAILURE'

export const VALIDATE_PAYD_SERVICE_AVAILABLE = 'compensations/VALIDATE_PAYD_SERVICE_AVAILABLE'
export const VALIDATE_PAYD_SERVICE_AVAILABLE_SUCCESS = 'compensations/VALIDATE_PAYD_SERVICE_AVAILABLE_SUCCESS'
export const VALIDATE_PAYD_SERVICE_AVAILABLE_ERROR = 'compensations/VALIDATE_PAYD_SERVICE_AVAILABLE_ERROR'
export const VALIDATE_PAYD_SERVICE_AVAILABLE_FAILURE = 'compensations/VALIDATE_PAYD_SERVICE_AVAILABLE_FAILURE'

export const CLEAR_VALIDATION_MESSAGES = 'compensations/CLEAR_VALIDATION_MESSAGES'
export const SET_INITIAL_VALIDATION_STATE = 'compensations/SET_INITIAL_VALIDATION_STATE'
const initialState = {
  validationMessages: [],

  isValidatePaydHistoryError: null,
  isValidatePaydHistoryLoading: null,

  isValidatePaydServiceError: null,
  isValidatePaydServiceLoading: false,
  validatePaydServiceData: {},

  isValidatePaydServiceHistoryError: false,

  isValidatePaydServiceEnabledError: null,
  isValidatePaydServiceEnabledLoading: null,

  isValidatePaydServiceAvailableError: false,
  isValidatePaydServiceAvailableLoading: null,

  initializedWarnings: {
    isValidatePaydServiceWarning: false,
    isValidatePaydServiceEnabledWarning: false,
    isValidatePaydServiceAvailableWarning: false
  },
  paydServiceHistory: [],
  availablePackages: []
}

export const validatePaydHistory = createAction(VALIDATE_PAYD_HISTORY)
export const validatePaydService = createAction(VALIDATE_PAYD_SERVICE)
export const validatePaydServiceHistory = createAction(VALIDATE_PAYD_SERVICE_HISTORY)
export const validatePaydServiceEnabled = createAction(VALIDATE_PAYD_SERVICE_ENABLED)
export const validatePaydServiceAvailable = createAction(VALIDATE_PAYD_SERVICE_AVAILABLE)

export const clearValidationMessages = createAction(CLEAR_VALIDATION_MESSAGES)
export const setInitialValidationState = createAction(SET_INITIAL_VALIDATION_STATE)

export default handleActions({
  [VALIDATE_PAYD_SERVICE]: state => ({
    ...state,
    isValidatePaydServiceLoading: true
  }),

  [VALIDATE_PAYD_SERVICE_SUCCESS]: (state, { payload: { newValidationMessagesArray, isInitializedWarnings, validatePaydServiceData } }) => {
    return {
      ...state,
      isValidatePaydServiceError: false,
      isValidatePaydServiceLoading: false,
      validationMessages: newValidationMessagesArray,
      initializedWarnings: { ...state.initializedWarnings, isValidatePaydServiceWarning: isInitializedWarnings },
      validatePaydServiceData
    }
  },

  [VALIDATE_PAYD_SERVICE_ERROR]: (state, { payload: { newValidationMessagesArray, isInitializedWarnings } }) => ({
    ...state,
    isValidatePaydServiceError: true,
    isValidatePaydServiceLoading: false,
    validationMessages: newValidationMessagesArray,
    initializedWarnings: { ...state.initializedWarnings, isValidatePaydServiceWarning: isInitializedWarnings },
    validatePaydServiceData: {}
  }),

  [VALIDATE_PAYD_SERVICE_FAILURE]: (state, { payload: { message } }) => ({
    ...state,
    isValidatePaydServiceError: true,
    isValidatePaydServiceLoading: false,
    validatePaydServiceData: {}
  }),
  [VALIDATE_PAYD_HISTORY]: state => ({
    ...state,
    isNeedShowEnrollmentConfirm: false,
    isValidatePaydHistoryLoading: true
  }),

  [VALIDATE_PAYD_HISTORY_SUCCESS]: (state, { payload: { newValidationMessagesArray } }) => ({
    ...state,
    isValidatePaydHistoryError: false,
    isNeedShowEnrollmentConfirm: true,
    isValidatePaydHistoryLoading: false,
    validationMessages: newValidationMessagesArray
  }),

  [VALIDATE_PAYD_HISTORY_ERROR]: (state, { payload: { newValidationMessagesArray } }) => ({
    ...state,
    isNeedShowEnrollmentConfirm: false,
    isValidatePaydHistoryLoading: false,
    isValidatePaydHistoryError: true,
    validationMessages: newValidationMessagesArray
  }),

  [VALIDATE_PAYD_HISTORY_FAILURE]: (state) => ({
    ...state,
    isNeedShowEnrollmentConfirm: false,
    isValidatePaydHistoryLoading: false,
    isValidatePaydHistoryError: true
  }),

  [VALIDATE_PAYD_SERVICE_HISTORY_SUCCESS]: (state, { payload: { newValidationMessagesArray, paydServiceHistory } }) => ({
    ...state,
    isValidatePaydServiceHistoryError: false,
    validationMessages: newValidationMessagesArray,
    paydServiceHistory
  }),

  [combineActions(VALIDATE_PAYD_SERVICE_HISTORY_ERROR, VALIDATE_PAYD_SERVICE_HISTORY_FAILURE)]: state => ({
    ...state,
    isValidatePaydServiceHistoryError: true,
    paydServiceHistory: []
  }),

  [VALIDATE_PAYD_SERVICE_ENABLED]: state => ({
    ...state,
    isValidatePaydServiceEnabledLoading: true
  }),
  [VALIDATE_PAYD_SERVICE_ENABLED_SUCCESS]: (state, { payload: { newValidationMessagesArray, isInitializedWarnings } }) => ({
    ...state,
    isValidatePaydServiceEnabledError: false,
    isValidatePaydServiceEnabledLoading: false,
    validationMessages: newValidationMessagesArray,
    initializedWarnings: { ...state.initializedWarnings, isValidatePaydServiceEnabledWarning: isInitializedWarnings }
  }),

  [VALIDATE_PAYD_SERVICE_ENABLED_ERROR]: (state, { payload: { newValidationMessagesArray, isInitializedWarnings } }) => ({
    ...state,
    isValidatePaydServiceEnabledError: true,
    isValidatePaydServiceEnabledLoading: false,
    validationMessages: newValidationMessagesArray,
    initializedWarnings: { ...state.initializedWarnings, isValidatePaydServiceEnabledWarning: isInitializedWarnings }
  }),

  [VALIDATE_PAYD_SERVICE_ENABLED_FAILURE]: (state) => ({
    ...state,
    isValidatePaydServiceEnabledError: true,
    isValidatePaydServiceEnabledLoading: false
  }),

  [VALIDATE_PAYD_SERVICE_AVAILABLE]: state => ({
    ...state,
    isValidatePaydServiceAvailableLoading: true
  }),
  [VALIDATE_PAYD_SERVICE_AVAILABLE_SUCCESS]: (state, { payload: { newValidationMessagesArray, isInitializedWarnings, availablePackages } }) => ({
    ...state,
    isValidatePaydServiceAvailableError: false,
    isValidatePaydServiceAvailableLoading: false,
    validationMessages: newValidationMessagesArray,
    initializedWarnings: { ...state.initializedWarnings, isValidatePaydServiceAvailableWarning: isInitializedWarnings },
    availablePackages
  }),

  [VALIDATE_PAYD_SERVICE_AVAILABLE_ERROR]: (state, { payload: { newValidationMessagesArray, isInitializedWarnings } }) => ({
    ...state,
    isValidatePaydServiceAvailableError: true,
    isValidatePaydServiceAvailableLoading: false,
    validationMessages: newValidationMessagesArray,
    initializedWarnings: { ...state.initializedWarnings, isValidatePaydServiceAvailableWarning: isInitializedWarnings }
  }),

  [VALIDATE_PAYD_SERVICE_AVAILABLE_FAILURE]: state => ({
    ...state,
    isValidatePaydServiceAvailableError: true,
    isValidatePaydServiceAvailableLoading: false
  }),
  [CLEAR_VALIDATION_MESSAGES]: state => ({
    ...state,
    validationMessages: []
  }),
  [SET_INITIAL_VALIDATION_STATE]: state => ({
    ...initialState
  })
}, initialState)
