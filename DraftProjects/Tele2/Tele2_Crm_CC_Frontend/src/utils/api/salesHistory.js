import axios from 'axios'
import fromEnv from 'config/fromEnv'

const SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}/saleshistoryservice`

export default {
  fetchSalesReport: (params, isFull = true) => {
    const { dateFrom: DateFrom, dateTo: DateTo } = params
    const reportType = isFull ? 'full' : 'short'

    return axios.get(`${SERVICE_HOST}/api/v1/SalesReport/${reportType}`, {
      params: { DateFrom, DateTo }
    })
  },
  getErfReportFile: (query) => axios.get(`${SERVICE_HOST}/api/v1/saleshistory/erfReportFile`,
    { params: query, responseType: 'blob' }
  )
}
