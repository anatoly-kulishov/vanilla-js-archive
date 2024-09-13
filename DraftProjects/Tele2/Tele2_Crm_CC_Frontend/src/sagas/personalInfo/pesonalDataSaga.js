import { call, put, select } from 'redux-saga/effects'
import { notification } from 'antd'
import md5 from 'md5'

import {
  PERSONAL_DATA_FETCH_SUCCESS,
  PERSONAL_DATA_FETCH_ERROR,
  PERSONAL_DATA_FETCH_FAILURE,
  SET_PERSONAL_DATA_FAILURE,
  SET_PERSONAL_DATA_SUCCESS,
  SET_PERSONAL_DATA_ERROR
} from 'reducers/personalInfo/personalDataReducer'

import { getQueryParamsState, getPersonalAccountState, getUserState } from 'selectors'
import api from 'utils/api'

const { fetchPersonalData, setPersonalData } = api

export function * fetchPersonalDataSaga () {
  const queryParams = yield select(getQueryParamsState)
  const personalAccount = yield select(getPersonalAccountState)
  const user = yield select(getUserState)

  const { handlingTechId } = queryParams
  const { BillingBranchId: branchId, SubscriberId: subscriberId, ClientId: clientId, Msisdn: msisdn } = personalAccount
  const { email } = user

  const key = md5(`${branchId}${subscriberId}${handlingTechId}${email.toLowerCase()}`)

  try {
    const { data } = yield call(fetchPersonalData, { key, handlingTechId, branchId, subscriberId, clientId, msisdn })
    if (data.IsSuccess) {
      yield put({ type: PERSONAL_DATA_FETCH_SUCCESS, payload: data.Data })
    } else {
      yield put({ type: PERSONAL_DATA_FETCH_ERROR, payload: { error: data } })
      notification.error({
        message: `Ошибка`,
        description: data.MessageText
      })
    }
  } catch (error) {
    yield put({ type: PERSONAL_DATA_FETCH_FAILURE, message: error.message })
  }
}

export function * setPersonalDataSaga ({ payload }) {
  const personalAccount = yield select(getPersonalAccountState)
  const { BillingBranchId: branchId, ClientId: clientId } = personalAccount
  try {
    const { status } = yield call(setPersonalData, payload, branchId, clientId)
    if (status === 200) {
      yield put({ type: SET_PERSONAL_DATA_SUCCESS })
    } else {
      yield put({ type: SET_PERSONAL_DATA_ERROR })
      notification.error({
        message: `Ошибка`,
        description: 'Сохранение ПД'
      })
    }
  } catch (error) {
    yield put({ type: SET_PERSONAL_DATA_FAILURE, message: error.message })
  }
}
