import { call, put, select } from 'redux-saga/effects'
import api from 'utils/api'

import { FETCH_WHO_IS_IT_SUCCESS } from 'reducers/personalInfo/numberOperatorBelongingReducer'
import { getPersonalAccountState } from 'selectors/index'

export default function * safeGetWhoIsIt () {
  try {
    const currentWhoIsIt = yield select(selectWhoIsIt)

    if (currentWhoIsIt) {
      return currentWhoIsIt
    }

    const { Msisdn } = yield select(getPersonalAccountState)
    const { data } = yield call(api.fetchWhoIsIt, { Msisdn })
    const { IsSuccess: isSuccess, Data: fetchedWhoIsIt } = data || {}

    if (isSuccess) {
      yield put({ type: FETCH_WHO_IS_IT_SUCCESS, payload: data })
      return fetchedWhoIsIt
    } else {
      throw new Error()
    }
  } catch {
    return {}
  }
}

export const selectWhoIsIt = state => state.personalInfo?.numberOperatorBelonging?.whoIsIt
