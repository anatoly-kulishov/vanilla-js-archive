import axios from 'axios'
import fromEnv from 'config/fromEnv'

const SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}/teledealer`

export default {
  fetchTemplateFiles: () => axios.get(`${SERVICE_HOST}/secured/fs/template_document/list`),
  fetchMnpFiles: () => axios.get(`${SERVICE_HOST}/secured/fs/listSorted`),
  fetchBeautifulNumberFiles: () => axios.get(`${SERVICE_HOST}/secured/fs/APPSELLER_BEAUTIFUL_NUMBER/list`),
  fetchDownloadFile: ({ source, fileUuid }) =>
    axios.get(`${SERVICE_HOST}/secured/fs/${source}/file/${fileUuid}/download`, { responseType: 'blob' })
}
