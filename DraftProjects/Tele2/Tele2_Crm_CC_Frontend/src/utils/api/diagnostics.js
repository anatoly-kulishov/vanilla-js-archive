import axios from 'axios'
import { diagnostics } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  fetchCoveragesAndOffices: data => axios.post(`${http}${pathBe}:${diagnostics}/SmartGis/GetCoveragesAndOffices`, data),
  fetchAbonentCoordinates: params => axios.get(`${http}${pathBe}:${diagnostics}/SmartGis/GetCoordinates`, { params }),
  fetchTechnologySubtechnologyLink: params =>
    axios.get(`${http}${pathBe}:${diagnostics}/SmartGisAdmin/GetTechnologySubtechnologyLink`, { params }),
  fetchParameters: params => axios.get(`${http}${pathBe}:${diagnostics}/SmartGisAdmin/GetParameters`, { params }),
  fetchDeviationLevel: params => axios.get(`${http}${pathBe}:${diagnostics}/SmartGis/GetDeviationLevel`, { params }),
  createCoveragesAndOfficesNote: data =>
    axios.post(`${http}${pathBe}:${diagnostics}/SmartGis/RegisterCoveragesAndOfficesNote`, data)
}
