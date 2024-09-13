import { combineReducers } from 'redux'

import reasonCategoryState from './reasonCategoryReducer'
import reasonsListState from './reasonsListReducer'
import categoriesListState from './categoriesListReducer'
import reasonCategoryForEscalationState from './reasonCategoryForEscalationReducer'
import reasonCategoryDiagnosticsState from './reasonCategoryDiagnosticsReducer'

export default combineReducers({
  reasonCategoryState, // ticket only
  reasonsListState, // MTP, manual search and reasons category selector container
  categoriesListState, // MTP and reasons category selector container
  reasonCategoryForEscalationState, // Reasons category selector container,
  reasonCategoryDiagnosticsState
})
