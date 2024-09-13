import { combineReducers } from 'redux'

import massProblemServiceState from './massProblemServiceReducer'
import massProblemState from './massProblemReducer'
import massProblemForRegionState from './massProblemForRegionReducer'
import registerMtpNoteState from './massProblemRegisterNoteReducer'
import massProblemDiagnosticsState from './massProblemDiagnosticsReducer'

export default combineReducers({
  massProblemServiceState,
  massProblemState,
  massProblemForRegionState,
  registerMtpNoteState,
  massProblemDiagnosticsState
})
