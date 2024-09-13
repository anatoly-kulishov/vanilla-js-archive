import { call, put, select } from 'redux-saga/effects'
import api from 'utils/api'
import { selectPersonalAccount } from 'reducers/personalInfo/selectors'
import { setPhoneNumberCategory } from '../reducer'

const { fetchPhoneNumberCategory } = api
export function * fetchCategorySaga () {
  try {
    const { Msisdn, BillingBranchId } = yield select(selectPersonalAccount)
    const { data: response } = yield call(fetchPhoneNumberCategory, {
      msisdn: Msisdn,
      branchId: BillingBranchId
    })
    yield put(setPhoneNumberCategory(response))
  } catch (error) {
    yield put(setPhoneNumberCategory(null))
  }
}
