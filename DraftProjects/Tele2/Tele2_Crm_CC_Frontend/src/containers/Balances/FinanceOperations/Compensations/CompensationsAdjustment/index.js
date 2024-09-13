import { connect } from 'react-redux'

import CompensationsAdjustment from './CompensationsAdjustment'

import {
  adjustPayment,
  clearAdjustmentPayment,
  fetchPaymentsList,
  clearPaymentsList,
  clearSubscribersCompensationsAdjustmentData
} from 'reducers/compensation/compensationsAdjustmentReducer'

import { withLogger } from 'utils/helpers/logger'

const mapStateToProps = state => {
  return {
    personalAccount: state.personalInfo.personalAccountState.personalAccount,
    handling: state.internal.handlingState,
    validSubscriberInfo: state.compensation.compensationsAdjustmentSubscribers.validSubscriberInfo,
    adjustmentPayment: state.compensation.compensationsAdjustmentSubscribers.adjustmentPayment,

    invalidSubscriberBalance: state.compensation.compensationsAdjustmentSubscribers.invalidSubscriberBalance,
    isInvalidSubscriberBalanceLoading:
      state.compensation.compensationsAdjustmentSubscribers.isInvalidSubscriberBalanceLoading,
    isInvalidSubscriberBalanceError:
      state.compensation.compensationsAdjustmentSubscribers.isInvalidSubscriberBalanceError,

    validSubscriberBalance: state.compensation.compensationsAdjustmentSubscribers.validSubscriberBalance,
    isValidSubscriberBalanceLoading:
      state.compensation.compensationsAdjustmentSubscribers.isValidSubscriberBalanceLoading,
    isValidSubscriberBalanceError: state.compensation.compensationsAdjustmentSubscribers.isValidSubscriberBalanceError,

    invalidSubscriberInfo: state.compensation.compensationsAdjustmentSubscribers.invalidSubscriberInfo
  }
}

const mapDispatchToProps = {
  clearSubscribersCompensationsAdjustmentData,
  adjustPayment,
  fetchPaymentsList,
  clearAdjustmentPayment,
  clearPaymentsList
}

export default connect(mapStateToProps, mapDispatchToProps)(withLogger(CompensationsAdjustment))
