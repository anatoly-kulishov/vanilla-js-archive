import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_PAYD_COMMENTS = 'compensation/FETCH_PAYD_COMMENTS'
export const FETCH_PAYD_COMMENTS_SUCCESS = 'compensation/FETCH_PAYD_COMMENTS_SUCCESS'
export const FETCH_PAYD_COMMENTS_ERROR = 'compensation/FETCH_PAYD_COMMENTS_ERROR'
export const FETCH_PAYD_COMMENTS_FAILURE = 'compensation/FETCH_PAYD_COMMENTS_FAILURE'

export const VALIDATE_PAYMENT_HISTORY = 'compensation/VALIDATE_PAYMENT_HISTORY'
export const VALIDATE_PAYMENT_HISTORY_SUCCESS = 'compensation/VALIDATE_PAYMENT_HISTORY_SUCCESS'
export const VALIDATE_PAYMENT_HISTORY_ERROR = 'compensation/VALIDATE_PAYMENT_HISTORY_ERROR'
export const VALIDATE_PAYMENT_HISTORY_FAILURE = 'compensation/VALIDATE_PAYMENT_HISTORY_FAILURE'

export const ON_START_VALIDATE_PAYD_SERVICE_ENABLED = 'compensation/ON_START_VALIDATE_PAYD_SERVICE_ENABLED'
export const ON_START_VALIDATE_PAYD_SERVICE_ENABLED_SUCCESS = 'compensation/ON_START_VALIDATE_PAYD_SERVICE_ENABLED_SUCCESS'
export const ON_START_VALIDATE_PAYD_SERVICE_ENABLED_ERROR = 'compensation/ON_START_VALIDATE_PAYD_SERVICE_ENABLED_ERROR'
export const ON_START_VALIDATE_PAYD_SERVICE_ENABLED_FAILURE = 'compensation/ON_START_VALIDATE_PAYD_SERVICE_ENABLED_FAILURE'

export const ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE = 'compensation/ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE'
export const ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE_SUCCESS = 'compensation/ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE_SUCCESS'
export const ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE_ERROR = 'compensation/ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE_ERROR'
export const ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE_FAILURE = 'compensation/ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE_FAILURE'

export const VALIDATE_PAYD_POST_LIMIT = 'compensation/VALIDATE_PAYD_POST_LIMIT'
export const VALIDATE_PAYD_POST_LIMIT_SUCCESS = 'compensation/VALIDATE_PAYD_POST_LIMIT_SUCCESS'
export const VALIDATE_PAYD_POST_LIMIT_ERROR = 'compensation/VALIDATE_PAYD_POST_LIMIT_ERROR'
export const VALIDATE_PAYD_POST_LIMIT_FAILURE = 'compensation/VALIDATE_PAYD_POST_LIMIT_FAILURE'

export const VALIDATE_COST_HISTORY = 'compensation/VALIDATE_COST_HISTORY'
export const VALIDATE_COST_HISTORY_SUCCESS = 'compensation/VALIDATE_COST_HISTORY_SUCCESS'
export const VALIDATE_COST_HISTORY_ERROR = 'compensation/VALIDATE_COST_HISTORY_ERROR'
export const VALIDATE_COST_HISTORY_FAILURE = 'compensation/VALIDATE_COST_HISTORY_FAILURE'

export const GET_COMPENSTAION_FORM = 'compensation/GET_COMPENSTAION_FORM'
export const GET_COMPENSTAION_FORM_SUCCESS = 'compensation/GET_COMPENSTAION_FORM_SUCCESS'
export const GET_COMPENSTAION_FORM_ERROR = 'compensation/GET_COMPENSTAION_FORM_ERROR'
export const GET_COMPENSTAION_FORM_WARNING = 'compensation/GET_COMPENSTAION_FORM_ERROR'
export const GET_COMPENSTAION_FORM_FAILURE = 'compensation/GET_COMPENSTAION_FORM_FAILURE'

