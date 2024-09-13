import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'

import {
  GET_CUSTOMER_SCENARIO_HISTORY_SUCCESS,
  GET_CUSTOMER_SCENARIO_HISTORY_ERROR,
  GET_CUSTOMER_SCENARIO_HISTORY_FAILURE
} from 'reducers/person/customerScenarioHistoryReducer'

import api from 'utils/api'
import { getErrorDescription } from 'utils/helpers'

const { getCustomerScenarioHistory } = api

export function * getCustomerScenarioHistorySaga ({ payload }) {
  const message = 'Получение истории выполненных сценариев'

  try {
    const { data, status } = yield call(getCustomerScenarioHistory, payload)
    switch (status) {
      case 200:
        yield put({ type: GET_CUSTOMER_SCENARIO_HISTORY_SUCCESS, payload: { data } })
        break
      default:
        yield put({ type: GET_CUSTOMER_SCENARIO_HISTORY_ERROR })
        const description = getErrorDescription(data)
        notification.error({ message, description: description })
    }
  } catch (exception) {
    yield put({ type: GET_CUSTOMER_SCENARIO_HISTORY_FAILURE, message: exception.message })
    notification.error({ message, description: exception.message })
  }
}
