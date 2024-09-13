import { connect } from 'react-redux'
import { getOrderInfo } from 'reducers/giveOrder/orderInfoReducer'
import {
  resetGiveOrderProcess,
  setGiveOrderStep,
  GIVING_ORDER_PROCESS_STEPS
} from 'reducers/giveOrder/giveOrderStepsReducer'
import { initGivingOrder } from 'reducers/saleSim/saleSimReducer'
import OrderStep from './OrderStep'

const mapStateToProps = state => ({
  selectedOrder: state.giveOrder.giveOrderSteps.selectedOrder,
  ...state.giveOrder.orderInfo
})

const mapDispatchToProps = dispatch => ({
  getOrderInfo: payload => dispatch(getOrderInfo(payload)),
  giveOrder: payload => {
    dispatch(initGivingOrder(payload))
    dispatch(resetGiveOrderProcess())
  },
  toPrevStep: () => dispatch(setGiveOrderStep(GIVING_ORDER_PROCESS_STEPS.SELECT_ORDER))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderStep)
