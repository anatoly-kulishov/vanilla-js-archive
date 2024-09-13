import axios from 'axios'

const SERVICE_HOST = `${process.env.REACT_APP_APPSELLER_BACKEND_HOST_HTTP}/PersonalDataService`

export default {
  fetchNumberRoles: () => axios.get(`${SERVICE_HOST}/api/v1/b2bAccessTypes`),
  fetchChangeNumberRole: ({ subscriberId, body }) => axios.put(`${SERVICE_HOST}/api/v1/subscribers/${subscriberId}/b2bAccessType`, body)
}
