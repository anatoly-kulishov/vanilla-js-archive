import axios from 'axios'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')
const webimServiceLocation = fromEnv('REACT_APP_WEBIM_SERVICE_LOCATION')

export default {
  fetchWebimHash: params => axios.get(`${http}${pathBe}${webimServiceLocation}/api/v1/HashWebim`, { params }),
  fetchWebimDns: () => axios.get(`${http}${pathBe}${webimServiceLocation}/api/v1/DnsWebim`)
}
