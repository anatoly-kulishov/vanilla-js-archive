import { createAction, handleActions } from 'redux-actions'

export const GET_SMS_HISTORY_FETCH = 'sms/GET_SMS_HISTORY_FETCH'
export const GET_SMS_HISTORY_FETCH_SUCCESS = 'sms/GET_SMS_HISTORY_FETCH_SUCCESS'
export const GET_SMS_HISTORY_FETCH_ERROR = 'sms/GET_SMS_HISTORY_FETCH_ERROR'
export const GET_SMS_HISTORY_FETCH_FAILURE = 'sms/GET_SMS_HISTORY_FETCH_FAILURE'

export const getSmsHistory = createAction(GET_SMS_HISTORY_FETCH)

const initialState = {
  smsHistory: null,
  isSmsHistoryLoading: false,
  smsHistoryError: false
}

export default handleActions({
  [GET_SMS_HISTORY_FETCH]: (state) => ({
    ...state,
    isSmsHistoryLoading: true
  }),
  [GET_SMS_HISTORY_FETCH_SUCCESS]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    smsHistory: Data,
    isSmsHistoryLoading: false,
    smsHistoryError: null
  }),
  [GET_SMS_HISTORY_FETCH_ERROR]: (state, { payload: { IsSuccess, MessageText, ErrorCode } }) => ({
    ...state,
    smsHistory: null,
    isSmsHistoryLoading: false,
    smsHistoryError: MessageText
  }),
  [GET_SMS_HISTORY_FETCH_FAILURE]: (state) => ({
    ...state,
    smsHistory: null,
    isSmsHistoryLoading: false,
    smsHistoryError: 'При получении истории СМС произошла ошибка'
  })
}, initialState)
