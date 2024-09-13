import axios from 'axios'
import fromEnv from 'config/fromEnv'

const SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}/b2b`
const SERVICE_HOST_CHECK_ABONENTS = `${SERVICE_HOST}/checkabonents`
const SERVICE_HOST_PERSONAL_ACCOUNTS = `${SERVICE_HOST}/personalaccounts`

export default {
  getPreparedBusinessEnvironmentAbonent: ({ icc, ...params }) =>
    axios.get(`${SERVICE_HOST_CHECK_ABONENTS}/api/v1/businessenvironmentabonents/${icc}/prepared`, {
      params,
      transformRequest: [...axios.defaults.transformRequest, deleteSystemHeader]
    }),
  createReservedAppSellerAbonent: body =>
    axios.post(`${SERVICE_HOST_PERSONAL_ACCOUNTS}/api/v1/reservedappsellerabonent`, body, {
      transformRequest: [...axios.defaults.transformRequest, deleteSystemHeader]
    })
}

function deleteSystemHeader (data, headers) {
  delete headers.System

  return data
}
