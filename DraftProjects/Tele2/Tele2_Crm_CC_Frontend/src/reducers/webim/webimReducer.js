import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_WEBIM_HASH = 'webim/FETCH_WEBIM_HASH'
export const FETCH_WEBIM_HASH_SUCCESS = 'webim/FETCH_WEBIM_HASH_SUCCESS'
export const FETCH_WEBIM_HASH_ERROR = 'webim/FETCH_WEBIM_HASH_ERROR'
export const FETCH_WEBIM_HASH_FAILURE = 'webim/FETCH_WEBIM_HASH_FAILURE'

export const FETCH_WEBIM_DNS = 'webim/FETCH_WEBIM_DNS'
export const FETCH_WEBIM_DNS_SUCCESS = 'webim/FETCH_WEBIM_DNS_SUCCESS'
export const FETCH_WEBIM_DNS_ERROR = 'webim/FETCH_WEBIM_DNS_ERROR'
export const FETCH_WEBIM_DNS_FAILURE = 'webim/FETCH_WEBIM_DNS_FAILURE'

const initialState = {
  hash: null,
  id: null,
  isHashLoading: false,
  hashError: '',

  dns: null,
  isDnsLoading: false,
  dnsError: false
}

export const fetchWebimHash = createAction(FETCH_WEBIM_HASH)
export const fetchWebimDns = createAction(FETCH_WEBIM_DNS)

export default handleActions(
  {
    [FETCH_WEBIM_HASH]: produce((state) => {
      state.isHashLoading = true
      state.hashError = ''
    }),
    [FETCH_WEBIM_HASH_SUCCESS]: produce((state, { payload }) => {
      state.isHashLoading = false
      state.hash = payload.hash
      state.id = payload.id
    }),
    [combineActions(FETCH_WEBIM_HASH_ERROR, FETCH_WEBIM_HASH_FAILURE)]: produce((state, { payload }) => {
      state.isHashLoading = false
      state.hashError = payload
      state.hash = null
      state.id = null
    }),

    [FETCH_WEBIM_DNS]: produce((state) => {
      state.isDnsLoading = true
      state.dnsError = ''
    }),
    [FETCH_WEBIM_DNS_SUCCESS]: produce((state, { payload }) => {
      state.dns = payload.dns
      state.isDnsLoading = false
    }),
    [combineActions(FETCH_WEBIM_DNS_ERROR, FETCH_WEBIM_DNS_FAILURE)]: produce((state, { payload }) => {
      state.dns = null
      state.isDnsLoading = false
      state.dnsError = payload
    })
  },
  initialState
)
