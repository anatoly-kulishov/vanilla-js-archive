import { combineReducers } from 'redux'

import activeSubscriptionsState from './activeSubscriptionReducer'
import unsubscribe from './unsubscribeReducer'
import subscriptionCompensationState from './subscriptionCompensationReducer'

// Dont using
// import sendSubscriptionsSms from './sendSmsReducer'

export default combineReducers({
  activeSubscriptionsState,
  unsubscribe,
  subscriptionCompensationState
})
