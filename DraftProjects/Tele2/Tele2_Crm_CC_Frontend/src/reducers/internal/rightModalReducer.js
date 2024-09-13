import { createAction, handleActions } from 'redux-actions'

const TOGGLE = 'rightModal/TOGGLE'
const ADD_SUBSCRIBER = 'rightModal/ADD_SUBSCRIBER'
const CHANGE_TAB = 'rightModal/CHANGE_TAB'

const initialState = {
  isToggled: false,
  activeTab: 'sms',
  subscribersReasons: [],
  subscribersSms: []
}

export const toggleRap = createAction(TOGGLE)
export const addSubscriber = createAction(ADD_SUBSCRIBER)
export const changeTab = createAction(CHANGE_TAB)

export default handleActions(
  {
    [TOGGLE]: (state, { payload: { section } }) => {
      return {
        ...state,
        isToggled: !state.isToggled,
        activeTab: section
      }
    },

    [CHANGE_TAB]: (state, { payload: { section } }) => {
      return {
        ...state,
        activeTab: section
      }
    },

    [ADD_SUBSCRIBER]: (state, { payload: { number, inputId, tab } }) => {
      const newSubscribers = state[tab]
      const filteredNumber = parseInt(number.replace(/[^0-9]/g, '')).toString()

      if (inputId >= 0) {
        newSubscribers[inputId] = filteredNumber
      } else {
        newSubscribers.push(filteredNumber)
      }

      return {
        ...state,
        [tab]: [...newSubscribers]
      }
    }
  },
  initialState
)
