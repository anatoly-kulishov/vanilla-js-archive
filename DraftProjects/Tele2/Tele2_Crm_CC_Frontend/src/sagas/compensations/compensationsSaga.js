import { call, put, select, all } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'
import { successMessageType, errorMessageType } from 'constants/compensations'
import { getCompensationsMessagesArray, getQueryParamsState, getHandlingId } from 'selectors'

import {
  FETCH_PAYD_COMMENTS_SUCCESS,
  FETCH_PAYD_COMMENTS_ERROR,
  FETCH_PAYD_COMMENTS_FAILURE,

  FETCH_PAYD_SERVICE_TYPES_SUCCESS,
  FETCH_PAYD_SERVICE_TYPES_ERROR,
  FETCH_PAYD_SERVICE_TYPES_FAILURE,

  FETCH_PAYD_SERVICE_SIZES_SUCCESS,
  FETCH_PAYD_SERVICE_SIZES_ERROR,
  FETCH_PAYD_SERVICE_SIZES_FAILURE,

  CANCEL_COMPENSATION_SUCCESS,
  CANCEL_COMPENSATION_ERROR,
  CANCEL_COMPENSATION_FAILURE,

  MODIFY_COMPENSATION_SUCCESS,
  MODIFY_COMPENSATION_ERROR,
  MODIFY_COMPENSATION_FAILURE,

  ADD_COMPENSATION_SUCCESS,
  ADD_COMPENSATION_ERROR,
  ADD_COMPENSATION_FAILURE,

  ADD_SERVICE_COMPENSATION_SUCCESS,
  ADD_SERVICE_COMPENSATION_ERROR,
  ADD_SERVICE_COMPENSATION_FAILURE,

  FETCH_PAYD_REASON_ADVICE_DESCRIPTION_SUCCESS,
  FETCH_PAYD_REASON_ADVICE_DESCRIPTION_ERROR,
  FETCH_PAYD_REASON_ADVICE_DESCRIPTION_FAILURE,

  FETCH_AVAILABLE_BALANCES_SUCCESS,
  FETCH_AVAILABLE_BALANCES_ERROR,
  FETCH_AVAILABLE_BALANCES_FAILURE
} from 'reducers/compensations/compensationsReducer'

const {
  fetchPaydComments,
  fetchPaydServiceTypes,
  fetchPaydServiceSizes,

  cancelCompensation,
  modifyCompensation,
  addCompensation,
  addServiceCompensation,
  fetchPaydReasonAdviceDescription,
  fetchAvailableBalances
} = api

export const addCompensationsMessages = (newMessagesArray, MessageType, MessageText) => newMessagesArray.push({ MessageType, MessageText })

