import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  handleToggleServicesPendingOrders,
  fetchServicesPendingOrders,
  deleteServicesPendingOrders,
  resendServiceOrder
} from 'reducers/services/serviceReducer'

import ServicesPendingOrdersModal from './ServicesPendingOrdersModal'

const mapStateToProps = state => ({
  isVisibleServicesPendingOrders: state.services.servicesState.isVisibleServicesPendingOrders,
  personalAccountState: state.personalInfo.personalAccountState,
  serviceState: state.services.servicesState,
  handlingId: state.internal.handlingState.Id
})

const mapDispatchToProps = dispatch => bindActionCreators({
  handleToggleServicesPendingOrders,
  fetchServicesPendingOrders,
  deleteServicesPendingOrders,
  resendServiceOrder
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ServicesPendingOrdersModal)
