import axios from 'axios'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')
const billingNotificationsServiceLocation = fromEnv('REACT_APP_BILLING_NOTIFICATION_SERVICE_LOCATION')

export default {
  fetchSubscriberNotifications: params =>
    axios.get(`${http}${pathBe}${billingNotificationsServiceLocation}/api/v1/SubscriberNotification`, { params }),
  modifySubscriberNotification: data =>
    axios.put(`${http}${pathBe}${billingNotificationsServiceLocation}/api/v1/SubscriberNotification`, data),
  deleteSubscriberNotification: data =>
    axios.delete(`${http}${pathBe}${billingNotificationsServiceLocation}/api/v1/SubscriberNotification`, { data })
}
