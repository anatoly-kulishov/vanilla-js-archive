import { connect } from 'react-redux'
import FinanceOperations from './FinanceOperations'

import {
  validatePaymentHistory,
  ValidateCostHistory,
  validatePaydPostLimit,
  getCompensationForm
} from 'reducers/compensation/compensationReducer'

const mapStateToProps = state => ({
  user: state.internal.userState.user,
  compensationsAvailability: {
    isPromocodesDisabled: state.compensation.compensationPromo.compensationFormPromocode?.data?.length === 0,
    isEnrollmentDisabled: state.compensation.compensationEnrollment.compensationFormMonetary?.data?.length === 0,
    isPackagesDisabled: state.compensation.compensationPackage.compensationFormPackage?.data?.length === 0
  }
})

const mapDispatchToProps = {
  validatePaymentHistory,
  ValidateCostHistory,
  validatePaydPostLimit,
  getCompensationForm
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanceOperations)
