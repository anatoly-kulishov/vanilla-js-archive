import { put, select, call, delay } from 'redux-saga/effects'
import { cloneDeep, isObject } from 'lodash'
import diagnosticManager from 'utils/api'
import {
  CREATE_DIAGNOSTIC_CONTEXT,
  UPDATE_DIAGNOSTIC_CONTEXT,
  ADD_DIAGNOSTIC_MESSAGE
} from 'reducers/diagnosticManager/diagnosticManagerReducer'
import { INFO, ERROR } from 'constants/diagnosticManagerMessageTypes'
import { IN, OUT } from 'constants/diagnosticManagerMessage'
import {
  DIAGNOSTIC_MANAGER_ERROR,
  DIAGNOSTIC_MANAGER_ERROR_DESCRIPTION
} from 'constants/diagnosticManagerStrings'
import { createHandlingData, createScenarioData, getHandlingData, getScenarioData, getStepData } from 'selectors/diagnosticManagerSelector'
import { replaceAngelBrakets } from 'utils/helpers'

export function * startDiagnosticSaga ({ payload: { selectedScenarioId } }) {
  const { getDiagnosticManager } = diagnosticManager
  // Creating diagnostic context
  const HandlingData = yield select(createHandlingData)
  const ScenarioData = yield select(createScenarioData, selectedScenarioId)
  yield put({ type: CREATE_DIAGNOSTIC_CONTEXT, payload: { HandlingData, ScenarioData } })
  // Call Diagnostic Manager
  try {
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(getDiagnosticManager, { HandlingData, ScenarioData })

    if (IsSuccess) {
      // Update diagnostic context
      yield put({ type: UPDATE_DIAGNOSTIC_CONTEXT, payload: Data })
      const {
        ScenarioData: { Messages },
        StepData: {
          Configuration: { TitleText },
          StepName
        }
      } = Data
      // Add messages
      yield addDiagnosticMessageSaga(Messages)
      // Add title text as message
      yield put({
        type: ADD_DIAGNOSTIC_MESSAGE,
        payload: { messageType: IN, type: INFO, text: TitleText, stepName: StepName }
      })
    } else {
      yield put({
        type: ADD_DIAGNOSTIC_MESSAGE,
        payload: { messageType: IN, type: ERROR, text: MessageText, stepName: 'Ошибка диспетчера диагностики' }
      })
    }
  } catch ({ message }) {
    yield put({
      type: ADD_DIAGNOSTIC_MESSAGE,
      payload: { messageType: IN, type: ERROR, text: message, stepName: 'Ошибка диспетчера диагностики' }
    })
  }
}

export function * stepDiagnosticSaga ({ payload }) {
  const { getDiagnosticManager } = diagnosticManager
  const HandlingData = yield select(getHandlingData)
  const ScenarioData = yield select(getScenarioData)
  const StepData = yield select(getStepData)

  // Create params for Diagnostic Manager after action click
  const newScenarioData = cloneDeep(ScenarioData)
  const newStepData = cloneDeep(StepData)

  delete newScenarioData.Messages
  delete newStepData.Configuration.Controls
  delete newStepData.Configuration.Actions

  const diagnosticManagerParams = {
    HandlingData,
    ScenarioData: newScenarioData,
    StepData: {
      ...newStepData,
      ...payload
    }
  }

  // Modify FinalText and insert it in messages array
  const {
    Configuration: { FinalText, Controls },
    StepName
  } = StepData

  if (FinalText) {
    // Replace all <Variables> from controls or return FinalText as is
    let modifiedFinalText = ''
    try {
      const { StepResult } = payload
      for (const controlName in StepResult) {
        if (isObject(StepResult[controlName])) {
          modifiedFinalText = replaceAngelBrakets(modifiedFinalText, StepResult[controlName])
        } else {
          const control = Controls?.find(control => control.Name === controlName)
          let label = control?.Params?.find(param => param.Key === StepResult[controlName])?.Value
          if (!label) {
            label = control?.Data
          }
          const regex = new RegExp(`<${controlName}>`, 'gim')
          modifiedFinalText = FinalText.replace(regex, label)
        }
      }
    } catch (error) {
      modifiedFinalText = FinalText
    }

    // Add modified FinalText from previous step in messages
    yield put({
      type: ADD_DIAGNOSTIC_MESSAGE,
      payload: { messageType: OUT, type: INFO, text: modifiedFinalText, stepName: StepName }
    })
  }

  // Call Diagnostic Manager
  try {
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(getDiagnosticManager, diagnosticManagerParams)

    if (IsSuccess) {
      const {
        ScenarioData: { Messages },
        StepData: {
          Configuration: { TitleText },
          StepName
        }
      } = Data
      yield put({ type: UPDATE_DIAGNOSTIC_CONTEXT, payload: Data })
      // Add messages
      yield addDiagnosticMessageSaga(Messages)
      // Add title text as message
      if (TitleText) {
        yield put({
          type: ADD_DIAGNOSTIC_MESSAGE,
          payload: { messageType: IN, type: INFO, text: TitleText, stepName: StepName }
        })
      }
    } else {
      yield put({
        type: ADD_DIAGNOSTIC_MESSAGE,
        payload: {
          messageType: IN,
          type: ERROR,
          text: MessageText,
          stepName: DIAGNOSTIC_MANAGER_ERROR,
          details: DIAGNOSTIC_MANAGER_ERROR_DESCRIPTION
        }
      })
    }
  } catch ({ message }) {
    yield put({
      type: ADD_DIAGNOSTIC_MESSAGE,
      payload: {
        messageType: IN,
        type: ERROR,
        text: message,
        stepName: DIAGNOSTIC_MANAGER_ERROR,
        details: DIAGNOSTIC_MANAGER_ERROR_DESCRIPTION
      }
    })
  }
}

// Adding array of messages with some delay
function * addDiagnosticMessageSaga (Messages) {
  if (Array.isArray(Messages)) {
    for (const message of Messages) {
      yield delay(400)
      yield put({
        type: ADD_DIAGNOSTIC_MESSAGE,
        payload: {
          messageType: IN,
          type: message.MessageType,
          text: message.MessageText,
          stepName: message.MessageStepName,
          items: message.MessageData,
          details: message.MessageDetails
        }
      })
    }
  }
}
