import axios from 'axios'
import { conversations, messages, identification, messageTemplates } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchConversations: data => axios.post(`${http}${pathBe}:${conversations}/conversation/getConversation`, data),
  setWorkStatus: data => axios.post(`${http}${pathBe}:${conversations}/conversation/setWorkStatus`, data),
  setDelayStatus: data => axios.post(`${http}${pathBe}:${conversations}/conversation/setDelayStatus`, data),
  setCloseStatus: data => axios.post(`${http}${pathBe}:${conversations}/conversation/setCloseStatus`, data),
  updateIdentificationLevel: data =>
    axios.post(`${http}${pathBe}:${conversations}/conversation/updateIdentificationLevel`, data),
  fetchIdentificationLevels: params =>
    axios.get(`${http}${pathBe}:${conversations}/conversation/getIdentificationLevel`, { params }),
  identifyConversation: params =>
    axios.get(`${http}${pathBe}:${identification}/identification/identifyConversation`, { params }),

  fetchMessages: params => axios.get(`${http}${pathBe}:${messages}/message/getMessages`, { params }),
  sendMessage: data => axios.post(`${http}${pathBe}:${messages}/message/sendMessage`, data),
  fetchCuvoLink: params => axios.get(`${http}${pathBe}:${messages}/message/getCuvoLink`, { params }),

  fetchMessageTemplates: params =>
    axios.get(`${http}${pathBe}:${messageTemplates}/messageTemplate/getMessageTemplate`, { params })
}
