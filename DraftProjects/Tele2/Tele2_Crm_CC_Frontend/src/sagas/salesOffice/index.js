import { all, takeEvery } from 'redux-saga/effects'
import {
  GET_ACTIVE_SALES_OFFICE,
  GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO,
  CHANGE_ACTIVE_SALES_OFFICE
} from 'reducers/salesOffice/salesOfficeReducer'
import {
  getActiveSalesOfficeSaga,
  getPotentialActiveSalesOfficeInfoSaga,
  changeActiveSalesOfficeSaga
} from './salesOfficeSaga'

export default function * () {
  yield all([
    takeEvery(GET_ACTIVE_SALES_OFFICE, getActiveSalesOfficeSaga),
    takeEvery(GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO, getPotentialActiveSalesOfficeInfoSaga),
    takeEvery(CHANGE_ACTIVE_SALES_OFFICE, changeActiveSalesOfficeSaga)
  ])
}
