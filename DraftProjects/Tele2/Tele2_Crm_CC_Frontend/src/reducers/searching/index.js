import { combineReducers } from 'redux'

import kmsSearching from './kmsSearchingReducer'
import smartSearching from './smartSearchingReducer'
import reasonCategorySearching from './reasonCategorySearchReducer'

export default combineReducers({
  kmsSearching,
  smartSearching,
  reasonCategorySearching
})
