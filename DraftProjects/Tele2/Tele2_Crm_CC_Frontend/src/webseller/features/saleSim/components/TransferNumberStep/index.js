import { connect } from 'react-redux'
import { checkSimMnp, setSallingProcessStep } from 'reducers/saleSim/saleSimReducer'
import { SALLING_PROCESS_STEPS } from 'webseller/features/saleSim/helpers'
import TransferNumberStep from './TransferNumberStep'

const mapStateToProps = state => ({
  currentNumber: state.saleSim.transferNumberOld,
  isLoading: state.saleSim.isCheckSimMnpLoading,
  errorInfo: state.saleSim.checkSimMnpError
})

const mapDispatchToProps = dispatch => ({
  checkSimMnp: payload => dispatch(checkSimMnp(payload)),
  toPrevStep: () => dispatch(setSallingProcessStep(SALLING_PROCESS_STEPS.SALE))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransferNumberStep)
