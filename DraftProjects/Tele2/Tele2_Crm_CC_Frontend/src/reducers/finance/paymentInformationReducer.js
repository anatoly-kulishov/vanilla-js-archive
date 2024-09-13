import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const GET_LAST_PAYMENT = 'compensation/GET_LAST_PAYMENT'
export const GET_LAST_PAYMENT_SUCCESS = 'compensation/GET_LAST_PAYMENT_SUCCESS'
export const GET_LAST_PAYMENT_ERROR = 'compensation/GET_LAST_PAYMENT_ERROR'
export const GET_LAST_PAYMENT_FAILURE = 'compensation/GET_LAST_PAYMENT_FAILURE'

export const DELETE_T2PAY_CARD = 'compensation/DELETE_T2PAY_CARD'
export const DELETE_T2PAY_CARD_SUCCESS = 'compensation/DELETE_T2PAY_CARD_SUCCESS'
export const DELETE_T2PAY_CARD_ERROR = 'compensation/DELETE_T2PAY_CARD_ERROR'
export const DELETE_T2PAY_CARD_FAILURE = 'compensation/DELETE_T2PAY_CARD_FAILURE'

export const getLastPayment = createAction(GET_LAST_PAYMENT)
export const deleteT2PayCard = createAction(DELETE_T2PAY_CARD)

const initialState = {
  lastPayment: null,
  isLoadingLastPayment: false,
  isErrorLastPayment: null,

  isLoadingDeleteT2PayCard: false,
  isErrorDeleteT2PayCard: false
}

export default handleActions({
  [GET_LAST_PAYMENT]: produce((state) => {
    state.isLoadingLastPayment = true
  }),
  [GET_LAST_PAYMENT_SUCCESS]: produce((state, { payload }) => {
    state.lastPayment = payload
    state.isLoadingLastPayment = false
  }),
  [combineActions(GET_LAST_PAYMENT_ERROR, GET_LAST_PAYMENT_FAILURE)]:
  produce((state, { payload }) => {
    state.isLoadingLastPayment = false
    state.isErrorLastPayment = payload
  }),

  [DELETE_T2PAY_CARD]: produce((state) => {
    state.isLoadingDeleteT2PayCard = true
  }),
  [DELETE_T2PAY_CARD_SUCCESS]: produce((state, { payload }) => {
    state.isLoadingDeleteT2PayCard = false
  }),
  [combineActions(DELETE_T2PAY_CARD_ERROR, DELETE_T2PAY_CARD_FAILURE)]:
  produce((state, { payload }) => {
    state.isLoadingDeleteT2PayCard = false
    state.isErrorDeleteT2PayCard = payload
  })
}, initialState)
