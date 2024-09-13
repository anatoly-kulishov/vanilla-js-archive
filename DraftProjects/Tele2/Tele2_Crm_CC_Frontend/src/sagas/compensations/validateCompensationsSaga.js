import { call, put, select, all } from 'redux-saga/effects'
import { notification } from 'antd'
import { isNil, isNull } from 'lodash'
import api from 'utils/api'
import { getValidationMessagesArray, getPersonalAccountState } from 'selectors'
import { addCompensationsMessages } from './compensationsSaga'
import { successMessageType, errorMessageType, warningMessageType } from 'constants/compensations'

import {
  VALIDATE_PAYD_HISTORY_SUCCESS,
  VALIDATE_PAYD_HISTORY_ERROR,
  VALIDATE_PAYD_HISTORY_FAILURE,

  VALIDATE_PAYD_SERVICE_SUCCESS,
  VALIDATE_PAYD_SERVICE_ERROR,
  VALIDATE_PAYD_SERVICE_FAILURE,

  VALIDATE_PAYD_SERVICE_HISTORY_SUCCESS,
  VALIDATE_PAYD_SERVICE_HISTORY_ERROR,
  VALIDATE_PAYD_SERVICE_HISTORY_FAILURE,

  VALIDATE_PAYD_SERVICE_ENABLED_SUCCESS,
  VALIDATE_PAYD_SERVICE_ENABLED_ERROR,
  VALIDATE_PAYD_SERVICE_ENABLED_FAILURE,

  VALIDATE_PAYD_SERVICE_AVAILABLE_SUCCESS,
  VALIDATE_PAYD_SERVICE_AVAILABLE_ERROR,
  VALIDATE_PAYD_SERVICE_AVAILABLE_FAILURE
} from 'reducers/compensations/validationCompensationsReducer'

const {
  validatePaydHistory,
  validatePaydService,
  validatePaydServiceHistory,
  validatePaydServiceEnabled,
  validatePaydServiceAvailable
} = api

const checkInitializedWarnings = warnings => !!(warnings && warnings.length !== 0)

export function * validatePaydHistorySaga ({ payload }) {
  try {
    const { data: { IsSuccess, MessageText } } = yield call(validatePaydHistory, payload) // Data ?
    const validationMessagesArray = yield select(getValidationMessagesArray)
    const newValidationMessagesArray = [ ...validationMessagesArray ]
    if (IsSuccess) {
      addCompensationsMessages(newValidationMessagesArray, successMessageType, MessageText)
      yield put({ type: VALIDATE_PAYD_HISTORY_SUCCESS, payload: { newValidationMessagesArray } })
    } else {
      addCompensationsMessages(newValidationMessagesArray, errorMessageType, MessageText)
      yield put({ type: VALIDATE_PAYD_HISTORY_ERROR, payload: { newValidationMessagesArray } })
    }
  } catch (exception) {
    yield put({ type: VALIDATE_PAYD_HISTORY_FAILURE, message: exception.message })
    notification.open({
      message: `Получение истории зачисления`,
      description: exception.message,
      type: 'error'
    })
  }
}

