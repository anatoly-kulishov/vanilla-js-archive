import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BalancesTable from './BalancesTable'
import { getTemporaryPayNew, addPayment } from 'reducers/finance/temporaryPayReducer'
import { getTrustCreditHistory, addContentBalance, closeContentBalance, getContentBalanceHistory, getBalance } from 'reducers/finance/balanceReducer'

const mapStateToProps = state => ({
  ...state.finance,
  ...state.internal.userState,
  ...state.personalInfo.personalAccountState,
  handlingId: state.internal.handlingState.Id,
  cardMode: state.internal.cardMode.cardMode,
  mnpMarkers: state.mnp.mnpMarkersState.mnpMarkers
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addPayment,
  getTemporaryPayNew,
  getTrustCreditHistory,
  addContentBalance,
  closeContentBalance,
  getContentBalanceHistory,
  getBalance
}, dispatch)

export default (connect(mapStateToProps, mapDispatchToProps)(BalancesTable))
