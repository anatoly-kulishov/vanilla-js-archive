import axios from 'axios'
import { subscriberGroups } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchGroupList: params => axios.get(`${http}${pathBe}:${subscriberGroups}/subscriberGroups/getGroupList`, { params }),
  fetchDiscountList: params => axios.get(`${http}${pathBe}:${subscriberGroups}/subscriberGroups/getDiscountList`, { params }),
  fetchGroupSubscriberList: params => axios.get(`${http}${pathBe}:${subscriberGroups}/subscriberGroups/getGroupSubscriberList`, { params }),
  validateAutopayService: params => axios.get(`${http}${pathBe}:${subscriberGroups}/subscriberGroups/ValidateAutopayService`, { params }),
  deleteGroupSubscriber: data => axios.post(`${http}${pathBe}:${subscriberGroups}/subscriberGroups/deleteGroupSubscriber`, data)
}
