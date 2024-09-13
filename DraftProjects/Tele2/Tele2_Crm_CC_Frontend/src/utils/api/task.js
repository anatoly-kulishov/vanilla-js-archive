import axios from 'axios'

const SERVICE_HOST = `${process.env.REACT_APP_APPSELLER_BACKEND_HOST_HTTP}/TaskService`

export default {
  fetchTaskCatalog: () => axios.get(`${SERVICE_HOST}/api/v1/TaskCatalog`)
}
