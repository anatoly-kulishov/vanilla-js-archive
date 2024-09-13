import axios from 'axios'
import { reasonCategory, reasonCategoryMatrix } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchReasonsCategoriesList: (params) =>
    axios.get(`${http}${pathBe}:${reasonCategoryMatrix}/ReasonCategoryMatrix/GetReasonCategoryList`, { params }),

  fetchReasonsCategories: (params) =>
    axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/getReasonCategories`, { params }),

  createreasonCategory: (params) => axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/createReasonCategory`, { params }),
  deletereasonCategory: (params) => axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/deleteReasonCategory`, { params }),
  modifyreasonCategory: (params) => axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/modifyReasonCategory`, { params }),
  fetchReasonCategoryForEscalation: (params) => axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/getReasonCategoryForEscalation`, { params }),

  fetchLocationHistory: params => axios.get(`${http}${pathBe}:${reasonCategory}/handling/GetLocationHistory`, { params })
}
