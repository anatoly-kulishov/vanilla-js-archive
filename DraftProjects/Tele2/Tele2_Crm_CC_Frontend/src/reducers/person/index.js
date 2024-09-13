import { combineReducers } from 'redux'

import personModalState from './personModalReducer'
import customerScenarioHistoryState from './customerScenarioHistoryReducer'
import personState from './personReducer'
import scenariosState from './scenariosReducer'
import customerSegmentsState from './customerSegmentsReducer'

export default combineReducers({ personModalState, customerScenarioHistoryState, personState, scenariosState, customerSegmentsState })
