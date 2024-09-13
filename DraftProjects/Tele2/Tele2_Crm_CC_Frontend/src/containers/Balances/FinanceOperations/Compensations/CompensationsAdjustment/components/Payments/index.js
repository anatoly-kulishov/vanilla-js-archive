import { connect } from 'react-redux'

import Payments from './Payments'

import { fetchPaymentsList } from 'reducers/compensation/compensationsAdjustmentReducer'

const mapStateToProps = state => {
  return {
    ...state.compensation.compensationsAdjustmentSubscribers
  }
}

const mapDispatchToProps = {
  fetchPaymentsList
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments)