export function * fetchPaydServiceTypesSaga ({ payload }) {
  try {
    const { data:
      { Data, IsSuccess, MessageText }
    } = yield call(fetchPaydServiceTypes, {
      ...payload, isActive: payload?.isActive ?? true
    })

    if (IsSuccess) {
      yield put({ type: FETCH_PAYD_SERVICE_TYPES_SUCCESS, payload: { paydServiceTypes: Data } })
    } else {
      yield put({ type: FETCH_PAYD_SERVICE_TYPES_ERROR, payload: Data })
      notification.open({
        message: `Получение типов пакетов`,
        description: MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_PAYD_SERVICE_TYPES_FAILURE, message: exception.message })
    notification.open({
      message: `Получение типов пакетов`,
      description: exception.message,
      type: 'error'
    })
  }
}

export function * fetchPaydServiceSizesSaga ({ payload }) {
  try {
    const { data:
      { Data, IsSuccess, MessageText }
    } = yield call(fetchPaydServiceSizes, {
      ...payload, isActive: payload?.isActive ?? true
    })
    if (IsSuccess) {
      yield put({ type: FETCH_PAYD_SERVICE_SIZES_SUCCESS, payload: { paydServiceSizes: Data } })
    } else {
      yield put({ type: FETCH_PAYD_SERVICE_SIZES_ERROR, payload: Data })
      notification.open({
        message: `Получение размеров пакетов`,
        description: MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_PAYD_SERVICE_SIZES_FAILURE, message: exception.message })
    notification.open({
      message: `Получение размеров пакетов`,
      description: exception.message,
      type: 'error'
    })
  }
}

export function * fetchPaydCommentsSaga ({ payload }) {
  try {
    const { data: { Data, IsSuccess, MessageText } } = yield call(fetchPaydComments, payload)
    if (IsSuccess) {
      yield put({ type: FETCH_PAYD_COMMENTS_SUCCESS, payload: { paydComments: Data } })
    } else {
      yield put({ type: FETCH_PAYD_COMMENTS_ERROR, payload: Data })
      notification.open({
        message: `Получение комментариев`,
        description: MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_PAYD_COMMENTS_FAILURE, message: exception.message })
    notification.open({
      message: `Получение комментариев`,
      description: exception.message,
      type: 'error'
    })
  }
}

export function * cancelCompensationSaga ({ payload }) {
  try {
    const { data: { Data, IsSuccess, MessageText } } = yield call(cancelCompensation, payload)
    if (IsSuccess) {
      yield put({ type: CANCEL_COMPENSATION_SUCCESS, payload: { Data } })
      const { documentId } = payload
      notification.open({
        message: `Платёж №${documentId} удалён`,
        type: 'success'
      })
    } else {
      yield put({ type: CANCEL_COMPENSATION_ERROR })
      notification.open({
        message: `Отмена компенсации`,
        description: MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: CANCEL_COMPENSATION_FAILURE, message: exception.message })
    notification.open({
      message: `Отмена компенсации`,
      description: exception.message,
      type: 'error'
    })
  }
}

export function * modifyCompensationSaga ({ payload }) {
  try {
    const { data: { Data, IsSuccess, MessageText } } = yield call(modifyCompensation, payload)
    if (IsSuccess) {
      yield put({ type: MODIFY_COMPENSATION_SUCCESS, payload: { Data } })
      notification.open({
        message: 'Комментарий изменён',
        type: 'success'
      })
    } else {
      yield put({ type: MODIFY_COMPENSATION_ERROR })
      notification.open({
        message: 'Ошибка изменения комментария',
        description: MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: MODIFY_COMPENSATION_FAILURE, message: exception.message })
    notification.open({
      message: 'Ошибка изменения комментария',
      description: exception.message,
      type: 'error'
    })
  }
}

export function * addCompensationSaga ({ payload }) {
  const [queryParamsState, compensationsMessagesArray, handlingId] = yield all([
    select(getQueryParamsState),
    select(getCompensationsMessagesArray),
    select(getHandlingId)
  ])
  const newCompensationsMessagesArray = [...compensationsMessagesArray]
  try {
    const { data: { Data, IsSuccess, MessageText } } = yield call(addCompensation, {
      ...payload,
      handlingId,
      handlingTechId: queryParamsState?.handlingTechId
    })
    if (IsSuccess) {
      yield put({ type: ADD_COMPENSATION_SUCCESS, payload: { Data } })
      notification.open({
        message: 'Компенсация начислена',
        type: 'success'
      })
    } else {
      addCompensationsMessages(newCompensationsMessagesArray, errorMessageType, MessageText)
      yield put({ type: ADD_COMPENSATION_ERROR, payload: { newCompensationsMessagesArray } })
    }
  } catch (exception) {
    yield put({ type: ADD_COMPENSATION_FAILURE, message: exception.message })
    notification.open({
      message: 'Начисление компенсаций',
      description: exception.message,
      type: 'error'
    })
  }
}

export function * addServiceCompensationSaga ({ payload }) {
  const [queryParamsState, compensationsMessagesArray] = yield all([
    select(getQueryParamsState),
    select(getCompensationsMessagesArray)
  ])
  const newCompensationsMessagesArray = [ ...compensationsMessagesArray ]

  try {
    const { data: { Data, IsSuccess, MessageText } } = yield call(addServiceCompensation, { ...payload, handlingTechId: queryParamsState?.handlingTechId })
    if (IsSuccess) {
      yield put({ type: ADD_SERVICE_COMPENSATION_SUCCESS, payload: { Data } })
      notification.open({
        message: 'Компенсация услугами начислена',
        type: 'success'
      })
    } else {
      addCompensationsMessages(newCompensationsMessagesArray, errorMessageType, MessageText)
      yield put({ type: ADD_SERVICE_COMPENSATION_ERROR, payload: { newCompensationsMessagesArray } })
    }
  } catch (exception) {
    yield put({ type: ADD_SERVICE_COMPENSATION_FAILURE, message: exception.message })
    notification.open({
      message: 'Начисление компенсации услуги',
      description: exception.message,
      type: 'error'
    })
  }
}

export function * fetchPaydReasonAdviceDescriptionSaga ({ payload }) {
  const compensationsMessagesArray = yield select(getCompensationsMessagesArray)
  const newCompensationsMessagesArray = [ ...compensationsMessagesArray ]

  try {
    const { data: { Data, IsSuccess, MessageText } } = yield call(fetchPaydReasonAdviceDescription, payload)
    if (IsSuccess) {
      Data.length !== 0 && Data.map(description => addCompensationsMessages(newCompensationsMessagesArray, successMessageType, description.PaydReasonDescription))
      yield put({ type: FETCH_PAYD_REASON_ADVICE_DESCRIPTION_SUCCESS, payload: { newCompensationsMessagesArray } })
    } else {
      yield put({ type: FETCH_PAYD_REASON_ADVICE_DESCRIPTION_ERROR })
      notification.open({
        message: 'Получение подсазок по типам зачисления',
        description: MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_PAYD_REASON_ADVICE_DESCRIPTION_FAILURE, message: exception.message })
    notification.open({
      message: 'Получение подсазок по типам зачисления',
      description: exception.message,
      type: 'error'
    })
  }
}

export function * fetchAvailableBalancesSaga ({ payload }) {
  const compensationsMessagesArray = yield select(getCompensationsMessagesArray)
  const newCompensationsMessagesArray = [ ...compensationsMessagesArray ]

  try {
    const { data: { isSuccess, messageText, data: Data } } = yield call(fetchAvailableBalances, payload)
    if (isSuccess) {
      const { availableBalances } = Data
      yield put({ type: FETCH_AVAILABLE_BALANCES_SUCCESS, payload: { availableBalances } })
    } else {
      addCompensationsMessages(newCompensationsMessagesArray, errorMessageType, messageText)
      yield put({ type: FETCH_AVAILABLE_BALANCES_ERROR, payload: { newCompensationsMessagesArray } })
    }
  } catch (exception) {
    yield put({ type: FETCH_AVAILABLE_BALANCES_FAILURE, message: exception.message })
    notification.open({
      message: 'Получение доступных балансов клиента',
      description: exception.message,
      type: 'error'
    })
  }
}
