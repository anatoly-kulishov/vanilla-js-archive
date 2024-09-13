import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

import {
  GET_OFFERS_HISTORY_FETCH_SUCCESS,
  GET_OFFERS_HISTORYY_FETCH_ERROR,
  GET_OFFERS_HISTORY_FETCH_FAILURE,
  GET_OFFERS_CBM_HISTORY_FETCH_SUCCESS,
  GET_OFFERS_CBM_HISTORYY_FETCH_ERROR,
  GET_OFFERS_CBM_HISTORY_FETCH_FAILURE
} from 'reducers/offersReducer'
import { notification } from 'antd'

const { fetchOffersHistory, fetchOffersCbmHistory } = api

export function * fetchOffersHistorySaga ({ payload: { name, msisdn, endDate, startDate } }) {
  const message = 'История предложений'

  try {
    const { data } = yield call(fetchOffersHistory, { name, msisdn, endDate, startDate })
    if (data.IsSuccess) {
      yield put({ type: GET_OFFERS_HISTORY_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: GET_OFFERS_HISTORYY_FETCH_ERROR, payload: data })
      notification.warn({ message, description: data.MessageText })
    }
  } catch (exception) {
    yield put({ type: GET_OFFERS_HISTORY_FETCH_FAILURE, message: exception.message })
    notification.error({ message, description: exception.message })
  }
}

export function * fetchOffersCbmHistorySaga ({ payload }) {
  const message = 'История предложений CBM'

  try {
    const { data } = yield call(fetchOffersCbmHistory, payload)
    if (data.IsSuccess) {
      yield put({ type: GET_OFFERS_CBM_HISTORY_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: GET_OFFERS_CBM_HISTORYY_FETCH_ERROR, payload: data })
      notification.warn({ message, description: data.MessageText })
    }
  } catch (exception) {
    yield put({ type: GET_OFFERS_CBM_HISTORY_FETCH_FAILURE, message: exception.message })
    notification.error({ message, description: exception.message })
  }
}
