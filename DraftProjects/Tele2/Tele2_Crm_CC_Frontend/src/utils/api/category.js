import axios from 'axios'
import { reasonCategory } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchCategories: (params) => axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/getCategories`, { params }),

  modifyCategory: (params) => axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/modifyCategory`, { params }),
  createCategory: (params) => axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/createCategory`, { params }),
  deleteCategory: (categoryId) => axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/deleteCategory?categoryId=${categoryId}`),
  backupCategory: (categoryId) => axios.get(`${http}${pathBe}:${reasonCategory}/reasonCategory/backupCategory?categoryId=${categoryId}`)
}
