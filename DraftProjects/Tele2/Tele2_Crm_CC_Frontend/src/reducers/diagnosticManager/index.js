import { combineReducers } from 'redux'

import diagnosticScenario from './diagnosticScenarioReducer'
import diagnosticManager from './diagnosticManagerReducer'

export default combineReducers({
  diagnosticScenario,
  diagnosticManager
})
