import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {
  changeServiceStatus,
  getConnectedServices,
  getAvailableServices,
  handleToggleServicesPendingOrders
} from 'reducers/services/serviceReducer'
import {
  getServiceHistory,
  changeVisibility,
  showServiceHistory,
  showAllServicesHistory
} from 'reducers/services/serviceHistoryReducer'
import { fetchHlr, resetHlr, changeHlr } from 'reducers/services/servicesCallForwarding'

import { withLogger } from 'utils/helpers/logger'

import Service from './Service'

const mapStateToProps = state => {
  return {
    ...state.internal.queryParamsState,
    ...state.personalInfo.personalAccountState,
    ...state.internal.userState,
    ...state.services.servicesState,
    ...state.services.serviceHistory,
    ...state.services.servicesCallForwarding,

    handlingId: state.internal.handlingState.Id
  }
}

const mapDispatchToProps = {
  getConnectedServices,
  getAvailableServices,
  getServiceHistory,
  changeServiceStatus,
  changeVisibility,
  showServiceHistory,
  showAllServicesHistory,
  handleToggleServicesPendingOrders,
  fetchHlr,
  resetHlr,
  changeHlr
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withLogger(Service))
)
