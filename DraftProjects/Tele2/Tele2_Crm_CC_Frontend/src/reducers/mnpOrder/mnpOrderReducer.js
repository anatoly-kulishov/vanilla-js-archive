import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_MNP_ORDER = 'mnpOrder/FETCH_MNP_ORDER'
export const FETCH_MNP_ORDER_SUCCESS = 'mnpOrder/FETCH_MNP_ORDER_SUCCESS'
export const FETCH_MNP_ORDER_ERROR = 'mnpOrder/FETCH_MNP_ORDER_ERROR'
export const FETCH_MNP_ORDER_FAILURE = 'mnpOrder/FETCH_MNP_ORDER_FAILURE'

export const APPROVE_ORDER = 'mnpOrder/APPROVE_ORDER'
export const APPROVE_ORDER_SUCCESS = 'mnpOrder/APPROVE_ORDER_SUCCESS'
export const APPROVE_ORDER_ERROR = 'mnpOrder/APPROVE_ORDER_ERROR'
export const APPROVE_ORDER_FAILURE = 'mnpOrder/APPROVE_ORDER_FAILURE'

export const REJECT_ORDER = 'mnpOrder/REJECT_ORDER'
export const REJECT_ORDER_SUCCESS = 'mnpOrder/REJECT_ORDER_SUCCESS'
export const REJECT_ORDER_ERROR = 'mnpOrder/REJECT_ORDER_ERROR'
export const REJECT_ORDER_FAILURE = 'mnpOrder/REJECT_ORDER_FAILURE'

export const fetchMnpOrder = createAction(FETCH_MNP_ORDER)
export const approveOrder = createAction(APPROVE_ORDER)
export const rejectOrder = createAction(REJECT_ORDER)

const initialState = {
  mnpOrder: null,
  isMnpOrderLoading: false,
  mnpOrderError: '',

  isApproveOrderLoading: false,
  approveOrderError: '',

  isRejectOrderLoading: false,
  rejectOrderError: ''
}

export default handleActions(
  {
    [FETCH_MNP_ORDER]: produce((state) => {
      state.isMnpOrderLoading = true
    }),

    [FETCH_MNP_ORDER_SUCCESS]: produce((state, { payload }) => {
      state.mnpOrder = payload
      state.isMnpOrderLoading = false
    }),

    [combineActions(FETCH_MNP_ORDER_ERROR, FETCH_MNP_ORDER_FAILURE)]: produce((state, { payload }) => {
      state.mnpOrderError = payload
      state.isMnpOrderLoading = false
    }),

    [APPROVE_ORDER]: produce((state) => {
      state.isApproveOrderLoading = true
    }),

    [APPROVE_ORDER_SUCCESS]: produce((state) => {
      state.isApproveOrderLoading = false
    }),

    [combineActions(APPROVE_ORDER_ERROR, APPROVE_ORDER_FAILURE)]: produce((state, { payload }) => {
      state.approveOrderError = payload
      state.isApproveOrderLoading = false
    }),

    [REJECT_ORDER]: produce((state) => {
      state.isRejectOrderLoading = true
    }),

    [REJECT_ORDER_SUCCESS]: produce((state) => {
      state.isRejectOrderLoading = false
    }),

    [combineActions(REJECT_ORDER_ERROR, REJECT_ORDER_FAILURE)]: produce((state, { payload }) => {
      state.rejectOrderError = payload
      state.isRejectOrderLoading = false
    })
  },
  initialState
)
