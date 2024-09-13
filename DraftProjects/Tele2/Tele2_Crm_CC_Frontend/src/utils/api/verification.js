import axios from 'axios'
import fromEnv from 'config/fromEnv'

const SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}/VerificationService`

export default {
  fetchRequestSmsCode: msisdn => axios.post(`${SERVICE_HOST}/api/v1/Token/${msisdn}/request`),
  fetchVerifySmsCode: params =>
    axios.post(`${SERVICE_HOST}/api/v1/Token/${params.msisdn}/verify`, { token: params.code })
}
