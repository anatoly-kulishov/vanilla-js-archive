import { combineReducers } from 'redux'

import balance from './balanceReducer'
import temporaryPay from './temporaryPayReducer'
import remains from './remainsReducer'
import payments from './paymentsReducer'
import paymentInformation from './paymentInformationReducer'

export default combineReducers({
  balance,
  temporaryPay,
  remains,
  payments,
  paymentInformation
})
