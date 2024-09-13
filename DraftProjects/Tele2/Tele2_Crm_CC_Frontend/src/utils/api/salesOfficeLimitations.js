import axios from 'axios'
import fromEnv from 'config/fromEnv'

const SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}`

export default {
  fetchActiveSalesOffice: () => axios.get(`${SERVICE_HOST}/SalesOfficeLimitationsService/api/v1/ActiveSalesOffice`),
  fetchChangeActiveSalesOffice: ({ salesOfficeId }) =>
    axios.post(`${SERVICE_HOST}/SalesOfficeLimitationsService/api/v2/ActiveSalesOffice/${salesOfficeId}`),
  fetchActiveSalesOfficeStatus: (params) => axios.get(`${SERVICE_HOST}/SalesOfficeLimitationsService/api/v1/ActiveSalesOffice/Status`, { params })
}
