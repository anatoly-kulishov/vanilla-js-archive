import {
  createAction,
  handleActions,
  combineActions
} from 'redux-actions'
import produce from 'immer'

export const FETCH_PAYMENTS_LIST = 'compensation/FETCH_PAYMENTS_LIST'
export const FETCH_PAYMENTS_LIST_SUCCESS = 'compensation/FETCH_PAYMENTS_LIST_SUCCESS'
export const FETCH_PAYMENTS_LIST_ERROR = 'compensation/FETCH_PAYMENTS_LIST_ERROR'
export const FETCH_PAYMENTS_LIST_FAILURE = 'compensation/FETCH_PAYMENTS_LIST_FAILURE'

export const ADJUST_PAYMENT = 'compensation/ADJUST_PAYMENT'
export const ADJUST_PAYMENT_SUCCESS = 'compensation/ADJUST_PAYMENT_SUCCESS'
export const ADJUST_PAYMENT_ERROR = 'compensation/ADJUST_PAYMENT_ERROR'
export const ADJUST_PAYMENT_FAILURE = 'compensation/ADJUST_PAYMENT_FAILURE'

export const FETCH_INVALID_SUBSCRIBER_INFO = 'compensation/FETCH_INVALID_SUBSCRIBER_INFO'
export const FETCH_INVALID_SUBSCRIBER_INFO_SUCCESS = 'compensation/FETCH_INVALID_SUBSCRIBER_INFO_SUCCESS'
export const FETCH_INVALID_SUBSCRIBER_INFO_ERROR = 'compensation/FETCH_INVALID_SUBSCRIBER_INFO_ERROR'
export const FETCH_INVALID_SUBSCRIBER_INFO_FAILURE = 'compensation/FETCH_INVALID_SUBSCRIBER_INFO_FAILURE'

export const FETCH_VALID_SUBSCRIBER_INFO = 'compensation/FETCH_VALID_SUBSCRIBER_INFO'
export const FETCH_VALID_SUBSCRIBER_INFO_SUCCESS = 'compensation/FETCH_VALID_SUBSCRIBER_INFO_SUCCESS'
export const FETCH_VALID_SUBSCRIBER_INFO_ERROR = 'compensation/FETCH_VALID_SUBSCRIBER_INFO_ERROR'
export const FETCH_VALID_SUBSCRIBER_INFO_FAILURE = 'compensation/FETCH_VALID_SUBSCRIBER_INFO_FAILURE'

export const FETCH_INVALID_SUBSCRIBER_BALANCE = 'compensation/FETCH_INVALID_SUBSCRIBER_BALANCE'
export const FETCH_INVALID_SUBSCRIBER_BALANCE_SUCCESS = 'compensation/FETCH_INVALID_SUBSCRIBER_BALANCE_SUCCESS'
export const FETCH_INVALID_SUBSCRIBER_BALANCE_ERROR = 'compensation/FETCH_INVALID_SUBSCRIBER_BALANCE_ERROR'
export const FETCH_INVALID_SUBSCRIBER_BALANCE_FAILURE = 'compensation/FETCH_INVALID_SUBSCRIBER_BALANCE_FAILURE'

export const FETCH_VALID_SUBSCRIBER_BALANCE = 'compensation/FETCH_VALID_SUBSCRIBER_BALANCE'
export const FETCH_VALID_SUBSCRIBER_BALANCE_SUCCESS = 'compensation/FETCH_VALID_SUBSCRIBER_BALANCE_SUCCESS'
export const FETCH_VALID_SUBSCRIBER_BALANCE_ERROR = 'compensation/FETCH_VALID_SUBSCRIBER_BALANCE_ERROR'
export const FETCH_VALID_SUBSCRIBER_BALANCE_FAILURE = 'compensation/FETCH_VALID_SUBSCRIBER_BALANCE_FAILURE'

