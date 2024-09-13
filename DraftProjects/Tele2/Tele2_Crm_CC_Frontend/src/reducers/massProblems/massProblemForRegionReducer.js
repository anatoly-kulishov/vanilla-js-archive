import { createAction, handleActions, combineActions } from 'redux-actions'

export const REGION_PROBLEM_FETCH = 'massProblems/REGION_PROBLEM_FETCH'
export const REGION_PROBLEM_FETCH_SUCCESS = 'massProblems/REGION_PROBLEM_FETCH_SUCCESS'
export const REGION_PROBLEM_FETCH_ERROR = 'massProblems/REGION_PROBLEM_FETCH_ERROR'
export const REGION_PROBLEM_FETCH_FAILURE = 'massProblems/PROBLEMS_LIST_FETCH_FAILURE'

export const GET_SERVICE_CHANNEL_INTERFACES = 'massProblemsService/GET_SERVICE_CHANNEL_INTERFACES'
export const GET_SERVICE_CHANNEL_INTERFACES_SUCCESS = 'massProblemsService/GET_SERVICE_CHANNEL_INTERFACES_SUCCESS'
export const GET_SERVICE_CHANNEL_INTERFACES_ERROR = 'massProblemsService/GET_SERVICE_CHANNEL_INTERFACES_ERROR'
export const GET_SERVICE_CHANNEL_INTERFACES_FAILURE = 'massProblemsService/GET_SERVICE_CHANNEL_INTERFACES_FAILURE'

const initalState = {
  regionProblems: [],
  regionProblemsError: null,
  isRegionProblemsLoading: true,

  serviceChannelInterfaces: [],
  serviceChannelInterfacesError: null
}

export const fetchProblemsForRegion = createAction(REGION_PROBLEM_FETCH)
export const getServiceChannelInterfaces = createAction(GET_SERVICE_CHANNEL_INTERFACES)

export default handleActions({
  [REGION_PROBLEM_FETCH]: (state) => ({
    ...state,
    regionProblemsError: null,
    isRegionProblemsLoading: true
  }),

  [REGION_PROBLEM_FETCH_SUCCESS]: (state, { payload: { regionProblem } }) => ({
    ...state,
    regionProblems: regionProblem,
    regionProblemsError: null,
    isRegionProblemsLoading: false
  }),

  [combineActions(REGION_PROBLEM_FETCH_ERROR, REGION_PROBLEM_FETCH_FAILURE)]:
  (state, { payload: { error } }) => ({
    ...state,
    regionProblems: [],
    regionProblemsError: error,
    isRegionProblemsLoading: false
  }),

  [GET_SERVICE_CHANNEL_INTERFACES_SUCCESS]: (state, { payload: { serviceChanellInterfaces } }) => ({
    ...state,
    serviceChannelInterfaces: serviceChanellInterfaces,
    serviceChannelInterfacesError: null
  }),

  [combineActions(GET_SERVICE_CHANNEL_INTERFACES_ERROR, GET_SERVICE_CHANNEL_INTERFACES_FAILURE)]:
  (state, { payload: { error } }) => ({
    ...state,
    serviceChannelInterfaces: [],
    serviceChannelInterfacesError: error
  })
}, initalState)
