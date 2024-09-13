import { connect } from 'react-redux'
import {
  addSimInOrder,
  saleSim,
  resetSaleSimProcess,
  resetPersonalAccountNumber
} from 'reducers/saleSim/saleSimReducer'
import { resetCheckSmev } from 'reducers/checkSmev/checkSmevReducer'
import {
  setGiveOrderStep,
  GIVING_ORDER_PROCESS_STEPS
} from 'reducers/giveOrder/giveOrderStepsReducer'
import ScanSimsInOrder from './ScanSimsInOrder'
import { resetAgreements } from 'webseller/common/agreements/reducer'
import { resetSigning } from 'webseller/common/signing/reducer'
import { selectOrderPriceSaleSim } from 'reducers/saleSim/selectors'

const mapStateToProps = state => ({
  simsInOrder: state.saleSim.simsInOrder,
  totalPrice: selectOrderPriceSaleSim(state),
  isLoadingSaleSim: state.saleSim.isLoadingSaleSim
})

const mapDispatchToProps = dispatch => ({
  addSimInOrder: payload => dispatch(addSimInOrder(payload)),
  saleSim: payload => dispatch(saleSim(payload)),
  toPrevStep: () => {
    dispatch(resetSaleSimProcess())
    dispatch(resetCheckSmev())
    dispatch(resetAgreements())
    dispatch(resetSigning())
    dispatch(resetPersonalAccountNumber())

    dispatch(setGiveOrderStep(GIVING_ORDER_PROCESS_STEPS.GIVE_ORDER))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ScanSimsInOrder)
