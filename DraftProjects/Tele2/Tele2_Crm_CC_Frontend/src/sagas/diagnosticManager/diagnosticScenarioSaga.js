import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'

import {
  DIAGNOSTIC_SCENARIOS_FETCH_SUCCESS,
  DIAGNOSTIC_SCENARIOS_FETCH_ERROR,
  DIAGNOSTIC_SCENARIOS_FETCH_FAILURE
} from 'reducers/diagnosticManager/diagnosticScenarioReducer'

export function * fetchDiagnosticScenariosSaga () {
  const { getDiagnosticScenarios } = api
  try {
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(getDiagnosticScenarios)

    IsSuccess
      ? yield put({ type: DIAGNOSTIC_SCENARIOS_FETCH_SUCCESS, payload: Data })
      : yield put({ type: DIAGNOSTIC_SCENARIOS_FETCH_ERROR, payload: MessageText })
  } catch ({ message }) {
    yield put({ type: DIAGNOSTIC_SCENARIOS_FETCH_FAILURE, payload: { errorMessage: message } })
    notification.error({
      message: 'Диагностика. Загрузка сценариев',
      description: message
    })
  }
}
