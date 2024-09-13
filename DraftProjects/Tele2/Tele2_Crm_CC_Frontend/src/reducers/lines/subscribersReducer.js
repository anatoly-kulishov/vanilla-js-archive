import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_SUBSCRIBERS_LIST = 'lines/FETCH_SUBSCRIBERS_LIST'
export const FETCH_SUBSCRIBERS_LIST_SUCCESS = 'lines/FETCH_SUBSCRIBERS_LIST_SUCCESS'
export const FETCH_SUBSCRIBERS_LIST_ERROR = 'lines/FETCH_SUBSCRIBERS_LIST_ERROR'
export const FETCH_SUBSCRIBERS_LIST_FAILURE = 'lines/FETCH_SUBSCRIBERS_LIST_FAILURE'
export const CLEAR_SUBSCRIBERS_LINES = 'lines/FETCH_SUBSCRIBERS_LIST_CLEAR'

export const FETCH_GROUP_NOTIFICATION_MESSAGES = 'lines/FETCH_GROUP_NOTIFICATION_MESSAGES'
export const FETCH_GROUP_NOTIFICATION_MESSAGES_SUCCESS = 'lines/FETCH_GROUP_NOTIFICATION_MESSAGES_SUCCESS'
export const FETCH_GROUP_NOTIFICATION_MESSAGES_ERROR = 'lines/FETCH_GROUP_NOTIFICATION_MESSAGES_ERROR'
export const FETCH_GROUP_NOTIFICATION_MESSAGES_FAILURE = 'lines/FETCH_GROUP_NOTIFICATION_MESSAGES_FAILURE'

const initialState = {
  subscribersList: null,
  subscribersInfo: null,
  isSubscribersListLoading: false,
  subscribersListError: '',

  subscriberMessages: null,
  isSubscriberMessagesLoading: false,
  isSubscriberMessagesError: ''
}

export const fetchSubscribersList = createAction(FETCH_SUBSCRIBERS_LIST)
export const clearSubscribersList = createAction(CLEAR_SUBSCRIBERS_LINES)
export const fetchGroupNotificationMessages = createAction(FETCH_GROUP_NOTIFICATION_MESSAGES)

export default handleActions({
  [FETCH_SUBSCRIBERS_LIST]: produce((state, action) => {
    state.isSubscribersListLoading = true
    state.subscribersListError = ''
  }),
  [FETCH_SUBSCRIBERS_LIST_SUCCESS]: produce((state, { payload: { SubscriberList, subscriberInfo } }) => {
    state.subscribersList = SubscriberList
    state.subscribersInfo = subscriberInfo
    state.isSubscribersListLoading = false
  }),
  [combineActions(FETCH_SUBSCRIBERS_LIST_ERROR, FETCH_SUBSCRIBERS_LIST_FAILURE)]:
    produce((state, { payload }) => {
      state.subscribersListError = payload
      state.isSubscribersListLoading = false
    }),
  [CLEAR_SUBSCRIBERS_LINES]: produce((state, action) => {
    state.subscribersList = null
    state.subscribersInfo = null
  }),

  [FETCH_GROUP_NOTIFICATION_MESSAGES]: produce((state, action) => {
    state.isSubscribersListLoading = true
    state.subscribersListError = ''
  }),
  [FETCH_GROUP_NOTIFICATION_MESSAGES_SUCCESS]: produce((state, { payload }) => {
    state.subscriberMessages = payload
    state.isSubscribersListLoading = false
    state.isSubscriberMessagesError = ''
  }),
  [combineActions(FETCH_GROUP_NOTIFICATION_MESSAGES_ERROR, FETCH_GROUP_NOTIFICATION_MESSAGES_FAILURE)]: produce((state, { payload }) => {
    state.isSubscriberMessagesError = payload
    state.isSubscribersListLoading = false
  })
}, initialState)
