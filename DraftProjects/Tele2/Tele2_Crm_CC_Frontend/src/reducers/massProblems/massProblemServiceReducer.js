import { createAction, handleActions, combineActions } from 'redux-actions'

export const REGIONS_FETCH = 'massProblemsService/REGIONS_FETCH'
export const REGIONS_FETCH_SUCCESS = 'massProblemsService/REGIONS_FETCH_SUCCESS'
export const REGIONS_FETCH_ERROR = 'massProblemsService/REGIONS_FETCH_ERROR'
export const REGIONS_FETCH_FAILURE = 'massProblemsService/REGIONS_FETCH_FAILURE'

const initalState = {
  regions: [],
  regionError: null,
  isRegionsLoading: false
}

export const fetchRegions = createAction(REGIONS_FETCH)

export default handleActions({
  [REGIONS_FETCH]: (state) => ({
    ...state,
    regions: [],
    regionError: null,
    isRegionsLoading: true
  }),

  [REGIONS_FETCH_SUCCESS]: (state, { payload: { regions } }) => ({
    ...state,
    regions,
    regionError: null,
    isRegionsLoading: false
  }),

  [combineActions(REGIONS_FETCH_ERROR, REGIONS_FETCH_FAILURE)]:
  (state, { payload: { error } }) => ({
    ...state,
    regions: [],
    regionError: error,
    isRegionsLoading: false
  })
}, initalState)
