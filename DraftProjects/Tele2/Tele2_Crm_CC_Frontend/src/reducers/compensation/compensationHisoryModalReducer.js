import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const VALIDATE_PAYD_SERVICE = 'compensation/VALIDATE_PAYD_SERVICE'
export const VALIDATE_PAYD_SERVICE_SUCCESS = 'compensation/VALIDATE_PAYD_SERVICE_SUCCESS'
export const VALIDATE_PAYD_SERVICE_ERROR = 'compensation/VALIDATE_PAYD_SERVICE_ERROR'
export const VALIDATE_PAYD_SERVICE_FAILURE = 'compensation/VALIDATE_PAYD_SERVICE_FAILURE'

export const validatePaydService = createAction(VALIDATE_PAYD_SERVICE)

const emptyError = {
  data: ''
}

const initialState = {
  paydService: {
    data: {},
    isLoading: false,
    error: emptyError
  }
}

export default handleActions({
  [VALIDATE_PAYD_SERVICE]: produce((state) => {
    state.paydService.isLoading = true
    state.paydService.error = emptyError
  }),
  [VALIDATE_PAYD_SERVICE_SUCCESS]: produce((state, { payload }) => {
    state.paydService.data = payload.data
    state.paydService.isLoading = false
    if (payload.error) state.paydService.error = payload.error
  }),
  [combineActions(VALIDATE_PAYD_SERVICE_ERROR, VALIDATE_PAYD_SERVICE_FAILURE)]:
  produce((state, { payload }) => {
    state.paydService.isLoading = false
    if (payload.error) state.paydService.error = payload.error
  })
}, initialState)
