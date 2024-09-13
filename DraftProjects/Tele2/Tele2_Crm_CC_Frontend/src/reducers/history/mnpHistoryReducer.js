import { createAction, handleActions } from 'redux-actions'

export const FETCH_MNP_HISTORY = 'history/FETCH_MNP_HISTORY'
export const FETCH_MNP_HISTORY_SUCCESS = 'history/FETCH_MNP_HISTORY_SUCCESS'
export const FETCH_MNP_HISTORY_ERROR = 'history/FETCH_MNP_HISTORY_ERROR'
export const FETCH_MNP_HISTORY_FAILURE = 'history/FETCH_MNP_HISTORY_FAILURE'

export const fetchMnpHistory = createAction(FETCH_MNP_HISTORY)

const initialState = {
  mnpHistory: null,
  isMnpHistoryLoading: false,
  isMnpHistoryError: null
}

export default handleActions({
  [FETCH_MNP_HISTORY]: (state) => ({
    ...state,
    isMnpHistoryLoading: true
  }),
  [FETCH_MNP_HISTORY_SUCCESS]: (state, { payload }) => ({
    ...state,
    mnpHistory: payload,
    isMnpHistoryLoading: false,
    isMnpHistoryError: null
  }),
  [FETCH_MNP_HISTORY_ERROR]: (state, { payload: { IsSuccess, MessageText, ErrorCode } }) => ({
    ...state,
    mnpHistory: null,
    isMnpHistoryLoading: false,
    isMnpHistoryError: MessageText
  }),
  [FETCH_MNP_HISTORY_FAILURE]: (state) => ({
    ...state,
    mnpHistory: null,
    isMnpHistoryLoading: false,
    isMnpHistoryError: 'При загрузке истории MNP произошла ошибка'
  })
}, initialState)
