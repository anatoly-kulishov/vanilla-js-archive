import { combineReducers } from 'redux'

import mnpState from './mnpReducer'
import blacklistState from './blacklistReducer'
import mnpMarkersState from './mnpMarkersReducer'
import protocolState from './protocolReducer'
import mnpVerifyState from './mnpVerifyReducer'

export default combineReducers({
  mnpState,
  blacklistState,
  mnpMarkersState,
  protocolState,
  mnpVerifyState
})
