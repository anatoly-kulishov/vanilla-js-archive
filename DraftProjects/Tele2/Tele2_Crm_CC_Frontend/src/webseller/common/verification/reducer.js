import { produce } from 'immer'
import { createAction, handleActions } from 'redux-actions'

export const REQUEST_SMS_CODE = 'verification/REQUEST_SMS_CODE'
export const REQUEST_SMS_CODE_SUCCESS = 'verification/REQUEST_SMS_CODE_SUCCESS'
export const REQUEST_SMS_CODE_ERROR = 'verification/REQUEST_SMS_CODE_ERROR'
export const REQUEST_SMS_CODE_FAILURE = 'verification/REQUEST_SMS_CODE_FAILURE'

export const UPDATE_WAITING_TIME_REFRESH_CODE = 'verification/UPDATE_WAITING_TIME_REFRESH_CODE'
export const CANCEL_UPDATE_WAITING_TIME_REFRESH_CODE = 'verification/CANCEL_UPDATE_WAITING_TIME_REFRESH_CODE'

export const VERIFY_SMS_CODE = 'verification/VERIFY_SMS_CODE'
export const VERIFY_SMS_CODE_SUCCESS = 'verification/VERIFY_SMS_CODE_SUCCESS'
export const VERIFY_SMS_CODE_ERROR = 'verification/VERIFY_SMS_CODE_ERROR'

export const RESET_VERIFICATION = 'verification/RESET_VERIFICATION'

const initialState = {
  isLoadingRequestSmsCode: false,
  isLoadingVerifySmsCode: false,
  waitingTimeRefreshSmsCode: 0
}

export const requestSmsCode = createAction(REQUEST_SMS_CODE)
export const requestSmsCodeSuccess = createAction(REQUEST_SMS_CODE_SUCCESS)
export const requestSmsCodeError = createAction(REQUEST_SMS_CODE_ERROR)
export const requestSmsCodeFailure = createAction(REQUEST_SMS_CODE_FAILURE)

export const updateWaitingTimeRefreshCode = createAction(UPDATE_WAITING_TIME_REFRESH_CODE)
export const cancelUpdateWaitingTimeRefreshCode = createAction(CANCEL_UPDATE_WAITING_TIME_REFRESH_CODE)

export const verifySmsCode = createAction(VERIFY_SMS_CODE)
export const verifySmsCodeSuccess = createAction(VERIFY_SMS_CODE_SUCCESS)
export const verifySmsCodeError = createAction(VERIFY_SMS_CODE_ERROR)

export const resetVerification = createAction(RESET_VERIFICATION)

export default handleActions(
  {
    [REQUEST_SMS_CODE]: produce(state => {
      state.isLoadingRequestSmsCode = true
    }),
    [REQUEST_SMS_CODE_SUCCESS]: produce((state, { payload }) => {
      state.isLoadingRequestSmsCode = false
      state.waitingTimeRefreshSmsCode = payload || 0
    }),
    [REQUEST_SMS_CODE_ERROR]: produce((state, { payload }) => {
      state.isLoadingRequestSmsCode = false
      state.waitingTimeRefreshSmsCode = payload || 0
    }),
    [REQUEST_SMS_CODE_FAILURE]: produce(state => {
      state.isLoadingRequestSmsCode = false
    }),

    [UPDATE_WAITING_TIME_REFRESH_CODE]: produce((state, { payload }) => {
      state.waitingTimeRefreshSmsCode = payload
    }),

    [VERIFY_SMS_CODE]: produce(state => {
      state.isLoadingVerifySmsCode = true
    }),
    [VERIFY_SMS_CODE_SUCCESS]: produce(state => {
      state.isLoadingVerifySmsCode = false
    }),
    [VERIFY_SMS_CODE_ERROR]: produce(state => {
      state.isLoadingVerifySmsCode = false
    }),

    [RESET_VERIFICATION]: () => initialState
  },
  initialState
)