const CLEAR_ADJUSTMENT_PAYMENT = 'CLEAR_ADJUSTMENT_PAYMENT'
const CLEAR_PAYMENTS_LIST = 'CLEAR_PAYMENTS_LIST'

const CLEAR_SUBSCRIBERS_COMPENSATIONS_ADJUSTMENT_DATA = 'CLEAR_SUBSCRIBERS_COMPENSATIONS_ADJUSTMENT_DATA'

export const fetchPaymentsList = createAction(FETCH_PAYMENTS_LIST)
export const adjustPayment = createAction(ADJUST_PAYMENT)
export const clearAdjustmentPayment = createAction(CLEAR_ADJUSTMENT_PAYMENT)
export const clearPaymentsList = createAction(CLEAR_PAYMENTS_LIST)

export const fetchInvalidSubscriberInfo = createAction(FETCH_INVALID_SUBSCRIBER_INFO)
export const fetchValidSubscriberInfo = createAction(FETCH_VALID_SUBSCRIBER_INFO)
export const fetchInvalidSubscriberBalance = createAction(FETCH_INVALID_SUBSCRIBER_BALANCE)
export const fetchValidSubscriberBalance = createAction(FETCH_VALID_SUBSCRIBER_BALANCE)
export const clearSubscribersCompensationsAdjustmentData = createAction(CLEAR_SUBSCRIBERS_COMPENSATIONS_ADJUSTMENT_DATA)

const initialState = {
  paymentsList: null,
  isPaymentsListLoading: false,
  isPaymentsListError: false,

  adjustmentPayment: null,
  isAdjustmentPaymentLoading: false,
  isAdjustmentPaymentError: false,

  invalidSubscriberInfo: null,
  isInvalidSubscriberInfoLoading: false,
  isInvalidSubscriberInfoError: false,

  validSubscriberInfo: null,
  isValidSubscriberInfoLoading: false,
  isValidSubscriberInfoError: false,

  invalidSubscriberBalance: null,
  isInvalidSubscriberBalanceLoading: false,
  isInvalidSubscriberBalanceError: false,

  validSubscriberBalance: null,
  isValidSubscriberBalanceLoading: false,
  isValidSubscriberBalanceError: false
}