export const FETCH_PAYMENTS_COMPENSATION_HISTORY = 'compensations/FETCH_PAYMENTS_COMPENSATION_HISTORY'
export const FETCH_PAYMENTS_COMPENSATION_HISTORY_SUCCESS = 'compensations/FETCH_PAYMENTS_COMPENSATION_HISTORY_SUCCESS'
export const FETCH_PAYMENTS_COMPENSATION_HISTORY_ERROR = 'compensations/FETCH_PAYMENTS_COMPENSATION_HISTORY_ERROR'
export const FETCH_PAYMENTS_COMPENSATION_HISTORY_FAILURE = 'compensations/FETCH_PAYMENTS_COMPENSATION_HISTORY_FAILURE'

export const fetchPaydComments = createAction(FETCH_PAYD_COMMENTS)
export const validatePaymentHistory = createAction(VALIDATE_PAYMENT_HISTORY)
export const ValidateCostHistory = createAction(VALIDATE_COST_HISTORY)
export const onStartValidatePaydServiceEnabled = createAction(ON_START_VALIDATE_PAYD_SERVICE_ENABLED)
export const onStartValidatePaydServiceAvailable = createAction(ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE)
export const validatePaydPostLimit = createAction(VALIDATE_PAYD_POST_LIMIT)
export const getCompensationForm = createAction(GET_COMPENSTAION_FORM)
export const fetchPaymentCompensationHistory = createAction(FETCH_PAYMENTS_COMPENSATION_HISTORY)

const emptyError = {
  data: '',
  createdOn: null,
  shouldDisable: false
}

const initialState = {
  comments: {
    data: [],
    isLoading: false,
    error: emptyError
  },

  // paymentCostHistory - объект проверки двух методов
  paymentCostHistory: {
    isLoadingPayment: false,
    isLoadingCost: false,
    errorPayment: emptyError,
    errorCost: emptyError,
    error: emptyError
  },

  startPaydServiceEnabled: {
    isLoading: false,
    error: emptyError
  },

  startPaydServiceAvailable: {
    isLoading: false,
    error: emptyError
  },

  validatePaydPostLimit: {
    data: {},
    isLoading: false,
    error: emptyError
  },

  compensationForm: {
    data: [],
    isLoading: false,
    error: emptyError
  },

  paymentsCompenstationHistory: {
    history: [],
    isLoading: false,
    isError: false
  }
}

