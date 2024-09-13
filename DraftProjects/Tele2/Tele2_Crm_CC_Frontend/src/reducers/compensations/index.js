import { combineReducers } from 'redux'

import compensationsState from './compensationsReducer'
import validationCompensationsState from './validationCompensationsReducer'

export default combineReducers({
  compensationsState,
  validationCompensationsState
})
