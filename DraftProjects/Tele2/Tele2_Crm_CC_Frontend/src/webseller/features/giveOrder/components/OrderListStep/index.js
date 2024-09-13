import { connect } from 'react-redux'
import { getOrderList } from 'reducers/giveOrder/orderListReducer'
import { resetGiveOrderProcess } from 'reducers/giveOrder/giveOrderStepsReducer'
import OrderListStep from './OrderListStep'

const mapStateToProps = state => ({
  salesOfficeId: state.salesOffice.activeSalesOffice.salesOfficeId,
  ...state.giveOrder.orderList
})

const mapDispatchToProps = {
  getOrderList,
  resetGiveOrderProcess
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListStep)
