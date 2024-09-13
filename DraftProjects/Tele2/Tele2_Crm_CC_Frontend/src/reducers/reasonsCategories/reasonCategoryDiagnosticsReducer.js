import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_LOCATION_HISTORY = 'diagnostics/FETCH_LOCATION_HISTORY'
export const FETCH_LOCATION_HISTORY_SUCCESS = 'diagnostics/FETCH_LOCATION_HISTORY_SUCCESS'
export const FETCH_LOCATION_HISTORY_ERROR = 'diagnostics/FETCH_LOCATION_HISTORY_ERROR'
export const FETCH_LOCATION_HISTORY_FAILURE = 'diagnostics/FETCH_LOCATION_HISTORY_FAILURE'

const initialState = {
  locationHistory: [],
  isLocationHistoryLoading: false,

  locationHistoryError: ''
}

export const fetchLocationHistory = createAction(FETCH_LOCATION_HISTORY)

export default handleActions(
  {
    [FETCH_LOCATION_HISTORY]: produce((state, action) => {
      state.isLocationHistoryLoading = true
    }),

    [FETCH_LOCATION_HISTORY_SUCCESS]: produce((state, { payload }) => {
      state.locationHistory = payload
      state.isLocationHistoryLoading = false
    }),

    [combineActions(FETCH_LOCATION_HISTORY_ERROR, FETCH_LOCATION_HISTORY_FAILURE)]:
    produce((state, { payload }) => {
      state.locationHistoryError = payload
      state.isLocationHistoryLoading = false
    })
  },
  initialState
)
