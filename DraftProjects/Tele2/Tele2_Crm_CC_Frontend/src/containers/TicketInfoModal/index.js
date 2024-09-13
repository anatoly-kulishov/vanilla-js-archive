import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TicketInfoModal from './TicketInfoModal'

import {
  ticketAddFile,
  ticketDeleteFile,
  ticketAddComment
} from 'reducers/tickets/ticketReducer'

import { handleVisibleTicketInfoModal } from 'reducers/tickets/historyTicketReducer'

const mapStateToProps = state => ({
  historyTicketsState: state.tickets.historyTickets,
  handlingId: state.internal.handlingState.Id
})

const mapDispatchToProps = dispatch => bindActionCreators({
  ticketDeleteFile,
  ticketAddComment,
  ticketAddFile,
  handleVisibleTicketInfoModal
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TicketInfoModal)
