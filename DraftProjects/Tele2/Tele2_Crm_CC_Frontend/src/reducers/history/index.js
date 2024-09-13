import { combineReducers } from 'redux'

import historyInteractionsState from './historyInteractionsReducer'
import wgHistory from './wgHistoryReducer'
import mnpHistoryState from './mnpHistoryReducer'

export default combineReducers({
  historyInteractionsState,
  wgHistory,
  mnpHistoryState
})
