import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_SUBSCRIBER_NOTIFICATIONS = 'subscriberNotifications/FETCH_SUBSCRIBER_NOTIFICATIONS'
export const FETCH_SUBSCRIBER_NOTIFICATIONS_SUCCESS = 'subscriberNotifications/FETCH_SUBSCRIBER_NOTIFICATIONS_SUCCESS'
export const FETCH_SUBSCRIBER_NOTIFICATIONS_ERROR = 'subscriberNotifications/FETCH_SUBSCRIBER_NOTIFICATIONS_ERROR'
export const FETCH_SUBSCRIBER_NOTIFICATIONS_FAILURE = 'subscriberNotifications/FETCH_SUBSCRIBER_NOTIFICATIONS_FAILURE'

export const MODIFY_SUBSCRIBER_NOTIFICATION = 'subscriberNotifications/MODIFY_SUBSCRIBER_NOTIFICATION'
export const MODIFY_SUBSCRIBER_NOTIFICATION_SUCCESS = 'subscriberNotifications/MODIFY_SUBSCRIBER_NOTIFICATION_SUCCESS'
export const MODIFY_SUBSCRIBER_NOTIFICATION_ERROR = 'subscriberNotifications/MODIFY_SUBSCRIBER_NOTIFICATION_ERROR'
export const MODIFY_SUBSCRIBER_NOTIFICATION_FAILURE = 'subscriberNotifications/MODIFY_SUBSCRIBER_NOTIFICATION_FAILURE'

export const DELETE_SUBSCRIBER_NOTIFICATION = 'subscriberNotifications/DELETE_SUBSCRIBER_NOTIFICATION'
export const DELETE_SUBSCRIBER_NOTIFICATION_SUCCESS = 'subscriberNotifications/DELETE_SUBSCRIBER_NOTIFICATION_SUCCESS'
export const DELETE_SUBSCRIBER_NOTIFICATION_ERROR = 'subscriberNotifications/DELETE_SUBSCRIBER_NOTIFICATION_ERROR'
export const DELETE_SUBSCRIBER_NOTIFICATION_FAILURE = 'subscriberNotifications/DELETE_SUBSCRIBER_NOTIFICATION_FAILURE'

const initialState = {
  subscriberNotifications: [],
  isSubscriberNotificationsLoading: false,
  isSubscriberNotificationsError: false,

  isModifySubscriberNotificationLoading: false,
  isModifySubscriberNotificationError: false,

  isDeleteSubscriberNotificationLoading: false,
  isDeleteSubscriberNotificationError: false
}

export const fetchSubscriberNotifications = createAction(FETCH_SUBSCRIBER_NOTIFICATIONS)
export const modifySubscriberNotification = createAction(MODIFY_SUBSCRIBER_NOTIFICATION)
export const deleteSubscriberNotification = createAction(DELETE_SUBSCRIBER_NOTIFICATION)

export default handleActions({
  [FETCH_SUBSCRIBER_NOTIFICATIONS]: produce((state) => {
    state.isSubscriberNotificationsLoading = true
    state.isSubscriberNotificationsError = false
  }),

  [FETCH_SUBSCRIBER_NOTIFICATIONS_SUCCESS]: produce((state, { payload }) => {
    state.subscriberNotifications = payload
    state.isSubscriberNotificationsLoading = false
    state.isSubscriberNotificationsError = false
  }),

  [combineActions(FETCH_SUBSCRIBER_NOTIFICATIONS_ERROR, FETCH_SUBSCRIBER_NOTIFICATIONS_FAILURE)]:
  produce((state) => {
    state.isSubscriberNotificationsLoading = false
    state.isSubscriberNotificationsError = true
  }),

  [MODIFY_SUBSCRIBER_NOTIFICATION]: produce((state) => {
    state.isModifySubscriberNotificationLoading = true
    state.isModifySubscriberNotificationError = false
  }),

  [MODIFY_SUBSCRIBER_NOTIFICATION_SUCCESS]: produce((state) => {
    state.isModifySubscriberNotificationLoading = false
    state.isModifySubscriberNotificationError = false
  }),

  [combineActions(MODIFY_SUBSCRIBER_NOTIFICATION_ERROR, MODIFY_SUBSCRIBER_NOTIFICATION_FAILURE)]:
      produce((state) => {
        state.isModifySubscriberNotificationLoading = false
        state.isModifySubscriberNotificationError = true
      }),

  [DELETE_SUBSCRIBER_NOTIFICATION]: produce((state) => {
    state.isDeleteSubscriberNotificationLoading = true
    state.isDeleteSubscriberNotificationError = false
  }),

  [DELETE_SUBSCRIBER_NOTIFICATION_SUCCESS]: produce((state) => {
    state.isDeleteSubscriberNotificationLoading = false
    state.isDeleteSubscriberNotificationError = false
  }),

  [combineActions(DELETE_SUBSCRIBER_NOTIFICATION_ERROR, DELETE_SUBSCRIBER_NOTIFICATION_FAILURE)]:
          produce((state) => {
            state.isDeleteSubscriberNotificationLoading = false
            state.isDeleteSubscriberNotificationError = true
          })
}, initialState)
