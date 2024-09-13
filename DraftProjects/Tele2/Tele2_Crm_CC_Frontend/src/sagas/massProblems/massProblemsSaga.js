import { call, put, select } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'

import {
  REGION_PROBLEM_FETCH_SUCCESS,
  REGION_PROBLEM_FETCH_ERROR,
  REGION_PROBLEM_FETCH_FAILURE,
  GET_SERVICE_CHANNEL_INTERFACES_SUCCESS,
  GET_SERVICE_CHANNEL_INTERFACES_ERROR,
  GET_SERVICE_CHANNEL_INTERFACES_FAILURE
} from 'reducers/massProblems/massProblemForRegionReducer'

import {
  REGISTER_NOTE_FETCH_SUCCESS,
  REGISTER_NOTE_FETCH_ERROR,
  REGISTER_NOTE_FETCH_FAILURE,
  FETCH_SUBSCRIBER_INFO_SUCCESS,
  FETCH_SUBSCRIBER_INFO_FAILURE,
  CLEAR_MSISDN_STATUS_ARRAY
} from 'reducers/massProblems/massProblemRegisterNoteReducer'

import { FETCH_INTERACTIONS } from 'reducers/reasonsRegisteringReducer'

import { getMsisdnStatusArray } from 'selectors'

import { websellerPreprocessMassProblemForRegionSaga } from 'webseller/integration/massProblems/sagas'
import { selectIsWebSeller } from 'webseller/common/user/selectors'

const { fetchMassProblemForRegion, fetchRegisterMassProblemNote, fetchPersonalInfo, getServiceChannelInterface } = api

export function * fetchMassProblemForRegionSaga ({ payload }) {
  try {
    const isWebSeller = yield select(selectIsWebSeller)
    let requestData = payload
    if (isWebSeller) {
      requestData = yield call(websellerPreprocessMassProblemForRegionSaga, payload)
    }
    const { data } = yield call(fetchMassProblemForRegion, requestData)
    if (data.IsSuccess) {
      yield put({ type: REGION_PROBLEM_FETCH_SUCCESS, payload: { regionProblem: data.Data } })
    } else {
      yield put({ type: REGION_PROBLEM_FETCH_ERROR, payload: { error: data.MessageText } })
      notification.open({
        message: 'Массовые проблемы',
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (error) {
    yield put({ type: REGION_PROBLEM_FETCH_FAILURE, payload: { error: error.message } })
    notification.open({
      message: 'Массовые проблемы',
      description: error.message,
      type: 'error'
    })
  }
}

export function * getServiceChannelInterfaceSaga ({ payload }) {
  try {
    const { data } = yield call(getServiceChannelInterface, payload)
    if (data.IsSuccess) {
      yield put({ type: GET_SERVICE_CHANNEL_INTERFACES_SUCCESS, payload: { serviceChanellInterfaces: data.Data } })
    } else {
      yield put({ type: GET_SERVICE_CHANNEL_INTERFACES_ERROR, payload: { error: data } })
    }
  } catch (error) {
    yield put({ type: GET_SERVICE_CHANNEL_INTERFACES_FAILURE, payload: { error: error.message } })
  }
}

export function * fetchMassProblemRegisterNoteSaga ({ payload }) {
  try {
    const { handlingId, msisdn, email } = payload
    const { data } = yield call(fetchRegisterMassProblemNote, payload)
    if (data.IsSuccess) {
      yield put({
        type: FETCH_INTERACTIONS,
        payload: {
          handlingId: handlingId,
          msisdn: msisdn,
          email: email,
          includeRepeatingEntries: true
        }
      })
      yield put({ type: REGISTER_NOTE_FETCH_SUCCESS, payload: { mtpNote: data.Data } })
      yield put({ type: CLEAR_MSISDN_STATUS_ARRAY })
    } else {
      yield put({ type: REGISTER_NOTE_FETCH_ERROR, payload: { error: data } })
      notification.open({
        message: 'Регистрация причины категории по массовой проблеме',
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (error) {
    yield put({ type: REGISTER_NOTE_FETCH_FAILURE, payload: { error: error.message } })
  }
}

export function * fetchSubsriberInfoSaga ({ payload }) {
  const { msisdn, key } = payload
  const msisdnStatusArray = yield select(getMsisdnStatusArray)

  try {
    const { data } = yield call(fetchPersonalInfo, { msisdn })
    const msisdnStatusObj = {
      msisdn,
      isAnonymous: data.Data.IsAnonymous
    }

    const copyMsisdnStatusArray = [...msisdnStatusArray]
    copyMsisdnStatusArray[key] = msisdnStatusObj

    yield put({ type: FETCH_SUBSCRIBER_INFO_SUCCESS, payload: { copyMsisdnStatusArray } })
  } catch (ex) {
    yield put({ type: FETCH_SUBSCRIBER_INFO_FAILURE, payload: { message: ex.message } })
    notification.open({
      message: 'Получение данных об абоненте',
      description: ex.message,
      type: 'error'
    })
  }
}
