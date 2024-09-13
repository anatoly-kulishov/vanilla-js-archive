import { connect } from 'react-redux'

import { getServiceHistory } from 'reducers/services/serviceHistoryReducer'

import {
  fetchTicketGridDataByFilters,
  fetchTicketGridDataByTicket
} from 'reducers/tickets/historyTicketReducer'

import Services from './Services'

const mapStateToProps = state => {
  return {
    ...state.personalInfo.personalAccountState,
    serviceHistoryState: state.services.serviceHistory
  }
}

const mapDispatchToProps = {
  getServiceHistory,
  fetchTicketGridDataByFilters,
  fetchTicketGridDataByTicket
}

export default connect(mapStateToProps, mapDispatchToProps)(Services)
