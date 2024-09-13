import { call, put, select } from 'redux-saga/effects'
import { getUserState } from 'selectors/index'
import moment from 'moment'

import {
  SUZ_TOKEN_FETCH_SUCCESS,
  SUZ_TOKEN_FETCH_ERROR,
  SUZ_TOKEN_FETCH_FAILURE
} from 'reducers/internal/suzTokenReducer'

import api from 'utils/api'

export function * fetchSuzTokenSaga () {
  const user = yield select(getUserState)
  const { fetchSuzToken, hashSuzRequest } = api

  try {
    const suzParameters = {
      client: 't2_crm',
      login: user.displayName,
      t: moment().valueOf(), /* eslint-disable-line */ // It's for SUZ
      due_to: moment().add(1, 'minutes').valueOf()
    }

    // Sign SUZ parameters
    const { data: { IsSuccess: isParametersSignSuccess, Data } } = yield call(hashSuzRequest, { Data: JSON.stringify(suzParameters) })

    if (isParametersSignSuccess) {
      const { data } = yield call(fetchSuzToken, { data: suzParameters, hash: Data })
      const { success } = data

      if (success) {
        const { result: { token } } = data
        const { data: { IsSuccess: isTokenSignSuccess, Data } } = yield call(hashSuzRequest, { Data: token })
        if (isTokenSignSuccess) {
          yield put({ type: SUZ_TOKEN_FETCH_SUCCESS, payload: { suzToken: token, suzTokenSign: Data } })
        }
      } else {
        yield put({ type: SUZ_TOKEN_FETCH_ERROR, payload: data })
      }
    }
  } catch (exception) {
    yield put({ type: SUZ_TOKEN_FETCH_FAILURE, message: exception.message })
  }
}
