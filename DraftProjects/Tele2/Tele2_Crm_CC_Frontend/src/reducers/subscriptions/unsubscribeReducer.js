import { createAction, handleActions, combineActions } from 'redux-actions'

export const UNSUBSCRIBE_FETCH = 'subscription/UNSUBSCRIBE'
export const UNSUBSCRIBE_FETCH_SUCCESS = 'subscription/UNSUBSCRIBE_SUCCESS'
export const UNSUBSCRIBE_FETCH_ERROR = 'subscription/UNSUBSCRIBE_ERROR'
export const UNSUBSCRIBE_FETCH_FAILURE = 'subscription/UNSUBSCRIBE_FAILURE'

export const FETCH_UNSIBSCRIBE_REASON = 'subscription/FETCH_UNSIBSCRIBE_REASON'
export const FETCH_UNSIBSCRIBE_REASON_SUCCESS = 'subscription/FETCH_UNSIBSCRIBE_REASON_SUCCESS'
export const FETCH_UNSIBSCRIBE_REASON_ERROR = 'subscription/FETCH_UNSIBSCRIBE_REASON_ERROR'
export const FETCH_UNSIBSCRIBE_REASON_FAILURE = 'subscription/FETCH_UNSIBSCRIBE_REASON_FAILURE'

export const unsubscribeSelected = createAction(UNSUBSCRIBE_FETCH)
export const fetchUnsibscribeReasons = createAction(FETCH_UNSIBSCRIBE_REASON)

const initialState = {
  isUnsubscribeLoading: false,
  unsubscribeError: null,
  reloadSubscriptions: false,

  unsubscribeReasons: null,
  isUnsubscribeReasonsLoading: false,
  isUnsubscribeReasonsError: false
}

export default handleActions({
  [UNSUBSCRIBE_FETCH]: (state) => ({
    ...state,
    isUnsubscribeLoading: true,
    unsubscribeError: null
  }),
  [UNSUBSCRIBE_FETCH_SUCCESS]: (state, { payload: { StateCode } }) => ({
    ...state,
    isUnsubscribeLoading: false,
    reloadSubscriptions: true
  }),
  [combineActions(UNSUBSCRIBE_FETCH_ERROR, UNSUBSCRIBE_FETCH_FAILURE)]:
  (state, { payload: { StateCode } }) => ({
    ...state,
    isUnsubscribeLoading: false,
    unsubscribeError: 'При отключении подписок произошла ошибка'
  }),

  [FETCH_UNSIBSCRIBE_REASON]: (state) => ({
    ...state,
    isUnsubscribeReasonsLoading: true,
    isUnsubscribeReasonsError: null
  }),
  [FETCH_UNSIBSCRIBE_REASON_SUCCESS]: (state, { payload }) => ({
    ...state,
    unsubscribeReasons: payload,
    isUnsubscribeReasonsLoading: false,
    isUnsubscribeReasonsError: false
  }),
  [combineActions(FETCH_UNSIBSCRIBE_REASON_ERROR, FETCH_UNSIBSCRIBE_REASON_FAILURE)]:
  (state) => ({
    ...state,
    isUnsubscribeReasonsLoading: false,
    isUnsubscribeReasonsError: true
  })
}, initialState)
