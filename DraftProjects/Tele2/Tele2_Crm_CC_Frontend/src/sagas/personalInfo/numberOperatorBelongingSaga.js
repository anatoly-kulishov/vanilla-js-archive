import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

import {
  FETCH_WHO_IS_IT_SUCCESS,
  FETCH_WHO_IS_IT_ERROR,
  FETCH_WHO_IS_IT_FAILURE
} from 'reducers/personalInfo/numberOperatorBelongingReducer'

const { fetchWhoIsIt } = api

export function * fetchWhoIsItSaga ({ payload }) {
  try {
    const { data } = yield call(fetchWhoIsIt, payload)
    data.IsSuccess
      ? yield put({ type: FETCH_WHO_IS_IT_SUCCESS, payload: data })
      : yield put({ type: FETCH_WHO_IS_IT_ERROR, payload: data })
  } catch (exception) {
    yield put({ type: FETCH_WHO_IS_IT_FAILURE, message: exception.message })
  }
}
