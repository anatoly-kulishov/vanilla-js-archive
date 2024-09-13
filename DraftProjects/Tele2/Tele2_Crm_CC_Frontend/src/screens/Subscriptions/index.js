import { connect } from 'react-redux'
import { getActiveSubscriptions } from 'reducers/subscriptions/activeSubscriptionReducer'
import { unsubscribeSelected, fetchUnsibscribeReasons } from 'reducers/subscriptions/unsubscribeReducer'
import { sendSubscriptionSms } from 'reducers/subscriptions/sendSmsReducer'
import { fetchAvailableBalance } from 'reducers/compensation/compensationEnrollmentReducer'
import {
  getSubscriptionCompensationLimits,
  getSubscriptionCompensationAmounts,
  accrueSubscriptionCompensation
} from 'reducers/subscriptions/subscriptionCompensationReducer'
import { withLogger } from 'utils/helpers/logger'

import Subscriptions from './Subscriptions'
import { getPersonalAccountState, getUserState } from 'selectors/index'

const mapStateToProps = state => {
  return {
    ...state.subscriptions.unsubscribe,
    ...state.compensation.compensationEnrollment,
    ...state.subscriptions.subscriptionCompensationState,
    msisdn: state.internal.queryParamsState.queryParams.msisdn,
    personalAccount: getPersonalAccountState(state),
    activeSubscriptionsState: state.subscriptions.activeSubscriptionsState,
    handlingId: state.internal.handlingState.Id,
    user: getUserState(state)
  }
}

const mapDispatchToProps = {
  getActiveSubscriptions,
  unsubscribeSelected,
  sendSubscriptionSms,
  fetchUnsibscribeReasons,
  fetchAvailableBalance,
  getSubscriptionCompensationLimits,
  getSubscriptionCompensationAmounts,
  accrueSubscriptionCompensation
}

export default connect(mapStateToProps, mapDispatchToProps)(withLogger(Subscriptions))
