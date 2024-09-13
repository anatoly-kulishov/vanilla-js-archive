import { createAction, handleActions, combineActions } from 'redux-actions'

export const SUBSCRIBER_LIST_FETCH = 'getSubscriberList/SUBSCRIBER_LIST_FETCH'
export const SUBSCRIBER_LIST_FETCH_SUCCESS = 'getSubscriberList/SUBSCRIBER_LIST_FETCH_SUCCESS'
export const SUBSCRIBER_LIST_FETCH_ERROR = 'getSubscriberList/SUBSCRIBER_LIST_FETCH_ERROR'
export const SUBSCRIBER_LIST_FETCH_FAILURE = 'getSubscriberList/SUBSCRIBER_LIST_FETCH_FAILURE'
export const SUBSCRIBER_STATUSES_FETCH = 'getSubscriberStatuses/SUBSCRIBER_STATUSES_FETCH'
export const SUBSCRIBER_STATUSES_FETCH_SUCCESS = 'getSubscriberStatuses/SUBSCRIBER_STATUSES_FETCH_SUCCESS'
export const SUBSCRIBER_STATUSES_FETCH_ERROR = 'getSubscriberStatuses/SUBSCRIBER_STATUSES_FETCH_ERROR'
export const SUBSCRIBER_STATUSES_FETCH_FAILURE = 'getSubscriberStatuses/SUBSCRIBER_STATUSES_FETCH_FAILURE'

const initalState = {
  subscriberList: null,
  subscriberListError: null,
  isSubscriberListLoading: false,
  subscriberStatuses: null,
  subscriberStatusesError: false,
  isSubscriberStatusesLoading: false
}

export const getSubscriberList = createAction(SUBSCRIBER_LIST_FETCH)
export const fetchSubscriberStatuses = createAction(SUBSCRIBER_STATUSES_FETCH)

export default handleActions({
  [SUBSCRIBER_LIST_FETCH]: (state) => ({
    ...state,
    subscriberList: null,
    subscriberListError: false,
    isSubscriberListLoading: true
  }),

  [SUBSCRIBER_LIST_FETCH_SUCCESS]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    subscriberList: Data,
    subscriberListError: false,
    isSubscriberListLoading: false
  }),

  [SUBSCRIBER_LIST_FETCH_ERROR]: (state, { payload: { IsSuccess, Data, MessageText } }) => {
    const { subscriberList } = state
    return {
      ...state,
      subscriberList: [ ...subscriberList, ...Data ],
      subscriberListError: true,
      isSubscriberListLoading: false
    }
  },

  [SUBSCRIBER_LIST_FETCH_FAILURE]: (state) => ({
    ...state,
    subscriberList: null,
    subscriberListError: true,
    isSubscriberListLoading: false
  }),

  [SUBSCRIBER_STATUSES_FETCH]: (state) => ({
    ...state,
    subscriberStatuses: null,
    subscriberStatusesError: false,
    isSubscriberStatusesLoading: true
  }),

  [SUBSCRIBER_STATUSES_FETCH_SUCCESS]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    subscriberStatuses: Data,
    subscriberStatusesError: false,
    isSubscriberStatusesLoading: false
  }),

  [combineActions(SUBSCRIBER_STATUSES_FETCH_ERROR, SUBSCRIBER_STATUSES_FETCH_FAILURE)]:
  (state) => ({
    ...state,
    subscriberStatuses: null,
    subscriberStatusesError: true,
    isSubscriberStatusesLoading: false
  })
}, initalState)
