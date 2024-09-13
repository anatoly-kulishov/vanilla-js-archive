import axios from 'axios'
import qs from 'query-string'
import { getAuthToken } from 'utils/helpers/authToken'
import { markers } from 'constants/ports'
import fromEnv from 'config/fromEnv'
import { applyRequestInterceptorWebSeller } from 'webseller/helpers/api/interceptors'
import { isWebSellerApp } from 'webseller/helpers'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')
const service = 'marker'

const markerInstance = axios.create()
markerInstance.interceptors.request.use(
  config => ({
    ...config,
    headers: {
      Authorization: getAuthToken(),
      ...config.headers
    },
    timeout: 60000,
    paramsSerializer: params => qs.stringify(params, { encode: false })
  }),
  error => Promise.reject(error)
)

if (isWebSellerApp()) {
  markerInstance.interceptors.request.use(applyRequestInterceptorWebSeller)
}

export default {
  fetchMarkers: params => markerInstance.get(`${http}${pathBe}:${markers}/${service}/GetMarkers`, { params }),
  fetchMarkersV2: params => markerInstance.get(`${http}${pathBe}:${markers}/api/v2/Markers`, { params }),
  fetchAnonymousMarker: params => markerInstance.get(`${http}${pathBe}:${markers}/marker/Anonymous`, { params }),
  getRtkSegment: params => axios.get(`${http}${pathBe}:${markers}/${service}/GetRtkSegment`, { params }),
  getMarkerMnp: params => axios.get(`${http}${pathBe}:${markers}/${service}/GetMarkerMnp`, { params }),
  getMarkerTariffHold: params => axios.get(`${http}${pathBe}:${markers}/${service}/GetMarkerTariffHold`, { params })
}
