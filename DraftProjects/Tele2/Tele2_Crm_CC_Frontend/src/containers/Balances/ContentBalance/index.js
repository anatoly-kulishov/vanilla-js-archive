import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Content from './Content'
import { addContentBalance, closeContentBalance, getContentBalanceHistory } from 'reducers/finance/balanceReducer'

const mapStateToProps = state => ({
  ...state.finance,
  ...state.internal.userState,
  ...state.personalInfo.personalAccountState,
  mnpMarkers: state.mnp.mnpMarkersState.mnpMarkers,
  handlingId: state.internal.handlingState.Id
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addContentBalance,
  closeContentBalance,
  getContentBalanceHistory
}, dispatch)

export default (connect(mapStateToProps, mapDispatchToProps)(Content))
