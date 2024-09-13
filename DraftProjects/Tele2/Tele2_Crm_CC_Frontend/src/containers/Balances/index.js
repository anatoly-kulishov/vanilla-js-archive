import { connect } from 'react-redux'

import FinanceSubscriber from './FinanceSubscriber'
import {
  getBalance,
  getTrustCreditInfo,
  activateCreditInfo,
  deactivateCreditInfo
} from 'reducers/finance/balanceReducer'
import { getRemainsDetailsData, getQuantumData, getMixxBalance } from 'reducers/finance/remainsReducer'
import { fetchPaymentsUrl } from 'reducers/finance/paymentsReducer'

const mapStateToProps = state => ({
  quantumData: state.finance.remains.quantumData,
  detailsData: state.finance.remains.detailsData,

  balance: state.finance.balance.balance,
  trustCreditInfo: state.finance.balance.trustCreditInfo,
  mnpMarkers: state.mnp.mnpMarkersState.mnpMarkers,

  mixxBalance: state.finance.remains.mixxBalance,

  ...state.personalInfo.personalAccountState
})

const mapDispatchToProps = {
  getBalance,
  getTrustCreditInfo,
  getRemainsDetailsData,
  getMixxBalance,
  getQuantumData,
  activateCreditInfo,
  deactivateCreditInfo,
  fetchPaymentsUrl
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanceSubscriber)
