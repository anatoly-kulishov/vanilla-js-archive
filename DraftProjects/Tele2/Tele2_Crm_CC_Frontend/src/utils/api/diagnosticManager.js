import axios from 'axios'
import { diagnosticManager } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  getDiagnosticScenarios: params =>
    axios.get(`${http}${pathBe}:${diagnosticManager}/Diagnostic/GetScenarios`, { params }),
  getDiagnosticManager: data => axios.post(`${http}${pathBe}:${diagnosticManager}/Diagnostic/DiagnosticManager`, data)
}
