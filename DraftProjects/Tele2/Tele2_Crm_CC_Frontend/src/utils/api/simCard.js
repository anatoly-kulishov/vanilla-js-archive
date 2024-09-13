import axios from 'axios'
import fromEnv from 'config/fromEnv'

const SERVICE_HOST = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_HTTP')}/SimCard`

export default {
  fetchSimCardAvailability: params => axios.get(`${SERVICE_HOST}/api/v2/Sim/sale/availability`, { params }),
  fetchSimSaleAvailabilityCheck: body => axios.post(`${SERVICE_HOST}/secured/simcard/saleAvailable/check`, body),
  fetchMnpCheck: params => axios.get(`${SERVICE_HOST}/api/v2/Sim/mnp/availability`, { params }),
  fetchTransferEarliestTimeSlot: number =>
    axios.get(`${SERVICE_HOST}/secured/mnp/earliest/timeslots/${number}`),
  fetchTransferTimeSlots: (number, day) =>
    axios.get(`${SERVICE_HOST}/secured/mnp/timeslots/${number}/day/${day}`, { params: { Hours: 0 } }),
  fetchRegisterTemplatedSim: body =>
    axios.post(`${SERVICE_HOST}/api/v2/Sim/templated`, body),
  fetchRegisterTemplatedSimMnp: body =>
    axios.post(`${SERVICE_HOST}/api/v2/Sim/mnp`, body),
  fetchRegisterUntemplatedSim: body =>
    axios.post(`${SERVICE_HOST}/api/v2/Sim/untemplated`, body),
  fetchCheckIcc: params => axios.get(`${SERVICE_HOST}/api/v2/Sim/IccPart/Check`, { params }),
  fetchMnpAvailabilityCheck: params => axios.post(`${SERVICE_HOST}/secured/mnp/check`, params)
}
