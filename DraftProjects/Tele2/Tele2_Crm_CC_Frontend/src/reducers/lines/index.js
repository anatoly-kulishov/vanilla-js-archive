import { combineReducers } from 'redux'

import groups from './groupsReducer'
import discounts from './discountsReducer'
import groupsSubscribers from './subscribersReducer'

export default combineReducers({
  groups,
  discounts,
  groupsSubscribers
})