export default handleActions({
  [FETCH_PAYD_COMMENTS]: produce((state, action) => {
    state.comments.isLoading = true
    state.comments.error = emptyError
  }),
  [FETCH_PAYD_COMMENTS_SUCCESS]: produce((state, { payload }) => {
    state.comments.data = payload.data
    state.comments.isLoading = false
    if (payload.error) state.comments.error = payload.error
  }),
  [combineActions(FETCH_PAYD_COMMENTS_ERROR, FETCH_PAYD_COMMENTS_FAILURE)]:
  produce((state, { payload }) => {
    state.comments.isLoading = false
    if (payload.error) state.comments.error = payload.error
  }),

  [VALIDATE_PAYMENT_HISTORY]: produce((state) => {
    state.paymentCostHistory.isLoadingPayment = true
    state.paymentCostHistory.errorPayment = emptyError
    state.paymentCostHistory.error = emptyError
  }),
  [combineActions(VALIDATE_PAYMENT_HISTORY_SUCCESS, VALIDATE_PAYMENT_HISTORY_ERROR, VALIDATE_PAYMENT_HISTORY_FAILURE)]:
  produce((state, { payload }) => {
    state.paymentCostHistory.isLoadingPayment = false
    if (payload.errorPayment) state.paymentCostHistory.errorPayment = payload.errorPayment
    if (payload.error) state.paymentCostHistory.error = payload.error
  }),

  [VALIDATE_COST_HISTORY]: produce((state) => {
    state.paymentCostHistory.isLoadingCost = true
    state.paymentCostHistory.errorCost = emptyError
    state.paymentCostHistory.error = emptyError
  }),
  [combineActions(VALIDATE_COST_HISTORY_SUCCESS, VALIDATE_COST_HISTORY_ERROR, VALIDATE_COST_HISTORY_FAILURE)]:
  produce((state, { payload }) => {
    state.paymentCostHistory.isLoadingCost = false
    if (payload.errorCost) state.paymentCostHistory.errorCost = payload.errorCost
    if (payload.error) state.paymentCostHistory.error = payload.error
  }),

  [ON_START_VALIDATE_PAYD_SERVICE_ENABLED]: produce((state, action) => {
    state.startPaydServiceEnabled.isLoading = true
    state.startPaydServiceEnabled.error = emptyError
  }),
  [ON_START_VALIDATE_PAYD_SERVICE_ENABLED_SUCCESS]: produce((state, { payload }) => {
    state.startPaydServiceEnabled.data = payload.data
    state.startPaydServiceEnabled.isLoading = false
    if (payload.error) state.startPaydServiceEnabled.error = payload.error
  }),
  [combineActions(ON_START_VALIDATE_PAYD_SERVICE_ENABLED_ERROR, ON_START_VALIDATE_PAYD_SERVICE_ENABLED_FAILURE)]:
  produce((state, { payload }) => {
    state.startPaydServiceEnabled.isLoading = false
    if (payload.error) state.startPaydServiceEnabled.error = payload.error
  }),

  [ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE]: produce((state, action) => {
    state.startPaydServiceAvailable.isLoading = true
    state.startPaydServiceAvailable.error = emptyError
  }),
  [ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE_SUCCESS]: produce((state, { payload }) => {
    state.startPaydServiceAvailable.isLoading = false
    if (payload.error) state.startPaydServiceAvailable.error = payload.error
  }),
  [combineActions(ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE_ERROR, ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE_FAILURE)]:
  produce((state, { payload }) => {
    state.startPaydServiceAvailable.isLoading = false
    if (payload.error) state.startPaydServiceAvailable.error = payload.error
  }),

  [VALIDATE_PAYD_POST_LIMIT]: produce(state => {
    state.validatePaydPostLimit.isLoading = true
    state.validatePaydPostLimit.error = emptyError
  }),
  [VALIDATE_PAYD_POST_LIMIT_SUCCESS]: produce((state, { payload }) => {
    state.validatePaydPostLimit.data = payload
    state.validatePaydPostLimit.isLoading = false
  }),
  [combineActions(VALIDATE_PAYD_POST_LIMIT_ERROR, VALIDATE_PAYD_POST_LIMIT_FAILURE)]: produce((state, { payload }) => {
    state.validatePaydPostLimit.isLoading = false
    if (payload.error) state.validatePaydPostLimit.error = payload.error
  }),

  [GET_COMPENSTAION_FORM]: produce((state) => {
    state.compensationForm.isLoading = true
  }),
  [GET_COMPENSTAION_FORM_WARNING]: produce((state, { payload }) => {
    state.compensationForm.error = payload.error
  }),
  [combineActions(GET_COMPENSTAION_FORM_SUCCESS, GET_COMPENSTAION_FORM_ERROR, GET_COMPENSTAION_FORM_FAILURE)]:
  produce((state) => {
    state.compensationForm.isLoading = false
  }),

  // Payments compensation history
  [FETCH_PAYMENTS_COMPENSATION_HISTORY]: produce((state) => {
    state.paymentsCompenstationHistory.isLoading = true
  }),
  [FETCH_PAYMENTS_COMPENSATION_HISTORY_SUCCESS]: produce((state, { payload }) => {
    state.paymentsCompenstationHistory.history = payload
    state.paymentsCompenstationHistory.isLoading = false
  }),
  [combineActions(FETCH_PAYMENTS_COMPENSATION_HISTORY_ERROR, FETCH_PAYMENTS_COMPENSATION_HISTORY_FAILURE)]:
  produce((state) => {
    state.paymentsCompenstationHistory.isLoading = false
    state.paymentsCompenstationHistory.isError = true
  })
}, initialState)
