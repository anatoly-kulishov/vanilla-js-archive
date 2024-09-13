import { connect } from 'react-redux'
import { registerSims, downloadRegisterSimInstruction, setSallingProcessStep } from 'reducers/saleSim/saleSimReducer'
import SimsInOrderStep from './SimsInOrderStep'
import { SALLING_PROCESS_STEPS } from 'webseller/features/saleSim/helpers'
import { selectIsOrderProcessTypeSaleSim, selectSimsInOrderSaleSim } from 'reducers/saleSim/selectors'

const mapStateToProps = state => ({
  isOrderProcess: selectIsOrderProcessTypeSaleSim(state),
  simsInOrder: selectSimsInOrderSaleSim(state),
  addedSims: state.saleSim.addedSims,
  connectionFee: state.saleSim.shopTariffs.connectionFee,
  soldSims: state.saleSim.soldSims,
  isLoadingInstruction: state.saleSim.isLoadingRegisterSimInstruction
})

const mapDispatchToProps = dispatch => ({
  registerSims: () => dispatch(registerSims()),
  downloadInstruction: () => dispatch(downloadRegisterSimInstruction()),
  toNextStep: () => dispatch(setSallingProcessStep(SALLING_PROCESS_STEPS.RESULT))
})

export default connect(mapStateToProps, mapDispatchToProps)(SimsInOrderStep)
