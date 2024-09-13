import { createAction, handleActions } from 'redux-actions'

export const GET_SMS_TEMPLATES_FETCH = 'sms/GET_SMS_TEMPLATES_FETCH'
export const GET_SMS_TEMPLATES_FETCH_SUCCESS = 'sms/GET_SMS_TEMPLATES_FETCH_SUCCESS'
export const GET_SMS_TEMPLATES_FETCH_ERROR = 'sms/GET_SMS_TEMPLATES_FETCH_ERROR'
export const GET_SMS_TEMPLATES_FETCH_FAILURE = 'sms/GET_SMS_TEMPLATES_FETCH_FAILURE'

export const getSmsTemplates = createAction(GET_SMS_TEMPLATES_FETCH)

const initialState = {
  smsTemplates: null,
  isSmsTemplatesLoading: false,
  smsTemplatesError: null
}

export default handleActions({
  [GET_SMS_TEMPLATES_FETCH]: (state) => ({
    ...state,
    isSmsTemplatesLoading: true
  }),
  [GET_SMS_TEMPLATES_FETCH_SUCCESS]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    smsTemplates: Data,
    isSmsTemplatesLoading: false,
    smsTemplatesError: null
  }),
  [GET_SMS_TEMPLATES_FETCH_ERROR]: (state, { payload: { ErrorCode, ErrorStackTrace, IsSuccess, MessageText } }) => ({
    ...state,
    smsTemplates: null,
    isSmsTemplatesLoading: false,
    smsTemplatesError: MessageText
  }),
  [GET_SMS_TEMPLATES_FETCH_FAILURE]: (state) => ({
    ...state,
    smsTemplates: null,
    isSmsHistoryLoading: false,
    smsTemplatesError: 'При получении истории СМС произошла ошибка'
  })
}, initialState)
