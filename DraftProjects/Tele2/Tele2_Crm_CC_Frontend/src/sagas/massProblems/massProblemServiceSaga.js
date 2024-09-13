import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

import {
  REGIONS_FETCH_SUCCESS,
  REGIONS_FETCH_ERROR,
  REGIONS_FETCH_FAILURE
} from 'reducers/massProblems/massProblemServiceReducer'

const { fetchMassProblemsRegions } = api

export function * fetchMassProblemsRegionsSaga () {
  try {
    const { data } = yield call(fetchMassProblemsRegions)
    if (data.IsSuccess) {
      yield put({ type: REGIONS_FETCH_SUCCESS, payload: { regions: data.Data } })
    } else {
      yield put({ type: REGIONS_FETCH_ERROR, payload: { error: data } })
    }
  } catch (error) {
    yield put({ type: REGIONS_FETCH_FAILURE, payload: { error: error.message } })
  }
}
