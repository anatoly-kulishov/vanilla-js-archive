import { combineReducers } from 'redux'

import giveOrderSteps from './giveOrderStepsReducer'
import orderList from './orderListReducer'
import orderInfo from './orderInfoReducer'
import history from './historyReducer'

export default combineReducers({
  giveOrderSteps,
  orderList,
  orderInfo,
  history
})
