import axios from 'axios'
import { mnpOrder } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchMnpOrder: NpId => axios.get(`${http}${pathBe}:${mnpOrder}/api/v1/Orders/${NpId}/Verify`),

  approveOrder: data => axios.post(`${http}${pathBe}:${mnpOrder}/api/v1/Orders/ApproveOrder`, data),
  rejectOrder: data => axios.post(`${http}${pathBe}:${mnpOrder}/api/v1/Orders/RejectOrder`, data),

  fetchRejectionReasons: params =>
    axios.get(`${http}${pathBe}:${mnpOrder}/api/v1/Admin/RejectionReasonCard`, { params }),
  fetchRejectionComments: params =>
    axios.get(`${http}${pathBe}:${mnpOrder}/api/v1/Admin/RejectionCommentCard`, { params }),

  fetchMnpVerification: params => axios.get(`${http}${pathBe}:${mnpOrder}/api/v1/Orders/Verify`, { params })
}
