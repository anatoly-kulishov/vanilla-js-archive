import { combineReducers } from 'redux'

import diagnosticsState from './diagnosticsReducer'
import clientRestrictionsState from './clientRestrictionsReducer'
import noteState from './noteReducer'

export default combineReducers({
  diagnosticsState,
  clientRestrictionsState,
  noteState
})
