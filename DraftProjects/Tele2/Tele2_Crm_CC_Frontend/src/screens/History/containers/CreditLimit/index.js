import { connect } from 'react-redux'

import {
  getTrustCreditHistory,
  getTrustCreditReasonsHistory
} from 'reducers/finance/balanceReducer'

import CreditLimit from './CreditLimit'

const mapStateToProps = state => {
  return {
    ...state.personalInfo.personalAccountState,
    ...state.finance.balance
  }
}

const mapDispatchToProps = {
  getTrustCreditHistory: getTrustCreditHistory,
  getTrustCreditReasonsHistory
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditLimit)
