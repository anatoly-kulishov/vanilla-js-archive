import { call, put, select } from 'redux-saga/effects'
import {
  ALLOCATED_INFO_FETCH_SUCCESS,
  ALLOCATED_INFO_FETCH_ERROR,
  ALLOCATED_INFO_FETCH_FAILURE
} from 'reducers/internal/allocatedInfoReducer'
import { ADD_NOTIFICATION } from 'reducers/internal/notifications'
import { getPersonalAccountState } from 'selectors'
import { NONE } from 'constants/redirectTypes'
import api from 'utils/api'

export function * fetchAllocatedInfoSaga () {
  const { fetchAllocatedInfo } = api
  const personalAccount = yield select(getPersonalAccountState)

  try {
    const { Msisdn: msisdn } = personalAccount
    const { data } = yield call(fetchAllocatedInfo, { msisdn })
    if (data.IsSuccess) {
      const { Data, MessageText } = data
      if (Data.IsNumberFound) {
        yield put({ type: ALLOCATED_INFO_FETCH_SUCCESS, payload: { allocatedInfo: MessageText, isAllocatedShow: true } })
        yield put({
          type: ADD_NOTIFICATION,
          payload: {
            description: 'Особые правила консультации ->',
            type: 'error',
            redirectType: NONE
          }
        })
      }
    } else {
      yield put({ type: ALLOCATED_INFO_FETCH_ERROR })
    }
  } catch (exception) {
    yield put({ type: ALLOCATED_INFO_FETCH_FAILURE, message: exception.message })
  }
}
