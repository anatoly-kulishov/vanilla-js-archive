import axios from 'axios'
import fromEnv from 'config/fromEnv'

const SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}${fromEnv(
  'REACT_APP_APPSELLER_DATA_INTEGRATION_BE'
)}`

export default {
  fetchSearchAddresses: query =>
    axios.get(`${SERVICE_HOST}/DadataIntegration/GetSuggestionAddress`, {
      params: { Query: query, Count: 5 }
    })
}
