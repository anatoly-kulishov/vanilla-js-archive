import axios from 'axios'

const SERVICE_HOST = `${process.env.REACT_APP_APPSELLER_BACKEND_HOST_HTTP}/documentservice`

export default {
  fetchAgreementTemplates: () => axios.get(`${SERVICE_HOST}/api/v1/Templates`),
  fetchAgreementTemplate: templateId => axios.get(`${SERVICE_HOST}/api/v1/Templates/${templateId}`),
  fetchPrepareSimSellDocument: (simSellId, body) =>
    axios.post(`${SERVICE_HOST}/api/v1/Documents/SimSell/${simSellId}`, body),
  fetchCreateDocument: (handlingId, body) => axios.post(`${SERVICE_HOST}/api/v1/Documents/Handlings/${handlingId}`, body),
  fetchIsAvailableStructureOfExpenses: (params) => axios.get(`${SERVICE_HOST}/api/v1/detalization/isAvailable`, { params }),
  fetchPoolingDetalization: (handlingId, body) => axios.post(`${SERVICE_HOST}/api/v1/Handling/${handlingId}/detalization`, body),
  fetchUrlOnFile: (requestId) => axios.get(`${SERVICE_HOST}/api/v1/detalization/${requestId}/status`)
}
