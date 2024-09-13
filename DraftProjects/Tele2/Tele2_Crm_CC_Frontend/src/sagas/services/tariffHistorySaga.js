import { call, put } from 'redux-saga/effects'
import moment from 'moment'

import { notification } from 'antd'

import {
  FETCH_SUBSCRIBER_TARIFF_HISTORY_SUCCESS,
  FETCH_SUBSCRIBER_TARIFF_HISTORY_ERROR,
  FETCH_SUBSCRIBER_TARIFF_HISTORY_FAILURE
} from 'reducers/services/tariffHistoryReducer'

import api from 'utils/api'
import { defaultDateFormat } from 'constants/shared'

export function * fetchSubscriberTariffHistorySaga ({ payload }) {
  const { fetchSubscriberTariffHistory } = api

  const message = 'История тарифов'
  try {
    const { msisdn, beginDate, endDate } = payload
    const params = { beginDate, endDate }
    const response = yield call(fetchSubscriberTariffHistory, msisdn, params)

    if (response.status === 200) {
      const History = response?.data

      for (const item of History) {
        const { StartDateTime, EndDateTime } = item

        item.StartDateTime = moment(StartDateTime).format(defaultDateFormat)
        item.EndDateTime = moment(EndDateTime).format(defaultDateFormat)
      }

      yield put({ type: FETCH_SUBSCRIBER_TARIFF_HISTORY_SUCCESS, payload: History })
    } else {
      yield put({ type: FETCH_SUBSCRIBER_TARIFF_HISTORY_ERROR })
      notification.open({
        message,
        description: response?.Message,
        type: 'error'
      })
    }
  } catch (error) {
    yield put({ type: FETCH_SUBSCRIBER_TARIFF_HISTORY_FAILURE })
    notification.open({
      message,
      description: error?.message,
      type: 'error'
    })
  }
}
