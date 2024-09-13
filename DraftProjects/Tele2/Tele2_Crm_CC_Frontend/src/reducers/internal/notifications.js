import { createAction, handleActions } from 'redux-actions'

export const ADD_NOTIFICATION = 'internal/ADD_NOTIFICATION'
export const REMOVE_ALL_NOTIFICATION = 'internal/REMOVE_ALL_NOTIFICATION'
export const VISIBLE_NOTIFICATION = 'internal/VISIBLE_NOTIFICATION'

const initalState = {
  hidden: false,
  notifications: []
}

export const addNotification = createAction(ADD_NOTIFICATION)
export const removeAllNotification = createAction(REMOVE_ALL_NOTIFICATION)
export const changeVisibilityNotification = createAction(VISIBLE_NOTIFICATION)

export default handleActions({
  [ADD_NOTIFICATION]: (state, { payload }) => ({
    ...state,
    hidden: false,
    notifications: [...state.notifications, payload]
  }),

  [REMOVE_ALL_NOTIFICATION]: (state) => ({
    ...state,
    notifications: []
  }),

  [VISIBLE_NOTIFICATION]: (state) => ({
    ...state,
    hidden: !state.hidden
  })

}, initalState)
