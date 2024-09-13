import axios from 'axios'
import { smsTemplate, sms } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchSenders: params => axios.get(`${http}${pathBe}:${sms}/sms/GetSmsRecipients`, { params }),
  fetchPeriodOfSilence: params => axios.get(`${http}${pathBe}:${sms}/sms/GetSilencePeriod`, { params }),
  // ==START=
  // Refactor fetchTemplates calls so that params are passed down from sagas
  // instead of being 'hardcoded' here
  fetchTemplates: params =>
    axios.get(`${http}${pathBe}:${smsTemplate}/smstemplate/GetFilteredTemplates?System=false&TargetSystem=CRM%20CC`, {
      params
    }),
  // ==END=
  fetchLteNumber: params => axios.get(`${http}${pathBe}:${sms}/sms/GetLteContactNumber`, { params }),
  sendSms: params =>
    axios({
      url: `${http}${pathBe}:${sms}/sms/AddSms`,
      method: 'POST',
      data: params
    }),
  cancelSms: data =>
    axios({
      url: `${http}${pathBe}:${sms}/sms/CancelSms`,
      method: 'POST',
      data
    }),

  fetchTopSmsTemplates: params => axios.get(`${http}${pathBe}:${smsTemplate}/smstemplate/GetTopTemplates`, { params }),
  fetchSendSms: data => axios.post(`${http}${pathBe}:${sms}/sms/AddSms`, data)
}
