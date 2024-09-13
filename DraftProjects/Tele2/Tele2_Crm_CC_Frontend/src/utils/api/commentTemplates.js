import axios from 'axios'
import { reasonCategory } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  checkReasoncommentTemplates: reasonId =>
    axios.get(`${http}${pathBe}:${reasonCategory}/commentTemplates/checkReasonCommentTemplates?reasonId=${reasonId}`),

  fetchReasonCategoryCommentTemplates: params =>
    axios.get(`${http}${pathBe}:${reasonCategory}/commentTemplates/getCommentTemplatesByReasonCategory`, { params }),

  deleteReasonCategoryCommentTemplate: data =>
    axios.post(`${http}${pathBe}:${reasonCategory}/commentTemplates/deleteReasonCategoryCommentTemplate`, data),

  createReasonCategoryCommentTemplateTemplate: data =>
    axios.post(`${http}${pathBe}:${reasonCategory}/commentTemplates/createReasonCategoryCommentTemplate`, data),

  fetchcommentTemplates: params =>
    axios.get(`${http}${pathBe}:${reasonCategory}/commentTemplates/getCommentTemplates`, { params }),

  createCommentTemplate: data =>
    axios.post(`${http}${pathBe}:${reasonCategory}/commentTemplates/createCommentTemplate`, data),

  deleteCommentTemplate: commentTemplateId =>
    axios.post(
      `${http}${pathBe}:${reasonCategory}/commentTemplates/deleteCommentTemplate?commentTemplateId=${commentTemplateId}`
    ),

  modifyCommentTemplate: data =>
    axios.post(`${http}${pathBe}:${reasonCategory}/commentTemplates/modifyCommentTemplate`, data)
}
