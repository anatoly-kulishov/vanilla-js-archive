import { combineReducers } from 'redux'

import ticketsState from './ticketReducer'
import createTicketState from './createTicketReducer'
import historyTickets from './historyTicketReducer'

export default combineReducers({
  ticketsState,
  createTicketState,
  historyTickets
})
