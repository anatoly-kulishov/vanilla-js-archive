import axios from 'axios'
import { restrictionManagement } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')
const service = 'RestrictionManagement'

export default {
  fetchClientRestrictions: params => axios.get(`${http}${pathBe}:${restrictionManagement}/${service}/GetRestrictions`, { params }),
  changeClientRestriction: data => axios.post(`${http}${pathBe}:${restrictionManagement}/${service}/ChangeRestriction`, data),
  removeAllClientRestrictions: data => axios.post(`${http}${pathBe}:${restrictionManagement}/${service}/RemoveAllRestrictions`, data)
}
