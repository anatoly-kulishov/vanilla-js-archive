import axios from 'axios'
import { reasonCategory } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchCompanyMarks: (requestType) =>
    axios.get(`${http}${pathBe}:${reasonCategory}/handling/getCompanyMarks?RequestType=${requestType}`),

  fetchCompanyMarksForHandling: (handlingId) =>
    axios.get(`${http}${pathBe}:${reasonCategory}/handling/getCompanyMarksForHandling?handlingId=${handlingId}`),

  setCompanyMark: (handlingId, markId) =>
    axios.get(`${http}${pathBe}:${reasonCategory}/handling/setHandlingCompanyMark?handlingId=${handlingId}&markId=${markId}`),

  removeCompanyMark: (handlingId, markId) =>
    axios.get(`${http}${pathBe}:${reasonCategory}/handling/removeHandlingCompanyMark?handlingId=${handlingId}&markId=${markId}`)
}
