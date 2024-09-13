import axios from 'axios'
import { manualSearch } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchManualSearchGridData: params => {
    return axios({
      url: `${http}${pathBe}:${manualSearch}/ManualSearch/GetCustomers`,
      method: 'POST',
      data: params
    })
  }
}
