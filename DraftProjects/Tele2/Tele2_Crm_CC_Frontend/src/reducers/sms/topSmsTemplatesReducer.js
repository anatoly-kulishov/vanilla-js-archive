import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_TOP_SMS_TEMPLATES = 'sms/FETCH_TOP_SMS_TEMPLATES'
export const FETCH_TOP_SMS_TEMPLATES_SUCCESS = 'sms/FETCH_TOP_SMS_TEMPLATES_SUCCESS'
export const FETCH_TOP_SMS_TEMPLATES_ERROR = 'sms/FETCH_TOP_SMS_TEMPLATES_ERROR'
export const FETCH_TOP_SMS_TEMPLATES_FAILURE = 'sms/FETCH_TOP_SMS_TEMPLATES_FAILURE'

export const fetchTopSmsTemplates = createAction(FETCH_TOP_SMS_TEMPLATES)

const initialState = {
  topSmsTemplates: [],
  isTopSmsTemplatesLoading: false,
  topSmsTemplatesError: ''
}

export default handleActions({
  [FETCH_TOP_SMS_TEMPLATES]: produce((state, action) => {
    state.topSmsTemplatesError = ''
    state.isTopSmsTemplatesLoading = true
  }),

  [FETCH_TOP_SMS_TEMPLATES_SUCCESS]: produce((state, { payload }) => {
    state.topSmsTemplates = payload
    state.isTopSmsTemplatesLoading = false
  }),

  [combineActions(FETCH_TOP_SMS_TEMPLATES_FAILURE, FETCH_TOP_SMS_TEMPLATES_ERROR)]: produce((state, { payload }) => {
    state.topSmsTemplatesError = payload
    state.isTopSmsTemplatesLoading = false
  })
}, initialState)
