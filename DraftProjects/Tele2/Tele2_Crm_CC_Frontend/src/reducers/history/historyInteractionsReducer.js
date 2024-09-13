import { createAction, handleActions } from 'redux-actions'

export const HISTORY_INTERACTIONS_FETCH = 'interactions/HISTORY_INTERACTIONS_FETCH'
export const HISTORY_INTERACTIONS_FETCH_SUCCESS = 'interactions/HISTORY_INTERACTIONS_FETCH_SUCCESS'
export const HISTORY_INTERACTIONS_FETCH_ERROR = 'interactions/HISTORY_INTERACTIONS_FETCH_ERROR'
export const HISTORY_INTERACTIONS_FETCH_FAILURE = 'interactions/HISTORY_INTERACTIONS_FETCH_FAILURE'

export const fetchHistoryInteraction = createAction(HISTORY_INTERACTIONS_FETCH)

const initialState = {
  historyInteractions: null,
  historyInteractionsLoading: false,
  historyInteractionsError: null
}

export default handleActions({
  [HISTORY_INTERACTIONS_FETCH]: (state) => ({
    ...state,
    historyInteractionsLoading: true
  }),
  [HISTORY_INTERACTIONS_FETCH_SUCCESS]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    historyInteractions: Data,
    historyInteractionsLoading: false,
    historyInteractionsError: null
  }),
  [HISTORY_INTERACTIONS_FETCH_ERROR]: (state, { payload: { IsSuccess, MessageText, ErrorCode } }) => ({
    ...state,
    historyInteractions: null,
    historyInteractionsLoading: false,
    historyInteractionsError: MessageText
  }),
  [HISTORY_INTERACTIONS_FETCH_FAILURE]: (state) => ({
    ...state,
    historyInteractions: null,
    historyInteractionsLoading: false,
    historyInteractionsError: 'При загрузке истории обращений произошла ошибка'
  })
}, initialState)
