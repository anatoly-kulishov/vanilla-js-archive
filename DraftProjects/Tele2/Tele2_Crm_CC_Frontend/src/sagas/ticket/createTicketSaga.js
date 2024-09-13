import { call, put, select, delay, all } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'
import isHandlingClosed from 'utils/helpers/isHandlingClosed'

import { TICKET_ADD_FILE } from 'reducers/tickets/ticketReducer'

import {
  CREATE_TICKET_MODAL_VISIBLE,
  FETCH_CONTACT_LINES_SUCCESS,
  FETCH_CONTACT_LINES_ERROR,
  FETCH_CONTACT_LINES_FAILURE,
  TICKET_ADD_PARAMS_SUCCESS,
  TICKET_ADD_PARAMS_ERROR,
  TICKET_ADD_PARAMS_FAILURE,
  TICKET_CLEAR_ADD_PARAMS,
  FETCH_REASONS_CATEGORIES_SUCCESS,
  FETCH_REASONS_CATEGORIES_ERROR,
  FETCH_REASONS_CATEGORIES_FAILURE,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_ERROR,
  CREATE_TICKET_FAILURE,
  SET_REASONS_CATEGORIES,
  RESET_REASONS_CATEGORIES,
  FETCH_VALIDATED_COORDINATES_SUCCESS,
  FETCH_VALIDATED_COORDINATES_ERROR,
  FETCH_VALIDATED_COORDINATES_FAILURE
} from 'reducers/tickets/createTicketReducer'

import {
  getPersonalAccountState,
  getCreateTicketFilterFields,
  getCreateTicketParameters,
  getCreateTicketInitialReasons,
  getHandlingState,
  getQueryParamsState,
  getProcessingParametersState
} from 'selectors'
import passHandlingTechId from 'utils/helpers/passHandlingTechIdToUrl'
import { PASS_HANDLING_TECH_ID } from 'reducers/internal/parameters'
import { PASS_HANDLING_ID } from 'reducers/internal/handlingReducer'

const { createTicket, fetchContactLines, ticketAddParams, fetchReasonsCategoriesList } = api

export function * createTicketSaga ({ payload }) {
  const { FileData, ...otherPayload } = payload
  const message = 'Создание заявки'
  try {
    const { data } = yield call(createTicket, otherPayload)

    if (data.isSuccess) {
      yield put({ type: CREATE_TICKET_SUCCESS, payload: data })
      yield put({ type: RESET_REASONS_CATEGORIES })
      yield put({ type: TICKET_CLEAR_ADD_PARAMS })
      yield put({ type: CREATE_TICKET_MODAL_VISIBLE })
      notification.open({
        message: message,
        description: 'Заявка ' + data.data.number + ' успешно создана',
        type: 'info'
      })

      if (FileData && FileData.file !== null) {
        const handlingState = yield select(getHandlingState)
        yield all(
          FileData?.map((file) => put({
            type: TICKET_ADD_FILE,
            payload: {
              file: file,
              requestId: data.data.result,
              ttNumber: data.data.number,
              handlingId: handlingState.Id
            }
          }))
        )
      }

      const { newHandlingId, newHandlingTechId } = data.data
      if (newHandlingTechId) {
        passHandlingTechId(newHandlingTechId, true)
        yield put({ type: PASS_HANDLING_TECH_ID, payload: newHandlingTechId })
      }
      if (newHandlingId) {
        yield put({ type: PASS_HANDLING_ID, payload: newHandlingId })
      }
    } else {
      yield put({ type: CREATE_TICKET_ERROR, payload: data })

      isHandlingClosed(data.messageText) &&
        notification.open({
          message: message,
          description: data.messageText,
          type: 'error'
        })
    }
  } catch (exception) {
    yield put({ type: CREATE_TICKET_FAILURE, message: exception.message })
    notification.open({
      message: message,
      description: 'Ошибка создания заявки',
      type: 'error'
    })
  }
}

