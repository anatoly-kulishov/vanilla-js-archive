import { combineReducers } from 'redux'

import compensationGeneral from './compensationReducer'
import compensationPackage from './compensationPackageReducer'
import compensationEnrollment from './compensationEnrollmentReducer'
import compensationPromo from './compensationPromoReducer'
import compensationHisoryModal from './compensationHisoryModalReducer'
import compensationsAdjustmentSubscribers from './compensationsAdjustmentReducer'

export default combineReducers({
  compensationGeneral,
  compensationPackage,
  compensationEnrollment,
  compensationPromo,
  compensationHisoryModal,
  compensationsAdjustmentSubscribers
})
