import { combineReducers } from 'redux'

import servicesState from './serviceReducer'
import serviceHistory from './serviceHistoryReducer'
import tariffModal from './tariffModalReducer'
import servicesCallForwarding from './servicesCallForwarding'
import tariffHistoryState from './tariffHistoryReducer'
import tariffInfoState from './tariffInfoReducer'

export default combineReducers({
  servicesState,
  serviceHistory,
  tariffModal,
  servicesCallForwarding,
  tariffHistoryState,
  tariffInfoState
})
