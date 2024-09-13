import axios from 'axios'
import fromEnv from 'config/fromEnv'

const SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}/dealerinfoservice`

export default {
  fetchSalesOfficeInfo: officeId => axios.get(`${SERVICE_HOST}/api/v1/Offices/${officeId}`),
  fetchSalesOfficeBranches: officeId => axios.get(`${SERVICE_HOST}/api/v1/Offices/${officeId}/Branches`),
  getDealerInfo: (params) => axios.get(`${SERVICE_HOST}/api/v1/dealers/${params.dealerId}`),
  getAllDealerSalePoints: (params) => axios.get(`${SERVICE_HOST}/api/v1/dealers/${params.dealerId}/offices`, { params: { query: params.query } }),
  getDealerIdBySalePointId: (params) => axios.get(`${SERVICE_HOST}/api/v1/offices/${params.officeId}/dealerid`)
}
