import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_BLACKLIST_INFO = 'mnp/FETCH_BLACKLIST_INFO'
export const FETCH_BLACKLIST_INFO_SUCCESS = 'mnp/FETCH_BLACKLIST_INFO_SUCCESS'
export const FETCH_BLACKLIST_INFO_ERROR = 'mnp/FETCH_BLACKLIST_INFO_ERROR'
export const FETCH_BLACKLIST_INFO_FAILURE = 'mnp/FETCH_BLACKLIST_INFO_FAILURE'

export const FETCH_WEBIM_BLACKLIST_INFO = 'mnp/FETCH_WEBIM_BLACKLIST_INFO'
export const FETCH_WEBIM_BLACKLIST_INFO_SUCCESS = 'mnp/FETCH_WEBIM_BLACKLIST_INFO_SUCCESS'
export const FETCH_WEBIM_BLACKLIST_INFO_ERROR = 'mnp/FETCH_WEBIM_BLACKLIST_INFO_ERROR'
export const FETCH_WEBIM_BLACKLIST_INFO_FAILURE = 'mnp/FETCH_WEBIM_BLACKLIST_INFO_FAILURE'

export const fetchBlacklistInfo = createAction(FETCH_BLACKLIST_INFO)
export const fetchWebimBlacklistInfo = createAction(FETCH_WEBIM_BLACKLIST_INFO)

const initialState = {
  blacklistInfo: null,
  isBlacklistInfoLoading: false,
  blacklistInfoError: '',

  webimBlacklistInfo: null,
  isWebimBlacklistInfoLoading: false,
  webimBlacklistInfoError: ''
}

export default handleActions(
  {
    [FETCH_BLACKLIST_INFO]: produce((state, action) => {
      state.isBlacklistInfoLoading = true
    }),

    [FETCH_BLACKLIST_INFO_SUCCESS]: produce((state, { payload }) => {
      state.blacklistInfo = payload
      state.isBlacklistInfoLoading = false
    }),

    [combineActions(FETCH_BLACKLIST_INFO_ERROR, FETCH_BLACKLIST_INFO_FAILURE)]: produce((state, { payload }) => {
      state.blacklistInfoError = payload
      state.isBlacklistInfoLoading = false
    }),

    [FETCH_WEBIM_BLACKLIST_INFO]: produce((state, action) => {
      state.isWebimBlacklistInfoLoading = true
    }),

    [FETCH_WEBIM_BLACKLIST_INFO_SUCCESS]: produce((state, { payload }) => {
      state.webimBlacklistInfo = payload
      state.isWebimBlacklistInfoLoading = false
    }),

    [combineActions(FETCH_WEBIM_BLACKLIST_INFO_ERROR, FETCH_WEBIM_BLACKLIST_INFO_FAILURE)]: produce((state, { payload }) => {
      state.webimBlacklistInfoError = payload
      state.isWebimBlacklistInfoLoading = false
    })
  },
  initialState
)