export default handleActions({
  [FETCH_PAYMENTS_LIST]: produce((state) => {
    state.isPaymentsListLoading = true
    state.isPaymentsListError = false
  }),
  [FETCH_PAYMENTS_LIST_SUCCESS]: produce((state, { payload }) => {
    state.paymentsList = payload
    state.isPaymentsListLoading = false
    state.isPaymentsListError = false
  }),
  [combineActions(FETCH_PAYMENTS_LIST_ERROR, FETCH_PAYMENTS_LIST_FAILURE)]:
  produce((state, { payload }) => {
    state.isPaymentsListLoading = false
    if (payload?.error) state.isPaymentsListError = payload?.error
  }),

  [ADJUST_PAYMENT]: produce((state) => {
    state.isAdjustPaymentLoading = true
    state.isAdjustPaymentError = false
  }),
  [ADJUST_PAYMENT_SUCCESS]: produce((state, { payload }) => {
    state.adjustmentPayment = payload
    state.isAdjustPaymentLoading = false
    state.isAdjustPaymentError = false
  }),
  [combineActions(ADJUST_PAYMENT_ERROR, ADJUST_PAYMENT_FAILURE)]:
  produce((state, { payload }) => {
    state.isAdjustPaymentLoading = false
    if (payload?.error) state.isAdjustPaymentError = payload?.error
  }),

  [FETCH_INVALID_SUBSCRIBER_INFO]: produce((state) => {
    state.isInvalidSubscruberInfoLoading = true
    state.isInvalidSubscruberInfoError = false
  }),
  [FETCH_INVALID_SUBSCRIBER_INFO_SUCCESS]: produce((state, { payload }) => {
    state.invalidSubscriberInfo = payload
    state.isInvalidSubscruberInfoLoading = false
    state.isInvalidSubscruberInfoError = false
  }),
  [combineActions(FETCH_INVALID_SUBSCRIBER_INFO_ERROR, FETCH_INVALID_SUBSCRIBER_INFO_FAILURE)]:
  produce((state, { payload }) => {
    state.isInvalidSubscruberInfoLoading = false
    if (payload?.error) state.isInvalidSubscruberInfoError = payload?.error
  }),

  [FETCH_VALID_SUBSCRIBER_INFO]: produce((state) => {
    state.isValidSubscriberInfoLoading = true
    state.isValidSubscriberInfoError = false
  }),
  [FETCH_VALID_SUBSCRIBER_INFO_SUCCESS]: produce((state, { payload }) => {
    state.validSubscriberInfo = payload
    state.isValidSubscriberInfoLoading = false
    state.isValidSubscriberInfoError = false
  }),
  [combineActions(FETCH_VALID_SUBSCRIBER_INFO_ERROR, FETCH_VALID_SUBSCRIBER_INFO_FAILURE)]:
  produce((state, { payload }) => {
    state.isValidSubscriberInfoLoading = false
    if (payload?.error) state.isValidSubscriberInfoError = payload?.error
  }),

  [FETCH_INVALID_SUBSCRIBER_BALANCE]: produce((state) => {
    state.isInvalidSubscriberBalanceLoading = true
    state.isInvalidSubscriberBalanceError = false
  }),
  [FETCH_INVALID_SUBSCRIBER_BALANCE_SUCCESS]: produce((state, { payload }) => {
    state.invalidSubscriberBalance = payload
    state.isInvalidSubscriberBalanceLoading = false
    state.isInvalidSubscriberBalanceError = false
  }),
  [combineActions(FETCH_INVALID_SUBSCRIBER_BALANCE_ERROR, FETCH_INVALID_SUBSCRIBER_BALANCE_FAILURE)]:
  produce((state, { payload }) => {
    state.isInvalidSubscriberBalanceLoading = false
    if (payload?.error) state.isInvalidSubscriberBalanceError = payload?.error
  }),

  [FETCH_VALID_SUBSCRIBER_BALANCE]: produce((state) => {
    state.isValidSubscriberBalanceLoading = true
    state.isValidSubscriberBalanceError = false
  }),
  [FETCH_VALID_SUBSCRIBER_BALANCE_SUCCESS]: produce((state, { payload }) => {
    state.validSubscriberBalance = payload
    state.isValidSubscriberBalanceLoading = false
    state.isValidSubscriberBalanceError = false
  }),
  [combineActions(FETCH_VALID_SUBSCRIBER_BALANCE_ERROR, FETCH_VALID_SUBSCRIBER_BALANCE_FAILURE)]:
  produce((state, { payload }) => {
    state.isValidSubscriberBalanceLoading = false
    if (payload?.error) state.isValidSubscriberBalanceError = payload?.error
  }),

  [CLEAR_ADJUSTMENT_PAYMENT]: produce((state) => {
    state.adjustmentPayment = null
    state.isAdjustmentPaymentLoading = false
    state.isAdjustmentPaymentError = false
  }),
  [CLEAR_PAYMENTS_LIST]: produce(state => {
    state.paymentsList = null
  }),
  [CLEAR_SUBSCRIBERS_COMPENSATIONS_ADJUSTMENT_DATA]: produce((state) => {
    state.invalidSubscriberInfo = null
    state.isInvalidSubscriberInfoLoading = false
    state.isInvalidSubscriberInfoError = false
    state.validSubscriberInfo = null
    state.isValidSubscriberInfoLoading = false
    state.isValidSubscriberInfoError = false
    state.invalidSubscriberBalance = null
    state.isInvalidSubscriberBalanceLoading = false
    state.isInvalidSubscriberBalanceError = false
    state.validSubscriberBalance = null
    state.isValidSubscriberBalanceLoading = false
    state.isValidSubscriberBalanceError = false
  })
}, initialState)
