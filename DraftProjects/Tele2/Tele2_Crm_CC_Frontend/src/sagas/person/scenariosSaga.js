import { all, call, put, select, take } from 'redux-saga/effects'
import { notification } from 'antd'

import {
  CREATE_SCENARIO_ERROR,
  CREATE_SCENARIO_FAILURE,
  CREATE_SCENARIO_SUCCESS,
  GET_SCENARIOS,
  GET_SCENARIOS_ERROR,
  GET_SCENARIOS_FAILURE,
  GET_SCENARIOS_SUCCESS,
  MODIFY_SCENARIO,
  MODIFY_SCENARIO_ERROR,
  MODIFY_SCENARIO_FAILURE,
  MODIFY_SCENARIO_SUCCESS
} from 'reducers/person/scenariosReducer'

import api from 'utils/api'
import { getHandlingId, getPersonalAccountState, getQueryParamsState, getUserState } from 'selectors/index'
import { getErrorDescription } from 'utils/helpers'

const { getScenarios, createScenario, modifyScenario } = api

export function * getScenariosSaga () {
  const message = 'Получение сценариев'

  try {
    const { msisdn, scenarioName, linkedHandlingId } = yield select(getQueryParamsState)

    const params = {
      ClickMsisdn: msisdn,
      ScenarioName: scenarioName,
      LinkedHandlingId: linkedHandlingId
    }

    const { data, status } = yield call(getScenarios, params)
    switch (status) {
      case 200:
        yield put({ type: GET_SCENARIOS_SUCCESS, payload: data })
        break
      default:
        yield put({ type: GET_SCENARIOS_ERROR })
        const description = getErrorDescription(data)
        notification.error({ message, description })
    }
  } catch (exception) {
    yield put({ type: GET_SCENARIOS_FAILURE, message: exception.message })
    notification.error({ message, description: exception.message })
  }
}

export function * createScenarioSaga ({ payload }) {
  const message = 'Создание сценария'

  try {
    const { Link, IsLinkedHandling, ...restPayload } = payload
    const [handlingId, user, personalAccount, queryParams] = yield all([
      select(getHandlingId),
      select(getUserState),
      select(getPersonalAccountState),
      select(getQueryParamsState)
    ])

    const { Msisdn } = personalAccount
    const { login } = user
    const { linkedHandlingId, linkedMsisdn, serviceChannelId, handlingTechId } = queryParams

    const body = {
      ...restPayload,
      HandlingId: handlingId,
      Msisdn,
      CreatedBy: login,
      LinkedHandlingId: linkedHandlingId,
      LinkedHandlingMsisdn: linkedMsisdn
    }

    const { data, status } = yield call(createScenario, body)
    switch (status) {
      case 200:
        yield put({ type: CREATE_SCENARIO_SUCCESS, payload: data })
        notification.success({ message, description: 'Сценарий успешно создан' })
        if (Link) {
          let nextLink = Link
          if (IsLinkedHandling) {
            const { ClickMsisdn, ScenarioName } = payload
            const nextLinkParams = new URLSearchParams()

            nextLinkParams.append('linkedHandlingId', handlingId)
            nextLinkParams.append('msisdn', ClickMsisdn)
            nextLinkParams.append('serviceChannelId', serviceChannelId)
            nextLinkParams.append('linkedHandlingTechId', handlingTechId)
            nextLinkParams.append('linkedMsisdn', Msisdn)
            nextLinkParams.append('scenarioName', ScenarioName)

            nextLink = new URL(window.location.href)
            nextLink.search = nextLinkParams.toString()
          }
          open(nextLink, '_blank')
        }
        break
      default:
        yield put({ type: CREATE_SCENARIO_ERROR })
        const description = getErrorDescription(data)
        notification.error({ message, description })
    }
  } catch (exception) {
    yield put({ type: CREATE_SCENARIO_FAILURE, message: exception.message })
    notification.error({ message, description: exception.message })
  }
}

export function * modifyScenarioSaga ({ payload }) {
  const message = 'Изменение сценария'

  try {
    const [queryParams, handlingId] = yield all([select(getQueryParamsState), select(getHandlingId)])
    const { msisdn } = queryParams

    const body = { handlingId, msisdn }
    const { id } = payload

    const { data, status } = yield call(modifyScenario, id, body)
    switch (status) {
      case 200:
        yield put({ type: MODIFY_SCENARIO_SUCCESS, payload: data })
        break
      default:
        yield put({ type: MODIFY_SCENARIO_ERROR })
        const description = getErrorDescription(data)
        notification.error({ message, description })
    }
  } catch (exception) {
    yield put({ type: MODIFY_SCENARIO_FAILURE, message: exception.message })
    notification.error({ message, description: exception.message })
  }
}

export function * modifyCurrentScenarioSaga () {
  yield put({ type: GET_SCENARIOS })
  const { payload: scenarios } = yield take(GET_SCENARIOS_SUCCESS)
  if (scenarios?.length) {
    const { id } = scenarios[0]
    yield put({ type: MODIFY_SCENARIO, payload: { id } })
  }
}
