import axios from 'axios'
import { reasonCategory } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchInteractionTemplateGroup: (params) =>
    axios.get(`${http}${pathBe}:${reasonCategory}/interactionTemplate/getInteractionTemplateGroup`, { params }),
  fetchInteractionTemplate: (params) =>
    axios.get(`${http}${pathBe}:${reasonCategory}/interactionTemplate/getInteractionTemplate`, { params }),
  modifyInteractionTemplate: (data) =>
    axios.post(`${http}${pathBe}:${reasonCategory}/interactionTemplate/modifyInteractionTemplate`, data),
  createInteractionTemplate: (data) =>
    axios.post(`${http}${pathBe}:${reasonCategory}/interactionTemplate/createInteractionTemplate`, data),
  deleteInteractionTemplate: (data) =>
    axios.post(`${http}${pathBe}:${reasonCategory}/interactionTemplate/deleteInteractionTemplate`, data)
}
