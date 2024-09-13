import { connect } from 'react-redux'
import TemporaryPayModal from './TemporaryPayModal'
import { setTpNewVisible, addPayment, getTemporaryPayNew } from 'reducers/finance/temporaryPayReducer'

const mapStateToProps = state => ({
  ...state.finance,
  ...state.personalInfo.personalAccountState,
  ...state.internal.userState,
  handlingId: state.internal.handlingState.Id,
  isTpNewVisible: state.finance.temporaryPay.isTpNewVisible
})

const mapDispatchToProps = {
  setTpNewVisible,
  addPayment,
  getTemporaryPayNew
}

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryPayModal)
