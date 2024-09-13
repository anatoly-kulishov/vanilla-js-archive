import axios from 'axios'
import { questionary } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')
const service = 'Questionary'

export default {
  fetchQuestionaryUseList: params => axios.get(`${http}${pathBe}:${questionary}/${service}/GetQuestionaryUseList`, { params }),
  fetchQuestionaryUseListWithoutCheck: params => axios.get(`${http}${pathBe}:${questionary}/${service}/GetQuestionaryUseListWithoutCheck`, { params }),
  fetchQuestionsList: params => axios.get(`${http}${pathBe}:${questionary}/${service}/GetQuestionsList`, { params }),
  fetchQuestionaryHistory: data => axios.post(`${http}${pathBe}:${questionary}/${service}/GetQuestionaryHistory`, data),
  fetchQuestionsHistory: params => axios.get(`${http}${pathBe}:${questionary}/${service}/GetQuestionsHistory`, { params }),
  writeNewQuestionary: data => axios.post(`${http}${pathBe}:${questionary}/${service}/WriteNewQuestionary`, data),
  fetchQuestionaryForRedirectedAbonent: params => axios.get(`${http}${pathBe}:${questionary}/${service}/GetQuestionaryForRedirectedAbonent`, { params })
}