export function * validatePaydServiceSaga ({ payload }) {
  try {
    const { data: { Data: validatePaydServiceData, IsSuccess, MessageText, Warnings } } = yield call(validatePaydService, payload)
    const validationMessagesArray = yield select(getValidationMessagesArray)
    const isInitializedWarnings = checkInitializedWarnings(Warnings)
    const newValidationMessagesArray = [ ...validationMessagesArray ]
    if (IsSuccess) {
      const messageType = isInitializedWarnings ? warningMessageType : successMessageType
      isInitializedWarnings && Warnings.map(warning => addCompensationsMessages(newValidationMessagesArray, messageType, warning))
      yield put({ type: VALIDATE_PAYD_SERVICE_SUCCESS, payload: { newValidationMessagesArray, isInitializedWarnings, validatePaydServiceData } })
    } else {
      addCompensationsMessages(newValidationMessagesArray, errorMessageType, MessageText)
      yield put({ type: VALIDATE_PAYD_SERVICE_ERROR, payload: { newValidationMessagesArray, isInitializedWarnings } })
      notification.open({
        message: `Допуск абонента к операциям компенсаций`,
        description: MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: VALIDATE_PAYD_SERVICE_FAILURE, message: exception.message })
    notification.open({
      message: `Допуск абонента к операциям компенсаций`,
      description: exception.message,
      type: 'error'
    })
  }
}

export function * validatePaydServiceHistorySaga ({ payload }) {
  try {
    const { data: { Data: paydServiceHistory, IsSuccess, MessageText } } = yield call(validatePaydServiceHistory, payload)
    const validationMessagesArray = yield select(getValidationMessagesArray)
    const newValidationMessagesArray = [ ...validationMessagesArray ]

    if (IsSuccess) {
      addCompensationsMessages(newValidationMessagesArray, successMessageType, MessageText)
      yield put({ type: VALIDATE_PAYD_SERVICE_HISTORY_SUCCESS, payload: { newValidationMessagesArray, paydServiceHistory } })
    } else {
      // addCompensationsMessages(newValidationMessagesArray, errorMessageType, MessageText)
      yield put({ type: VALIDATE_PAYD_SERVICE_HISTORY_ERROR })
      notification.open({
        message: `История подключения пакетов`,
        description: MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: VALIDATE_PAYD_SERVICE_HISTORY_FAILURE, message: exception.message })
    notification.open({
      message: `История подключения пакетов`,
      description: exception.message,
      type: 'error'
    })
  }
}

export function * validatePaydServiceEnabledSaga ({ payload }) {
  try {
    const [personalAccountState, validationMessagesArray] = yield all([
      select(getPersonalAccountState),
      select(getValidationMessagesArray)
    ])
    const { data: { IsSuccess, MessageText, Warnings } } = yield call(validatePaydServiceEnabled, { msisdn: personalAccountState?.Msisdn })
    const newValidationMessagesArray = [ ...validationMessagesArray ]
    const isInitializedWarnings = checkInitializedWarnings(Warnings)
    if (IsSuccess) {
      const messageType = isInitializedWarnings ? warningMessageType : successMessageType
      isInitializedWarnings && Warnings.map(warning => addCompensationsMessages(newValidationMessagesArray, messageType, warning))
      yield put({ type: VALIDATE_PAYD_SERVICE_ENABLED_SUCCESS, payload: { newValidationMessagesArray, isInitializedWarnings } })
    } else {
      const { serviceTypeId } = payload
      !isNull(serviceTypeId) && addCompensationsMessages(newValidationMessagesArray, errorMessageType, MessageText)
      yield put({ type: VALIDATE_PAYD_SERVICE_ENABLED_ERROR, payload: { newValidationMessagesArray, isInitializedWarnings } })
    }
  } catch (exception) {
    yield put({ type: VALIDATE_PAYD_SERVICE_ENABLED_FAILURE, message: exception.message })
    notification.open({
      message: `Валидация подключенных компенсационных пакетов`,
      description: exception.message,
      type: 'error'
    })
  }
}

export function * validatePaydServiceAvailableSaga ({ payload }) {
  try {
    const { data: { Data: availablePackages, IsSuccess, MessageText, Warnings } } = yield call(validatePaydServiceAvailable, payload)
    const validationMessagesArray = yield select(getValidationMessagesArray)
    const isInitializedWarnings = checkInitializedWarnings(Warnings)
    const newValidationMessagesArray = [ ...validationMessagesArray ]

    if (IsSuccess) {
      const { serviceTypeId, serviceSizeId } = payload
      const isDuplicateMessageRenderNeed = isNil(serviceTypeId) && isNil(serviceSizeId)

      const messageType = isInitializedWarnings ? warningMessageType : successMessageType
      isDuplicateMessageRenderNeed && isInitializedWarnings && Warnings.map(warning => addCompensationsMessages(newValidationMessagesArray, messageType, warning))
      yield put({ type: VALIDATE_PAYD_SERVICE_AVAILABLE_SUCCESS, payload: { newValidationMessagesArray, isInitializedWarnings, availablePackages } })
    } else {
      addCompensationsMessages(newValidationMessagesArray, errorMessageType, MessageText)
      yield put({ type: VALIDATE_PAYD_SERVICE_AVAILABLE_ERROR, payload: { newValidationMessagesArray, isInitializedWarnings } })
    }
  } catch (exception) {
    yield put({ type: VALIDATE_PAYD_SERVICE_AVAILABLE_FAILURE, message: exception.message })
    notification.open({
      message: `Валидация разрешённых компенсационных пакетов`,
      description: exception.message,
      type: 'error'
    })
  }
}
