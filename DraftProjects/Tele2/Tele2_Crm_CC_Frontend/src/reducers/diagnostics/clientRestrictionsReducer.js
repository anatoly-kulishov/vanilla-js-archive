import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_CLIENT_RESTRICTIONS = 'diagnostics/FETCH_CLIENT_RESTRICTIONS'
export const FETCH_CLIENT_RESTRICTIONS_SUCCESS = 'diagnostics/FETCH_CLIENT_RESTRICTIONS_SUCCESS'
export const FETCH_CLIENT_RESTRICTIONS_ERROR = 'diagnostics/FETCH_CLIENT_RESTRICTIONS_ERROR'
export const FETCH_CLIENT_RESTRICTIONS_FAILURE = 'diagnostics/FETCH_CLIENT_RESTRICTIONS_FAILURE'

export const CHANGE_CLIENT_RESTRICTION = 'diagnostics/CHANGE_CLIENT_RESTRICTION'
export const CHANGE_CLIENT_RESTRICTION_SUCCESS = 'diagnostics/CHANGE_CLIENT_RESTRICTION_SUCCESS'
export const CHANGE_CLIENT_RESTRICTION_ERROR = 'diagnostics/CHANGE_CLIENT_RESTRICTION_ERROR'
export const CHANGE_CLIENT_RESTRICTION_FAILURE = 'diagnostics/CHANGE_CLIENT_RESTRICTION_FAILURE'

export const REMOVE_ALL_CLIENT_RESTRICTIONS = 'diagnostics/REMOVE_ALL_CLIENT_RESTRICTIONS'
export const REMOVE_ALL_CLIENT_RESTRICTIONS_SUCCESS = 'diagnostics/REMOVE_ALL_CLIENT_RESTRICTIONS_SUCCESS'
export const REMOVE_ALL_CLIENT_RESTRICTIONS_ERROR = 'diagnostics/REMOVE_ALL_CLIENT_RESTRICTIONS_ERROR'
export const REMOVE_ALL_CLIENT_RESTRICTIONS_FAILURE = 'diagnostics/REMOVE_ALL_CLIENT_RESTRICTIONS_FAILURE'

const initialState = {
  clientRestrictions: [],

  isClientRestrictionsLoading: false,

  isClientRestrictionsError: ''
}

export const fetchClientRestrictions = createAction(FETCH_CLIENT_RESTRICTIONS)
export const changeClientRestriction = createAction(CHANGE_CLIENT_RESTRICTION)
export const removeAllClientRestrictions = createAction(REMOVE_ALL_CLIENT_RESTRICTIONS)

export default handleActions(
  {
    [FETCH_CLIENT_RESTRICTIONS]: produce((state, action) => {
      state.isClientRestrictionsLoading = true
    }),

    [FETCH_CLIENT_RESTRICTIONS_SUCCESS]: produce((state, { payload }) => {
      state.clientRestrictions = payload
      state.isClientRestrictionsLoading = false
    }),

    [CHANGE_CLIENT_RESTRICTION]: produce((state, action) => {
      state.isClientRestrictionsLoading = true
    }),

    [CHANGE_CLIENT_RESTRICTION_SUCCESS]: produce((state, action) => {
      state.isClientRestrictionsLoading = false
    }),

    [REMOVE_ALL_CLIENT_RESTRICTIONS]: produce((state, action) => {
      state.isClientRestrictionsLoading = true
    }),

    [REMOVE_ALL_CLIENT_RESTRICTIONS_SUCCESS]: produce((state, action) => {
      state.isClientRestrictionsLoading = false
    }),

    // eslint-disable-next-line standard/computed-property-even-spacing
    [combineActions(
      FETCH_CLIENT_RESTRICTIONS_ERROR,
      FETCH_CLIENT_RESTRICTIONS_FAILURE,
      CHANGE_CLIENT_RESTRICTION_ERROR,
      CHANGE_CLIENT_RESTRICTION_FAILURE,
      REMOVE_ALL_CLIENT_RESTRICTIONS_ERROR,
      REMOVE_ALL_CLIENT_RESTRICTIONS_FAILURE
    )]: produce((state, { payload }) => {
      state.isClientRestrictionsError = payload
      state.isClientRestrictionsLoading = false
    })
  },
  initialState
)
