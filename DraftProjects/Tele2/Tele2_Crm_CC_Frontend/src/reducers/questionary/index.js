import { combineReducers } from 'redux'

import questionaryState from './questionaryReducer'
import questionaryHistoryState from './questionaryHistoryReducer'

export default combineReducers({
  questionaryState,
  questionaryHistoryState
})
