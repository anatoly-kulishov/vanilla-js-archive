import { createAction, handleActions } from 'redux-actions'

export const SEND_SMS_FETCH = 'subscription/SEND_SMS_FETCH'
export const SEND_SMS_FETCH_SUCCESS = 'subscription/SEND_SMS_FETCH_SUCCESS'
export const SEND_SMS_FETCH_ERROR = 'subscription/SEND_SMS_FETCH_ERROR'
export const SEND_SMS_FETCH_FAILURE = 'subscription/SEND_SMS_FETCH_FAILURE'

const initalState = {
  sendSms: null,
  sendSmsError: null,
  isSendSmsLoading: false
}

export const sendSubscriptionSms = createAction(SEND_SMS_FETCH)

export default handleActions({
  [SEND_SMS_FETCH]: (state) => ({
    ...state,
    sendSms: null,
    sendSmsError: false,
    isSendSmsLoading: true
  }),

  [SEND_SMS_FETCH_SUCCESS]: (
    state, { payload: { isSuccess, data, messageText } }) => ({
    ...state,
    sendSms: data,
    isSendSmsLoading: false,
    sendSmsError: false
  }),

  [SEND_SMS_FETCH_ERROR]: (state, { payload: { isSuccess, data, messageText } }) => ({
    ...state,
    sendSms: data,
    isSendSmsLoading: false,
    sendSmsError: messageText
  }),

  [SEND_SMS_FETCH_FAILURE]: (state, message) => ({
    ...state,
    sendSms: {},
    isSendSmsLoading: false,
    sendSmsError: message
  })
}, initalState)
