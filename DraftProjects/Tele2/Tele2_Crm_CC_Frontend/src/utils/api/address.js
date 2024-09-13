import axios from 'axios'
import fromEnv from 'config/fromEnv'

const SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}`

export default {
  fetchSearchCountries: query =>
    axios.get(`${SERVICE_HOST}/address/secured/address/country`, {
      params: { characters: query }
    }),
  fetchSearchCodeUFMS: code => axios.get(`${SERVICE_HOST}/mdmservice/api/v1/Ufms/${code}`)
}
