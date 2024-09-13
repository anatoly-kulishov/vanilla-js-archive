import { connect } from 'react-redux'
import { resetGiveOrderProcess } from 'reducers/giveOrder/giveOrderStepsReducer'
import GiveOrderModal from './GiveOrderModal'

const mapStateToProps = state => ({
  giveOrderProcessStep: state.giveOrder.giveOrderSteps.giveOrderProcessStep
})

const mapDispatchToProps = {
  resetGiveOrderProcess
}

export default connect(mapStateToProps, mapDispatchToProps)(GiveOrderModal)
