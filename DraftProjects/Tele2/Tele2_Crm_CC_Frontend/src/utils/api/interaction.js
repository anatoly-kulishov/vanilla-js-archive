import axios from 'axios'
import { reasonCategory, interaction } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchInteractions: (handlingId, msisdn, email, includeRepeatingEntries) =>
    axios({
      url: `${http}${pathBe}:${interaction}/interaction/v2/GetInteractionsBox`,
      method: 'GET',
      params: {
        handlingId,
        msisdn,
        email,
        includeRepeatingEntries
      },
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    }),

  createInteraction: (params) =>
    axios({
      url: `${http}${pathBe}:${reasonCategory}/handling/createInteraction`,
      method: 'GET',
      params: params,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    }),

  deleteInteraction: (interactionId, handlingId) =>
    axios.get(`${http}${pathBe}:${reasonCategory}/handling/deleteInteraction?interactionId=${interactionId}&handlingId=${handlingId}`),

  editInteractionComment: (params) =>
    axios.post(`${http}${pathBe}:${interaction}/Interaction/ModifyInteractionComment`, params),

  markInteractionSms: (interactionId, handlingId, isSmsSent) =>
    axios({
      url: `${http}${pathBe}:${reasonCategory}/handling/markInteractionSms`,
      method: 'GET',
      data: {
        interactionId,
        handlingId,
        isSmsSent
      }
    }),
  fetchLinkedInteractions: (params) => axios.get(`${http}${pathBe}:${interaction}/Interaction/GetLinkedInteractions`, { params })
}
