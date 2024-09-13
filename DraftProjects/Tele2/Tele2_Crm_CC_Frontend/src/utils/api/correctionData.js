import axios from 'axios'

const SERVICE_HOST = `${process.env.REACT_APP_APPSELLER_BACKEND_HOST_HTTP}/PersonalDataService`

export default {
  fetchEditPersonalData: (branchId, clientId, data) =>
    axios.put(`${SERVICE_HOST}/api/v2/branches/${branchId}/clients/${clientId}`, data)
}
