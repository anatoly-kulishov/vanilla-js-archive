import axios from 'axios'
import { feedback } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  getFeedbackType: params => axios.get(`${http}${pathBe}:${feedback}/api/v1/Types`, { params }),
  getFeedbackComponents: params => axios.get(`${http}${pathBe}:${feedback}/api/v1/Components`, { params }),
  getFeedbackTemplates: ({ TypeId, ...params }) => axios.get(`${http}${pathBe}:${feedback}/api/v1/Templates/${TypeId}`, { params }),
  sendFeedback: data => axios.post(`${http}${pathBe}:${feedback}/api/v1/Feedbacks`, data),
  cancelFeedback: data => axios.delete(`${http}${pathBe}:${feedback}/api/v1/Feedbacks`, { data: data })
}
