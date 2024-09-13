import axios from 'axios'

const SERVICE_HOST = `${process.env.REACT_APP_APPSELLER_BACKEND_HOST_HTTP}/MnpOrdersService`

export default {
  fetchMnpSimCardAvailability: params => axios.get(`${SERVICE_HOST}/api/v1/Availability`, { params }),
  createMnpReplaceNumberRequest: params => axios.post(`${SERVICE_HOST}/api/v1/MnpOrders`, { params }),
  fetchCreateMnpOrder: (data) => axios.post(
    `${SERVICE_HOST}/api/v1/MnpOrders`,
    data,
    {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    }
  )
}
