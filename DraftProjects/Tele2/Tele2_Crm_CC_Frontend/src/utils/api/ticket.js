import axios from 'axios'
import { ticketAdmin, ticket, diagnostics } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')
const config = { headers: { 'Content-type': 'multipart/form-data' } }

export default {
  fetchTickets: params => axios.get(`${http}${pathBe}:${ticket}/TicketsHistory/GetBpmRequest`, { params }),
  ticketDeleteFile: params => axios.get(`${http}${pathBe}:${ticketAdmin}/TicketAdministation/DeleteFile`, { params }),
  ticketAddComment: params =>
    axios.get(`${http}${pathBe}:${ticketAdmin}/TicketAdministation/AddCommentary`, { params }),
  ticketAddParams: params => axios.get(`${http}${pathBe}:${ticketAdmin}/TicketAdministation/GetAddParams`, { params }),
  fetchContactLines: params =>
    axios.get(`${http}${pathBe}:${ticketAdmin}/TicketAdministation/ContactLines`, { params }),
  fetchTicketStatuses: () => axios.get(`${http}${pathBe}:${ticket}/TicketsHistory/GetBpmIncidentStatus`),
  fetchValidatedCoordinates: params =>
    axios.get(`${http}${pathBe}:${diagnostics}/SmartGis/GetCoordinates`, { params }, { timeout: 3000 }),

  createTicket: params => axios.post(`${http}${pathBe}:${ticketAdmin}/TicketAdministration/v2/CreateTicket`, params),
  ticketAddFile: data => axios.post(`${http}${pathBe}:${ticketAdmin}/TicketAdministation/AddFile`, data, config),

  checkCoverages: params =>
    axios.get(`${http}${pathBe}:${ticketAdmin}/TicketAdministration/v2/CheckCoverages`, { params }),
  checkMTPByServiceId: params =>
    axios.get(`${http}${pathBe}:${ticketAdmin}/TicketAdministration/v2/CheckMTPByServiceId`, { params })
}
