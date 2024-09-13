import { combineReducers } from 'redux'

import personalAccountState from './personalInfoReducer'
import dataClientSubscriber from './dataClientSubscriberReducer'
import subscriberListState from './subscriberListReducer'
import numberOperatorBelonging from './numberOperatorBelongingReducer'
import abonentModalState from './abonentsModalReducer'
import subscriberStatus from './subscriberStatusReducer'
import personalData from './personalDataReducer'
import psychotype from './psychotypeReducer'
import markers from './markersReducer'
import subscriberNotifications from './subscriberNotificationsReducer'

export default combineReducers({
  personalAccountState,
  dataClientSubscriber,
  subscriberListState,
  numberOperatorBelonging,
  abonentModalState,
  subscriberStatus,
  personalData,
  psychotype,
  markers,
  subscriberNotifications
})
