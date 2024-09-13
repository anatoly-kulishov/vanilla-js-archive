import axios from 'axios'
import { mnpVerify } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  getScanFiles: npId => axios.get(`${http}${pathBe}:${mnpVerify}/api/v1/Scans/${npId}/File`),
  getRecognitionValues: npId => axios.get(`${http}${pathBe}:${mnpVerify}/api/v1/Scans/${npId}/RecognitionValues`),
  updateRecognitionValues: data => axios.patch(`${http}${pathBe}:${mnpVerify}/api/v1/Scans`, data)
}
