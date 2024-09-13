import { connect } from 'react-redux'
import { submitTransferAdditionalInfoNumber, setSallingProcessStep } from 'reducers/saleSim/saleSimReducer'
import { SALLING_PROCESS_STEPS } from 'webseller/features/saleSim/helpers'
import TransferAdditionalInfoNumberStep from './TransferAdditionalInfoNumberStep'

const mapStateToProps = state => ({
  transferNumber: state.saleSim.transferNumber,
  currentAdditionalInfoNumber: state.saleSim.transferAdditionalInfoNumber
})

const mapDispatchToProps = dispatch => ({
  submitAdditonalInfoNumber: payload => dispatch(submitTransferAdditionalInfoNumber(payload)),
  toPrevStep: () => dispatch(setSallingProcessStep(SALLING_PROCESS_STEPS.TRANSFER_TIME))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransferAdditionalInfoNumberStep)
