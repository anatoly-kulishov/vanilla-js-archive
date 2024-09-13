import axios from 'axios'

const SERVICE_HOST = process.env.REACT_APP_CONTRACT_SERVICE_HTTP_APPSELLER

export default {
  fetchRecreateClientAvailability: msisdn =>
    axios.get(`${SERVICE_HOST}/api/v1/ClientRecreations/${msisdn}/isAvailable`),
  fetchRecreateClient: (msisdn, data) => axios.post(`${SERVICE_HOST}/api/v1/ClientRecreations/${msisdn}`, data),

  fetchGetMarketIsNeedDuplicateRfa: params => axios.get(`${SERVICE_HOST}/api/v1/ErfDuplicate/Check`, { params }),
  fetchExecuteDuplicateRfa: body => axios.post(`${SERVICE_HOST}/api/v1/ErfDuplicate`, body),

  fetchTerminationClientAvailability: msisdn =>
    axios.get(`${SERVICE_HOST}/api/v1/ClientTermination/${msisdn}/isAvailable`),
  fetchExecuteTerminationClient: ({ params, body }) => axios.post(`${SERVICE_HOST}/api/v1/ClientTermination/${params.msisdn}`, body)
}
