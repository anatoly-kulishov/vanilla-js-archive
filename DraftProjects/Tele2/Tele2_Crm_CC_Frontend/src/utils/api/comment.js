import axios from 'axios'
import { comment } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchPopupComment: params => axios.get(`${http}${pathBe}:${comment}/Comment/GetPopupComment`, { params }),
  // Get comments
  fetchComments: params => axios.get(`${http}${pathBe}:${comment}/comment/getFilteredComment`, { params }),
  // Add comment
  handleComment: data => axios.post(`${http}${pathBe}:${comment}/comment/handleComment`, data)
}
