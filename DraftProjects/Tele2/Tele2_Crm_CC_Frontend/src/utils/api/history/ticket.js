import axios from 'axios'
import { ticket } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchTicketCheckList: (params) => axios.get(`${http}${pathBe}:${ticket}/ticketsHistory/GetCheckList`, { params }),
  fetchTicketComments: (params) => axios.get(`${http}${pathBe}:${ticket}/ticketsHistory/GetCommentary`, { params }),
  fetchTicketFiles: (params) => axios.get(`${http}${pathBe}:${ticket}/ticketsHistory/GetFilebyRequest`, { params }),
  fetchTicketServices: (params) => axios.get(`${http}${pathBe}:${ticket}/ticketsHistory/GetServices`, { params }),
  fetchReasonCategoryTickets: (params) => axios.get(`${http}${pathBe}:${ticket}/ticketsHistory/ReasonCategory`, {
    params: {
      TypeOfService: '6d7b266f-d60a-e111-a31b-00155d04c01d',
      ServiceParent: params.ServiceParent || 'IsNull',
      IsArchive: false,
      Category: 'ef9e2f6a-f36b-1410-1a92-0050ba5d6c38'
    }
  })
}
