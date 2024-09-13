import { combineReducers } from 'redux'

import mnpOrderState from './mnpOrderReducer'
import mnpVerificationState from './mnpVerificationReducer'
import rejectionInfoState from './rejectionInfoReducer'

export default combineReducers({
  mnpOrderState,
  mnpVerificationState,
  rejectionInfoState
})
