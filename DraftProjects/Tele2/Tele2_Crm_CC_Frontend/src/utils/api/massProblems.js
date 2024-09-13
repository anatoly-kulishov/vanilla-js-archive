import axios from 'axios'
import { massTechProblem, mtp } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchRegisterMassProblemNote: params => axios.post(`${http}${pathBe}:${massTechProblem}/MassTechProblems/RegisterMassProblemNote`, params),
  fetchMassProblemsRegions: () => axios.get(`${http}${pathBe}:${massTechProblem}/MtpHandbooks/GetRegionFullList`),

  fetchMassProblemForRegion: params => axios.post(`${http}${pathBe}:${massTechProblem}/MassTechProblems/GetMTPJournal`, params),

  fetchActualMtpJournalForPeriod: params => axios.get(`${http}${pathBe}:${mtp}/GetActualMtpJournalForPeriod`, { params }),
  getServiceChannelInterface: params => axios.get(`${http}${pathBe}:${massTechProblem}/MassTechProblems/GetServiceChannelInterface`, { params })
}
