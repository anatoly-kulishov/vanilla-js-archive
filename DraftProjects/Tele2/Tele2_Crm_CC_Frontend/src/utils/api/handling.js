import axios from 'axios'
import { reasonCategory, handlings, interaction } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  createHandling: (handling) => axios.get(`${http}${pathBe}:${reasonCategory}/handling/createHandling`, { params: handling }),

  closeHandling: (params) =>
    axios.get(`${http}${pathBe}:${reasonCategory}/handling/closeHandling`, {
      params,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    }),

  checkRepeatedHandling: params => axios.get(`${http}${pathBe}:${handlings}/Handlings/IsRepeatedHandling`, { params }),
  fetchRegisteringCases: params => axios.get(`${http}${pathBe}:${reasonCategory}/handling/getRegisteringCases`, { params }),
  fetchLastHandlings: params => axios.get(`${http}${pathBe}:${handlings}/Handlings/GetPreviousOpenedHandlingsTabs`, { params }),
  fetchHandlingCoordinates: params => axios.get(`${http}${pathBe}:${reasonCategory}/handling/GetHandlingCoordinates`, { params }),
  setHandlingCoordinates: data => axios.post(`${http}${pathBe}:${reasonCategory}/handling/SetHandlingCoordinates`, data),
  fetchInteractionParamsForLinkedHandling: params => axios.get(`${http}${pathBe}:${interaction}/Interaction/GetInteractionParamsForLinkedHandling`, { params }),
  fetchHandlingStatus: params => axios.get(`${http}${pathBe}:${handlings}/Handlings/GetHandlingStatus`, { params })
}
