import { combineReducers } from 'redux'

import eCommerceTypesState from './eCommerceTypesReducer'
import mnpJournalState from './mnpJournalReducer'

export default combineReducers({
  eCommerceTypesState,
  mnpJournalState
})
