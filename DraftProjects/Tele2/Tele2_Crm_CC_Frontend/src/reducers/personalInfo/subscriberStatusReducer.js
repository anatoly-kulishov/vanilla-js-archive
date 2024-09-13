import { createAction, handleActions } from 'redux-actions'

export const SUBSCRIBER_STATUS_HISTORY_FETCH = 'personalAccount/SUBSCRIBER_STATUS_HISTORY_FETCH'
export const SUBSCRIBER_STATUS_HISTORY_FETCH_SUCCESS = 'personalAccount/SUBSCRIBER_STATUS_HISTORY_FETCH_SUCCESS'
export const SUBSCRIBER_STATUS_HISTORY_FETCH_ERROR = 'personalAccount/SUBSCRIBER_STATUS_HISTORY_FETCH_ERROR'
export const SUBSCRIBER_STATUS_HISTORY_FETCH_FAILURE = 'personalAccount/SUBSCRIBER_STATUS_HISTORY_FETCH_FAILURE'

export const SUBSCRIBER_STATUS_UPDATE_FETCH = 'personalAccount/SUBSCRIBER_STATUS_UPDATE_FETCH'
export const SUBSCRIBER_STATUS_UPDATE_FETCH_SUCCESS = 'personalAccount/SUBSCRIBER_STATUS_UPDATE_FETCH_SUCCESS'
export const SUBSCRIBER_STATUS_UPDATE_FETCH_ERROR = 'personalAccount/SUBSCRIBER_STATUS_UPDATE_FETCH_ERROR'
export const SUBSCRIBER_STATUS_UPDATE_FETCH_FAILURE = 'personalAccount/SUBSCRIBER_STATUS_UPDATE_FETCH_FAILURE'

export const RECOMMENDATION_CHANGE_STATUS_FETCH = 'personalAccount/RECOMMENDATION_CHANGE_STATUS_FETCH'
export const RECOMMENDATION_CHANGE_STATUS_FETCH_SUCCESS = 'personalAccount/RECOMMENDATION_CHANGE_STATUS_FETCH_SUCCESS'
export const RECOMMENDATION_CHANGE_STATUS_FETCH_ERROR = 'personalAccount/RECOMMENDATION_CHANGE_STATUS_FETCH_ERROR'
export const RECOMMENDATION_CHANGE_STATUS_FETCH_FAILURE = 'personalAccount/RECOMMENDATION_CHANGE_STATUS_FETCH_FAILURE'

export const FETCH_SUBSCRIBER_STATUS_LIST = 'personalAccount/FETCH_SUBSCRIBER_STATUS_LIST'
export const FETCH_SUBSCRIBER_STATUS_LIST_SUCCESS = 'personalAccount/FETCH_SUBSCRIBER_STATUS_LIST_SUCCESS'
export const FETCH_SUBSCRIBER_STATUS_LIST_ERROR = 'personalAccount/FETCH_SUBSCRIBER_STATUS_LIST_ERROR'
export const FETCH_SUBSCRIBER_STATUS_LIST_FAILURE = 'personalAccount/FETCH_SUBSCRIBER_STATUS_LIST_FAILURE'

const initalState = {
  subscriberHistory: null,
  subscriberHistoryMessage: null,
  isSubscriberHistoryError: false,
  isSubscriberHistoryLoading: false,

  subscriberUpdate: null,
  subscriberUpdateMessage: null,
  isSubscriberUpdateError: false,
  isSubscriberUpdateLoading: false,

  recommendationChangeStatus: null,
  isRecommendationChangeStatusError: false,
  isRecommendationChangeStatusLoading: false,

  subscriberStatusList: null,
  isSubscriberStatusListError: false,
  isSubscriberStatusListLoading: false
}

export const fetchSubscriberStatusHistory = createAction(SUBSCRIBER_STATUS_HISTORY_FETCH)
export const fetchSubscriberStatusUpdate = createAction(SUBSCRIBER_STATUS_UPDATE_FETCH)
export const fetchRecommendationChangeStatus = createAction(RECOMMENDATION_CHANGE_STATUS_FETCH)
export const fetchSubscriberStatusList = createAction(FETCH_SUBSCRIBER_STATUS_LIST)

