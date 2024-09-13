import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'
import { wsStatus } from 'constants/wsStatus'

export const RC_SEARCH_CONNECT = 'rcsearch/RC_SEARCH_CONNECT'
export const RC_SEARCH_CONNECT_SUCCESS = 'rcsearch/RC_SEARCH_CONNECT_SUCCESS'
export const RC_SEARCH_CONNECT_ERROR = 'rcsearch/RC_SEARCH_CONNECT_ERROR'

export const RC_SEARCH_DISCONNECT = 'rcsearch/RC_SEARCH_DISCONNECT'
export const RC_SEARCH_DISCONNECT_SUCCESS = 'rcsearch/RC_SEARCH_DISCONNECT_SUCCESS'

export const RC_SEARCH_DATA_RECEIVED = 'rcsearch/RC_SEARCH_DATA_RECEIVED'
export const RC_SEARCH_DATA_SEND = 'rcsearch/RC_SEARCH_DATA_SEND'

const initalState = {
  searchData: [],
  wsStatus: wsStatus.connecting
}

export const rcSearchConnect = createAction(RC_SEARCH_CONNECT)
export const rcSearchSend = createAction(RC_SEARCH_DATA_SEND)

export default handleActions(
  {
    [combineActions(RC_SEARCH_CONNECT_ERROR, RC_SEARCH_CONNECT)]: produce((state) => {
      state.wsStatus = wsStatus.connecting
    }),
    [RC_SEARCH_CONNECT_SUCCESS]: produce((state) => {
      state.wsStatus = wsStatus.open
    }),
    [RC_SEARCH_DISCONNECT]: produce(state => {
      state.wsStatus = wsStatus.closing
    }),
    [RC_SEARCH_DISCONNECT_SUCCESS]: produce((state) => {
      state.wsStatus = wsStatus.closed
    }),
    [RC_SEARCH_DATA_RECEIVED]: produce((state, { payload }) => {
      state.searchData = payload
    })
  },
  initalState
)
