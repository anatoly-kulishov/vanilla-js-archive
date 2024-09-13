import { connect } from 'react-redux'

import {
  fetchLeftBlockValues,
  fetchRightBlockValues,
  fetchTicketComments,
  fetchTicketFiles,
  fetchTicketStatuses,
  fetchTicketsReasonsCategories,
  handleVisibleTicketInfoModal,
  fetchTickets,
  fetchTicketGridDataByFilters,
  fetchTicketGridDataByTicket
} from 'reducers/tickets/historyTicketReducer'

import Tickets from './Tickets'

const mapStateToProps = state => {
  return {
    ...state.personalInfo.personalAccountState,
    ...state.historyRequestsDates,
    queryParamsState: state.internal.queryParamsState,
    historyTicketsState: state.tickets.historyTickets
  }
}

const mapDispatchToProps = {
  fetchTickets,
  fetchTicketGridDataByFilters,
  fetchTicketGridDataByTicket,

  fetchLeftBlockValues,
  fetchRightBlockValues,
  fetchTicketComments,
  fetchTicketStatuses,
  fetchTicketsReasonsCategories,
  fetchTicketFiles,
  handleVisibleTicketInfoModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickets)
