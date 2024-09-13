import { createAction, handleActions } from 'redux-actions'

export const FETCH_WG_HISTORY = 'interactions/FETCH_WG_HISTORY'
export const FETCH_WG_HISTORY_SUCCESS = 'interactions/FETCH_WG_HISTORY_SUCCESS'
export const FETCH_WG_HISTORY_ERROR = 'interactions/FETCH_WG_HISTORY_ERROR'
export const FETCH_WG_HISTORY_FAILURE = 'interactions/FETCH_WG_HISTORY_FAILURE'

export const fetchWgHistory = createAction(FETCH_WG_HISTORY)

const initialState = {
  wgHistory: null,
  wgHistoryLoading: false,
  wgHistoryError: null
}

export default handleActions({
  [FETCH_WG_HISTORY]: (state) => ({
    ...state,
    wgHistoryLoading: true
  }),
  [FETCH_WG_HISTORY_SUCCESS]: (state, { payload: { history } }) => ({
    ...state,
    wgHistory: history,
    wgHistoryLoading: false,
    wgHistoryError: null
  }),
  [FETCH_WG_HISTORY_ERROR]: (state, { payload: { IsSuccess, MessageText, ErrorCode } }) => ({
    ...state,
    wgHistory: null,
    wgHistoryLoading: false,
    wgHistoryError: MessageText
  }),
  [FETCH_WG_HISTORY_FAILURE]: (state) => ({
    ...state,
    wgHistory: null,
    wgHistoryLoading: false,
    wgHistoryError: 'При загрузке истории обращений произошла ошибка'
  })
}, initialState)
