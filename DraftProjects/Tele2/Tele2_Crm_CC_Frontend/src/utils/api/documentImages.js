import axios from 'axios'
import fromEnv from 'config/fromEnv'

const SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}/DocumentImagesService`

export default {
  fetchRsaKey: () => axios.get(`${SERVICE_HOST}/api/v1/key`),
  uploadDocumentsImage: data => axios.post(`${SERVICE_HOST}/api/v2/documents/image`, data)
}