export function * fetchContactLinesSaga () {
  const { serviceChannelId: channelId } = yield select(getQueryParamsState)
  const { ServiceChannel } = yield select(getProcessingParametersState)
  const serviceChannelId = ServiceChannel.Id || channelId

  try {
    const { data } = yield call(fetchContactLines, { serviceChannelId })

    if (data.isSuccess) {
      yield put({ type: FETCH_CONTACT_LINES_SUCCESS, payload: data })
    } else {
      yield put({ type: FETCH_CONTACT_LINES_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: FETCH_CONTACT_LINES_FAILURE, message: exception.message })
  }
}

export function * fetchAddParamsSaga ({ payload }) {
  try {
    const { data } = yield call(ticketAddParams, payload)

    if (data.isSuccess) {
      yield put({ type: TICKET_ADD_PARAMS_SUCCESS, payload: data })
    } else {
      yield put({ type: TICKET_ADD_PARAMS_ERROR, payload: data })
      notification.open({
        message: `Получение чек листа `,
        description: data.messageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: TICKET_ADD_PARAMS_FAILURE, message: exception.message })
  }
}

// TODO: не забыть при рефакторе дерева
export function * fetchReasonsCategoriesDelaySaga ({ payload }) {
  yield delay(500)

  const filterFields = yield select(getCreateTicketFilterFields)
  const reasonsParams = yield select(getCreateTicketParameters, getCreateTicketInitialReasons)

  const reasonSearchLength =
    reasonsParams && parseInt(reasonsParams.find(item => item.ParamName === 'MinLength').ParamValue)

  const { field, value } = payload
  const { reasonName, categoryId } = filterFields

  const isReasonNameLengthValid = value.length >= reasonSearchLength || value.length === 0
  const isInitialReasonsToSet = reasonName === '' && categoryId !== 0 && !categoryId

  // TODO: я так и не понял зачем это нужно, желания лезть в дерево нету, надеюсь при рефакторе дерева не забудем
  if (isInitialReasonsToSet) yield put({ type: SET_REASONS_CATEGORIES })

  if ((field === 'reasonName' && isReasonNameLengthValid) || field === 'categoryId') {
    yield call(fetchReasonsCategoriesSaga)
  }
}

// TODO: не забыть при рефакторе дерева
export function * fetchReasonsCategoriesSaga () {
  const filterFields = yield select(getCreateTicketFilterFields)
  const personalAccount = yield select(getPersonalAccountState)
  const processingParameters = yield select(getProcessingParametersState)
  const channelId = processingParameters?.ServiceChannel?.Id
  const { BaseFunctionalParams = {} } = personalAccount
  const { InteractionDirectionId: directionId, ClientCategoryId: clientCategoryId } = BaseFunctionalParams

  try {
    let requestParams = {
      ...filterFields,
      channelId,
      directionId,
      clientCategoryId
    }

    if (filterFields.reasonName) {
      const reasonsParams = yield select(getCreateTicketParameters, getCreateTicketInitialReasons)

      const reasonSearchLength =
        reasonsParams && parseInt(reasonsParams.find(item => item.ParamName === 'MinLength').ParamValue)
      const isReasonNameLengthValid = filterFields.reasonName.length >= reasonSearchLength

      const { reasonName } = filterFields

      requestParams = {
        ...requestParams,
        reasonName: isReasonNameLengthValid ? reasonName : ''
      }
    }

    const { data } = yield call(fetchReasonsCategoriesList, requestParams)

    if (data.IsSuccess) {
      const {
        Data: { Reasons, Categories, GlobalParameters }
      } = data

      // TODO: initialReasons это вообще что, при любых манипуляциях он всегда пустой массив, а логики на него завязаной много
      let initialReasons = yield select(getCreateTicketInitialReasons)
      if (initialReasons.length) {
        initialReasons = Reasons
      }

      yield put({
        type: FETCH_REASONS_CATEGORIES_SUCCESS,
        payload: { initialReasons, Reasons, Categories, GlobalParameters }
      })
    } else {
      yield put({ type: FETCH_REASONS_CATEGORIES_ERROR, payload: data })
      notification.error({
        message: `Ошибка причин категорий `,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_REASONS_CATEGORIES_FAILURE, message: exception.message })
    notification.error({
      message: `Ошибка причин категорий `,
      description: exception.message
    })
  }
}

export function * fetchValidatedCoordinatesSaga ({ payload }) {
  const { fetchValidatedCoordinates } = api
  try {
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(fetchValidatedCoordinates, payload)

    if (IsSuccess) {
      yield put({ type: FETCH_VALIDATED_COORDINATES_SUCCESS, payload: Data })
    } else {
      yield put({ type: FETCH_VALIDATED_COORDINATES_ERROR, payload: MessageText })
      notification.open({
        message: `Валидация координат абонента`,
        description: MessageText,
        type: 'error'
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_VALIDATED_COORDINATES_FAILURE, payload: message })
    notification.open({
      message: `Валидация координат абонента`,
      description: message,
      type: 'error'
    })
  }
}
