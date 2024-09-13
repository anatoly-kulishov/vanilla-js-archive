import { createAction, handleActions, combineActions } from 'redux-actions'

export const FETCH_MANUAL_SEARCH_GRID_DATA = 'manualSearch/FETCH_MANUAL_SEARCH_GRID_DATA'
export const FETCH_MANUAL_SEARCH_GRID_DATA_SUCCESS = 'manualSearch/FETCH_MANUAL_SEARCH_GRID_DATA_SUCCESS'
export const FETCH_MANUAL_SEARCH_GRID_DATA_ERROR = 'manualSearch/FETCH_MANUAL_SEARCH_GRID_DATA_ERROR'
export const FETCH_MANUAL_SEARCH_GRID_DATA_FAILURE = 'manualSearch/FETCH_MANUAL_SEARCH_GRID_DATA_FAILURE'

export const CLEAN_MANUAL_SEARCH_GRID_DATA = 'manualSearch/CLEAN_MANUAL_SEARCH_GRID_DATA'

const initialState = {
  manualSearchGrid: null,
  manualSearchGridError: null,
  isManualSearchGridLoading: false,

  manualSearchRegion: null,
  manualSearchRegionError: null,
  isManualSearchRegionLoading: false
}

export const fetchManualSearchGridData = createAction(FETCH_MANUAL_SEARCH_GRID_DATA)
export const cleanManualSearchGridData = createAction(CLEAN_MANUAL_SEARCH_GRID_DATA)

export default handleActions({
  [FETCH_MANUAL_SEARCH_GRID_DATA]: (state) => ({
    ...state,
    manualSearchGrid: null,
    manualSearchGridError: false,
    isManualSearchGridLoading: true
  }),
  [FETCH_MANUAL_SEARCH_GRID_DATA_SUCCESS]: (state, { payload: { Data } }) => ({
    ...state,
    manualSearchGrid: Data,
    manualSearchGridError: false,
    isManualSearchGridLoading: false
  }),
  [combineActions(FETCH_MANUAL_SEARCH_GRID_DATA_ERROR, FETCH_MANUAL_SEARCH_GRID_DATA_FAILURE)]:
  (state) => ({
    ...state,
    manualSearchGridError: true,
    isManualSearchGridLoading: false
  }),
  [CLEAN_MANUAL_SEARCH_GRID_DATA]: (state) => ({
    ...state,
    manualSearchGrid: null
  })
}, initialState)
