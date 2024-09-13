import { connect } from 'react-redux'

import Subscribers from './Subscribers'

import {
  fetchInvalidSubscriberInfo,
  fetchValidSubscriberInfo,
  fetchInvalidSubscriberBalance,
  fetchValidSubscriberBalance
} from 'reducers/compensation/compensationsAdjustmentReducer'

const mapStateToProps = state => {
  return {
    invalidSubscriberInfo: state.compensation.compensationsAdjustmentSubscribers.invalidSubscriberInfo,
    isInvalidSubscriberInfoLoading:
      state.compensation.compensationsAdjustmentSubscribers.isInvalidSubscriberInfoLoading,
    isInvalidSubscriberInfoError:
      state.compensation.compensationsAdjustmentSubscribers.isInvalidSubscriberInfoError,

    validSubscriberInfo: state.compensation.compensationsAdjustmentSubscribers.validSubscriberInfo,
    isValidSubscriberInfoLoading:
      state.compensation.compensationsAdjustmentSubscribers.isValidSubscriberInfoLoading,
    isValidSubscriberInfoError:
      state.compensation.compensationsAdjustmentSubscribers.isValidSubscriberInfoError,

    invalidSubscriberBalance: state.compensation.compensationsAdjustmentSubscribers.invalidSubscriberBalance,
    isInvalidSubscriberBalanceLoading:
      state.compensation.compensationsAdjustmentSubscribers.isInvalidSubscriberBalanceLoading,
    isInvalidSubscriberBalanceError:
      state.compensation.compensationsAdjustmentSubscribers.isInvalidSubscriberBalanceError,

    validSubscriberBalance: state.compensation.compensationsAdjustmentSubscribers.validSubscriberBalance,
    isValidSubscriberBalanceLoading:
      state.compensation.compensationsAdjustmentSubscribers.isValidSubscriberBalanceLoading,
    isValidSubscriberBalanceError:
      state.compensation.compensationsAdjustmentSubscribers.isValidSubscriberBalanceError
  }
}

const mapDispatchToProps = {
  fetchInvalidSubscriberInfo,
  fetchValidSubscriberInfo,
  fetchInvalidSubscriberBalance,
  fetchValidSubscriberBalance
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscribers)
