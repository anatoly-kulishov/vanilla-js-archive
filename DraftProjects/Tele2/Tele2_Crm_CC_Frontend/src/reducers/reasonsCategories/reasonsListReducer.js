import { createAction, handleActions, combineActions } from 'redux-actions'

export const REASONS_LIST_FETCH = 'reasons/REASONS_LIST_FETCH'
export const REASONS_LIST_FETCH_SUCCESS = 'reasons/REASONS_LIST_FETCH_SUCCESS'
export const REASONS_LIST_FETCH_ERROR = 'reasons/REASONS_LIST_FETCH_ERROR'
export const REASONS_LIST_FETCH_FAILURE = 'reasons/REASONS_LIST_FETCH_FAILURE'

export const FILTERED_REASONS_LIST_FETCH = 'reasons/FILTERED_REASONS_LIST_FETCH'
export const FILTERED_REASONS_LIST_FETCH_SUCCESS = 'reasons/FILTERED_REASONS_LIST_FETCH_SUCCESS'
export const FILTERED_REASONS_LIST_FETCH_ERROR = 'reasons/FILTERED_REASONS_LIST_FETCH_ERROR'
export const FILTERED_REASONS_LIST_FETCH_FAILURE = 'reasons/FILTERED_REASONS_LIST_FETCH_FAILURE'

export const CLIENT_CATEGORIES_FETCH = 'reasons/CLIENT_CATEGORIES_FETCH'
export const CLIENT_CATEGORIES_FETCH_SUCCESS = 'reasons/CLIENT_CATEGORIES_FETCH_SUCCESS'
export const CLIENT_CATEGORIES_FETCH_ERROR = 'reasons/CLIENT_CATEGORIES_FETCH_ERROR'
export const CLIENT_CATEGORIES_FETCH_FAILURE = 'reasons/CLIENT_CATEGORIES_FETCH_FAILURE'

export const CHANNELS_FETCH = 'reasons/CHANNELS_FETCH'
export const CHANNELS_FETCH_SUCCESS = 'reasons/CHANNELS_FETCH_SUCCESS'
export const CHANNELS_FETCH_ERROR = 'reasons/CHANNELS_FETCH_ERROR'
export const CHANNELS_FETCH_FAILURE = 'reasons/CHANNELS_FETCH_FAILURE'

export const SET_GLOBAL_PARAMS = 'reasons/SET_GLOBAL_PARAMS'

const initalState = {
  reasons: [],
  reasonsError: null,
  isReasonsLoading: true,
  filteredReasons: [],
  filteredReasonsError: null,
  isFilteredReasonsLoading: true,
  clientCategories: [],
  clientCategoriesError: null,
  isClientCategoriesLoading: true,
  channels: [],
  channelsError: null,
  isChannelsLoading: true,
  MinLength: 0,
  MaxLength: 0
}

export const fetchReasonsList = createAction(REASONS_LIST_FETCH)
export const fetchFilteredReasonsList = createAction(FILTERED_REASONS_LIST_FETCH)
export const fetchClientCategories = createAction(CLIENT_CATEGORIES_FETCH)
export const fetchChannels = createAction(CHANNELS_FETCH)

export default handleActions({
  [REASONS_LIST_FETCH]: (state) => ({
    ...state,
    reasonsError: null,
    isReasonsLoading: true
  }),

  [REASONS_LIST_FETCH_SUCCESS]: (state, { payload: { reasons } }) => ({
    ...state,
    reasons,
    filteredReasons: reasons,
    reasonsError: null,
    isReasonsLoading: false,
    filteredReasonsError: null,
    isFilteredReasonsLoading: false
  }),

  [combineActions(REASONS_LIST_FETCH_ERROR, REASONS_LIST_FETCH_FAILURE)]:
  (state, { payload: { error } }) => ({
    ...state,
    reasons: [],
    reasonsError: error,
    isReasonsLoading: false
  }),

  [FILTERED_REASONS_LIST_FETCH]: (state) => ({
    ...state,
    filteredReasonsError: null,
    isFilteredReasonsLoading: true
  }),

  [FILTERED_REASONS_LIST_FETCH_SUCCESS]: (state, { payload: { filteredReasons } }) => ({
    ...state,
    filteredReasons,
    filteredReasonsError: null,
    isFilteredReasonsLoading: false
  }),

  [combineActions(FILTERED_REASONS_LIST_FETCH_ERROR, FILTERED_REASONS_LIST_FETCH_FAILURE)]:
  (state, { payload: { error } }) => ({
    ...state,
    filteredReasons: [],
    filteredReasonsError: error,
    isFilteredReasonsLoading: false
  }),

  [CLIENT_CATEGORIES_FETCH]: (state) => ({
    ...state,
    clientCategoriesError: null,
    isClientCategoriesLoading: true
  }),

  [CLIENT_CATEGORIES_FETCH_SUCCESS]: (state, { payload: { clientCategories } }) => ({
    ...state,
    clientCategories,
    clientCategoriesError: null,
    isClientCategoriesLoading: false
  }),

  [combineActions(CLIENT_CATEGORIES_FETCH_ERROR, CLIENT_CATEGORIES_FETCH_FAILURE)]:
  (state, { payload: { error } }) => ({
    ...state,
    clientCategories: [],
    clientCategoriesError: error,
    isClientCategoriesLoading: false
  }),

  [CHANNELS_FETCH]: (state) => ({
    ...state,
    channelsError: null,
    isChannelsLoading: true
  }),

  [CHANNELS_FETCH_SUCCESS]: (state, { payload: { channels } }) => ({
    ...state,
    channels,
    channelsError: null,
    isChannelsLoading: false
  }),

  [combineActions(CHANNELS_FETCH_ERROR, CHANNELS_FETCH_FAILURE)]:
  (state, { payload: { error } }) => ({
    ...state,
    channels: [],
    channelsError: error,
    isChannelsLoading: false
  }),

  [SET_GLOBAL_PARAMS]: (state, { payload: { MinLength, MaxLength } }) => ({
    ...state,
    MinLength,
    MaxLength
  })
}, initalState)
