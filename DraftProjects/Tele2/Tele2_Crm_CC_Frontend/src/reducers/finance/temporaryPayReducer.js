import { createAction, handleActions } from 'redux-actions'

export const GET_TEMPORARY_PAY_NEW_FETCH = 'temporaryPay/GET_TEMPORARY_PAY_NEW_FETCH'
export const GET_TEMPORARY_PAY_NEW_FETCH_SUCCESS = 'temporaryPay/GET_TEMPORARY_PAY_NEW_FETCH_SUCCESS'
export const GET_TEMPORARY_PAY_NEW_FETCH_ERROR = 'temporaryPay/GET_TEMPORARY_PAY_NEW_FETCH_ERROR'
export const GET_TEMPORARY_PAY_NEW_FETCH_FAILURE = 'temporaryPay/GET_TEMPORARY_PAY_NEW_FETCH_FAILURE'

export const ADD_PAYMENT_FETCH = 'temporaryPay/ADD_PAYMENT_FETCH'
export const ADD_PAYMENT_FETCH_SUCCESS = 'temporaryPay/ADD_PAYMENT_FETCH_SUCCESS'
export const ADD_PAYMENT_FETCH_ERROR = 'temporaryPay/ADD_PAYMENT_FETCH_ERROR'
export const ADD_PAYMENT_FETCH_FAILURE = 'temporaryPay/ADD_PAYMENT_FETCH_FAILURE'

export const SET_TP_NEW_VISIBLE = 'temporaryPay/SET_TP_NEW_VISIBLE'

export const getTemporaryPayNew = createAction(GET_TEMPORARY_PAY_NEW_FETCH)
export const addPayment = createAction(ADD_PAYMENT_FETCH)
export const setTpNewVisible = createAction(SET_TP_NEW_VISIBLE)

const initialState = {
  temporaryPayNew: null,
  isTemporaryPayNewLoading: false,
  isTemporaryPayNewError: false,

  addPayment: null,
  isAddingPaymentLoading: false,
  isAddingPaymentError: false,

  isTpNewVisible: false
}

export default handleActions({
  [SET_TP_NEW_VISIBLE]: (state) => ({
    ...state,
    temporaryPayNew: null,
    isTemporaryPayNewLoading: false,
    isTemporaryPayNewError: false,
    isTpNewVisible: !state.isTpNewVisible
  }),
  // Get temporary payment new
  [GET_TEMPORARY_PAY_NEW_FETCH]: (state) => ({
    ...state,
    temporaryPayNew: null,
    isTemporaryPayNewLoading: true,
    isTemporaryPayNewError: false
  }),
  [GET_TEMPORARY_PAY_NEW_FETCH_SUCCESS]: (state, { payload: { Data } }) => ({
    ...state,
    temporaryPayNew: Data,
    isTemporaryPayNewLoading: false,
    isTemporaryPayNewError: false
  }),
  [GET_TEMPORARY_PAY_NEW_FETCH_ERROR]: (state, { payload: { MessageText } }) => ({
    ...state,
    temporaryPayNew: null,
    isTemporaryPayNewLoading: false,
    isTemporaryPayNewError: MessageText
  }),
  [GET_TEMPORARY_PAY_NEW_FETCH_FAILURE]: (state) => ({
    ...state,
    temporaryPayNew: null,
    isTemporaryPayNewLoading: false,
    isTemporaryPayNewError: 'При получении данных о временном платеже произошла ошибка'
  }),
  // Add payment
  [ADD_PAYMENT_FETCH]: (state) => ({
    ...state,
    isAddingPaymentLoading: true
  }),
  [ADD_PAYMENT_FETCH_SUCCESS]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    addPayment: Data,
    isAddingPaymentLoading: false,
    isAddingPaymentError: null
  }),
  [ADD_PAYMENT_FETCH_ERROR]: (state, { payload: { IsSuccess, MessageText, ErrorCode } }) => ({
    ...state,
    addPayment: null,
    isAddingPaymentLoading: false,
    isAddingPaymentError: MessageText
  }),
  [ADD_PAYMENT_FETCH_FAILURE]: (state) => ({
    ...state,
    addPayment: null,
    isAddingPaymentLoading: false,
    isAddingPaymentError: 'При получении данных о временном платеже произошла ошибка'
  })
}, initialState)
