import axios from 'axios'
import { smsTemplate, adminUnit } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchEscalationParamsByReasonCategory: (reasonId, categoryId) =>
    axios.get(`${http}${pathBe}:${adminUnit}/Escalation/GetEscalationParam?reasonId=${reasonId}&categoryId=${categoryId}`),

  fetchBpmOnlineServices: () => axios.get(`${http}${pathBe}:${adminUnit}/BpmOnline/GetAllServices`),

  fetchSmsServiceTemplates: (params) =>
    axios.get(`${http}${pathBe}:${smsTemplate}/smstemplate/GetFilteredTemplates`, {
      params: {
        ...params,
        TargetSystem: 'CRM',
        System: true
      }
    }),

  modifyEscalationParams: (data) => axios.post(`${http}${pathBe}:${adminUnit}/Escalation/ModifyEscalationParam`, { ...data }),
  createEscalationParams: (data) => axios.post(`${http}${pathBe}:${adminUnit}/Escalation/CreateEscalationParam`, { ...data }),
  deleteEscalationParams: (params) => axios.get(`${http}${pathBe}:${adminUnit}/Escalation/DeleteEscalationParam`, { params })
}
