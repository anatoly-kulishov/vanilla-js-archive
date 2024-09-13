import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_MNP_VERIFICATION = 'mnpVerification/FETCH_MNP_VERIFICATION'
export const FETCH_MNP_VERIFICATION_SUCCESS = 'mnpVerification/FETCH_MNP_VERIFICATION_SUCCESS'
export const FETCH_MNP_VERIFICATION_ERROR = 'mnpVerification/FETCH_MNP_VERIFICATION_ERROR'
export const FETCH_MNP_VERIFICATION_FAILURE = 'mnpVerification/FETCH_MNP_VERIFICATION_FAILURE'

export const fetchMnpVerification = createAction(FETCH_MNP_VERIFICATION)

const initialState = {
  mnpVerification: null,
  isMnpVerificationLoading: false,
  mnpVerificationError: ''
}

export default handleActions(
  {
    [FETCH_MNP_VERIFICATION]: produce((state) => {
      state.isMnpVerificationLoading = true
    }),

    [FETCH_MNP_VERIFICATION_SUCCESS]: produce((state, { payload }) => {
      state.mnpVerification = payload
      state.isMnpVerificationLoading = false
    }),

    [combineActions(FETCH_MNP_VERIFICATION_ERROR, FETCH_MNP_VERIFICATION_FAILURE)]: produce((state, { payload }) => {
      state.mnpVerificationError = payload
      state.isMnpVerificationLoading = false
    })
  },
  initialState
)
