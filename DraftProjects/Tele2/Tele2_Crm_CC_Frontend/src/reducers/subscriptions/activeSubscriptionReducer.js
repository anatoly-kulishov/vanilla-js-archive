import { createAction, handleActions } from 'redux-actions'

export const ACTIVE_SUBSCRIPTIONS_INFO_FETCH = 'subscription/ACTIVE_SUBSCRIPTIONS_FETCH'
export const ACTIVE_SUBSCRIPTIONS_INFO_FETCH_SUCCESS = 'subscription/ACTIVE_SUBSCRIPTIONS_FETCH_SUCCESS'
export const ACTIVE_SUBSCRIPTIONS_INFO_FETCH_ERROR = 'subscription/ACTIVE_SUBSCRIPTIONS_FETCH_ERROR'
export const ACTIVE_SUBSCRIPTIONS_INFO_FETCH_FAILURE = 'subscription/ACTIVE_SUBSCRIPTIONS_FETCH_FAILURE'

const initialState = {
  oldSubscriptions: null,
  activeSubscriptions: null,
  isActiveSubscriptionsLoading: false,
  isActiveSuccess: false,
  activeSubscriptionsError: false
}

export const getActiveSubscriptions = createAction(ACTIVE_SUBSCRIPTIONS_INFO_FETCH)

export default handleActions({
  [ACTIVE_SUBSCRIPTIONS_INFO_FETCH]: (state) => ({
    ...state,
    oldSubscriptions: null,
    activeSubscriptions: null,
    isActiveSubscriptionsLoading: true,
    isActiveSuccess: false,
    activeSubscriptionsError: false
  }),
  [ACTIVE_SUBSCRIPTIONS_INFO_FETCH_SUCCESS]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    oldSubscriptions: Data.OldSubscriptions,
    activeSubscriptions: Data.ActiveSubscriptions,
    isActiveSubscriptionsLoading: false,
    isActiveSuccess: IsSuccess,
    activeSubscriptionsError: Data.ResultText

  }),
  [ACTIVE_SUBSCRIPTIONS_INFO_FETCH_ERROR]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    isActiveSubscriptionsLoading: false,
    oldSubscriptions: null,
    activeSubscriptions: null,
    isActiveSuccess: false,
    activeSubscriptionsError: Data.ResultText
      ? Data.ResultText
      : 'При получении подписок произошла ошибка'
  }),
  [ACTIVE_SUBSCRIPTIONS_INFO_FETCH_FAILURE]: state => ({
    ...state,
    isActiveSubscriptionsLoading: false,
    oldSubscriptions: null,
    activeSubscriptions: null,
    isActiveSuccess: false,
    activeSubscriptionsError: 'При получении подписок произошла ошибка'
  })
}, initialState)