export default handleActions({
  // Status history
  [SUBSCRIBER_STATUS_HISTORY_FETCH]: (state) => ({
    ...state,
    isSubscriberHistoryLoading: true
  }),
  [SUBSCRIBER_STATUS_HISTORY_FETCH_SUCCESS]: (
    state, { payload: { Data, MessageText } }) => ({
    ...state,
    subscriberHistory: Data,
    subscriberHistoryMessage: MessageText,
    isSubscriberHistoryError: false,
    isSubscriberHistoryLoading: false
  }),
  [SUBSCRIBER_STATUS_HISTORY_FETCH_ERROR]: (state, { payload: { Data, MessageText } }) => ({
    ...state,
    subscriberHistory: Data,
    subscriberHistoryMessage: MessageText,
    isSubscriberHistoryError: true,
    isSubscriberHistoryLoading: false
  }),
  [SUBSCRIBER_STATUS_HISTORY_FETCH_FAILURE]: (state, message) => ({
    ...state,
    subscriberHistory: null,
    subscriberHistoryMessage: null,
    isSubscriberHistoryError: true,
    isSubscriberHistoryLoading: false
  }),
  // Status updating
  [SUBSCRIBER_STATUS_UPDATE_FETCH]: (state) => ({
    ...state,
    isSubscriberUpdateLoading: true
  }),
  [SUBSCRIBER_STATUS_UPDATE_FETCH_SUCCESS]: (
    state, { payload: { Data, MessageText } }) => ({
    ...state,
    subscriberUpdate: Data,
    subscriberUpdateMessage: MessageText,
    isSubscriberUpdateError: false,
    isSubscriberUpdateLoading: false
  }),
  [SUBSCRIBER_STATUS_UPDATE_FETCH_ERROR]: (state, { payload: { Data, MessageText } }) => ({
    ...state,
    subscriberUpdate: Data,
    subscriberUpdateMessage: MessageText,
    isSubscriberUpdateError: true,
    isSubscriberUpdateLoading: false
  }),
  [SUBSCRIBER_STATUS_UPDATE_FETCH_FAILURE]: (state, message) => ({
    ...state,
    subscriberUpdate: null,
    subscriberUpdateMessage: null,
    isSubscriberUpdateError: true,
    isSubscriberUpdateLoading: false
  }),
  // RecommendationChangeStatus
  [RECOMMENDATION_CHANGE_STATUS_FETCH]: (state) => ({
    ...state,
    recommendationChangeStatus: null,
    isRecommendationChangeStatusLoading: true
  }),
  [RECOMMENDATION_CHANGE_STATUS_FETCH_SUCCESS]: (state, { payload: { Data } }) => ({
    ...state,
    recommendationChangeStatus: Data,
    isRecommendationChangeStatusError: false,
    isRecommendationChangeStatusLoading: false
  }),
  [RECOMMENDATION_CHANGE_STATUS_FETCH_ERROR]: (state, { payload: { Data } }) => ({
    ...state,
    recommendationChangeStatus: Data,
    isRecommendationChangeStatusError: true,
    isRecommendationChangeStatusLoading: false
  }),
  [RECOMMENDATION_CHANGE_STATUS_FETCH_FAILURE]: (state) => ({
    ...state,
    recommendationChangeStatus: null,
    isRecommendationChangeStatusError: true,
    isRecommendationChangeStatusLoading: false
  }),
  // fetchSubscriberStatusList
  [FETCH_SUBSCRIBER_STATUS_LIST]: (state) => ({
    ...state,
    isSubscriberStatusListLoading: true
  }),
  [FETCH_SUBSCRIBER_STATUS_LIST_SUCCESS]: (state, { payload: { Data: { SubscriberStatuses } } }) => ({
    ...state,
    subscriberStatusList: SubscriberStatuses,
    isSubscriberStatusListError: false,
    isSubscriberStatusListLoading: false
  }),
  [FETCH_SUBSCRIBER_STATUS_LIST_ERROR]: (state, { payload: { Data } }) => ({
    ...state,
    subscriberStatusList: null,
    isSubscriberStatusListError: true,
    isSubscriberStatusListLoading: false
  }),
  [FETCH_SUBSCRIBER_STATUS_LIST_FAILURE]: (state) => ({
    ...state,
    subscriberStatusList: null,
    isSubscriberStatusListError: true,
    isSubscriberStatusListLoading: false
  })
}, initalState)
