import { connect } from 'react-redux'
import {
  getTransferEarliestTimeSlot,
  getTransferTimeSlots,
  submitTransferTimeSlot,
  returnFromTransferTimeStep
} from 'reducers/saleSim/saleSimReducer'
import TransferTimeStep from './TransferTimeStep'

const mapStateToProps = state => ({
  currentTimeSlot: state.saleSim.submittedTransferTimeSlot,
  earliestTimeSlot: state.saleSim.transferEarliestTimeSlot,
  isEarliestTimeSlotLoading: state.saleSim.isTransferEarliestTimeSlotLoading,
  timeSlots: state.saleSim.transferTimeSlots,
  isTimeSlotsLoading: state.saleSim.isTransferTimeSlotsLoading
})

const mapDispatchToProps = dispatch => ({
  getEarliestTimeSlot: payload => dispatch(getTransferEarliestTimeSlot(payload)),
  getTimeSlots: payload => dispatch(getTransferTimeSlots(payload)),
  submitTimeSlot: payload => dispatch(submitTransferTimeSlot(payload)),
  toPrevStep: () => dispatch(returnFromTransferTimeStep())
})

export default connect(mapStateToProps, mapDispatchToProps)(TransferTimeStep)
