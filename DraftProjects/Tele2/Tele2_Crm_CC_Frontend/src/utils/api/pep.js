import axios from 'axios'

const SERVICE_HOST = `${process.env.REACT_APP_APPSELLER_BACKEND_HOST_HTTP}/PepService`

export default {
  fetchClientPep: body => axios.post(`${SERVICE_HOST}/api/v1/clients/pep`, body),
  fetchPepCode: body => axios.post(`${SERVICE_HOST}/api/v1/pep/code`, body),
  fetchCheckPepCode: (msisdn, body) => axios.post(`${SERVICE_HOST}/api/v1/Pep/${msisdn}/code/isChecked`, body)
}
