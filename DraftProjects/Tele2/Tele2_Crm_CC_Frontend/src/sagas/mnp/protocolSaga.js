import { call, put, select, all } from 'redux-saga/effects'
import api from 'utils/api'
import servicesMessageTypes from 'constants/servicesMessageTypes'
import moment from 'moment'

import {
  getPersonalAccountState,
  getProcessingParametersState,
  getQueryParamsState
} from 'selectors'

import {
  FETCH_PROTOCOL_STATUS_CONTEXT_SUCCESS,
  FETCH_PROTOCOL_STATUS_CONTEXT_FULL_SUCCESS,
  FETCH_PROTOCOL_STATUS_CONTEXT_ERROR,
  FETCH_PROTOCOL_STATUS_CONTEXT_FAILURE,

  GET_QUESTION_PROTOCOL_SUCCESS,
  GET_QUESTION_PROTOCOL_ERROR,
  GET_QUESTION_PROTOCOL_FAILURE,

  CHANGE_DRAFT_PROTOCOL_FAILURE,
  CHANGE_DRAFT_PROTOCOL_SUCCESS,
  CHANGE_DRAFT_PROTOCOL_ERROR,

  PROTOCOL_ERROR,
  PROTOCOL_FAILURE,
  PROTOCOL_SUCCESS,

  CREATE_DRAFT_PROTOCOL_SUCCESS,
  CREATE_DRAFT_PROTOCOL_ERROR,
  CREATE_DRAFT_PROTOCOL_FAILURE
} from 'reducers/mnp/protocolReducer'

import { CHECK_MNP_HANDLING } from 'reducers/mnp/mnpReducer'
import { notification } from 'antd'

export function * fetchProtocolStatusContextSaga ({ payload }) {
  const { fetchProtocolStatusContext } = api
  try {
    const {
      data: { ResultType, MessageText, Data }
    } = yield call(fetchProtocolStatusContext, payload)
    switch (ResultType) {
      case servicesMessageTypes.success:
      case servicesMessageTypes.warning:
        if (payload) {
          yield put({ type: FETCH_PROTOCOL_STATUS_CONTEXT_FULL_SUCCESS, payload: Data })
        } else {
          yield put({ type: FETCH_PROTOCOL_STATUS_CONTEXT_SUCCESS, payload: Data })
        }
        break
      case servicesMessageTypes.error:
        yield put({ type: FETCH_PROTOCOL_STATUS_CONTEXT_ERROR, payload: MessageText })
        notification.error({
          message: 'Загрузка списков причин завершения',
          description: MessageText
        })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_PROTOCOL_STATUS_CONTEXT_FAILURE, payload: message })
  }
}

export function * getQuestionProtocolSaga ({ payload }) {
  const { getQuestionProtocol } = api
  try {
    const result = yield call(getQuestionProtocol, payload)
    const { data: { Data, ResultType, MessageText } } = result

    switch (ResultType) {
      case servicesMessageTypes.success:
        const questions = Data.Questions
        const formattedQuestions = questions.map(question => {
          const controlData = JSON.parse(question.ControlData)
          const fullQuestionProtocol = Object.assign({}, question, ...controlData)

          return fullQuestionProtocol
        })

        const dateFormat = 'DD.MM.YYYY HH:mm:ss'

        Data.CreatedOn = moment.utc(Data.CreatedOn).local().format(dateFormat)

        const questionsProtocol = {
          ...Data,
          Questions: formattedQuestions
        }
        yield put({ type: GET_QUESTION_PROTOCOL_SUCCESS, payload: questionsProtocol })
        break
      case servicesMessageTypes.error:
        yield put({ type: GET_QUESTION_PROTOCOL_ERROR, payload: MessageText })
    }
  } catch ({ message }) {
    yield put({ type: GET_QUESTION_PROTOCOL_FAILURE, payload: message })
  }
}

export function * createDraftProtocolSaga ({ payload }) {
  const { createDraftProtocol } = api

  const [queryParams, personalAccount, processingParameters] = yield all([
    select(getQueryParamsState),
    select(getPersonalAccountState),
    select(getProcessingParametersState)
  ])

  const { vdnIvr, linkedHandlingId, interactionId, dialogId } = queryParams
  const {
    ServiceChannel: { Id }
  } = processingParameters

  const {
    ClientId: clientId,
    BillingBranchId: billingBranchId,
    PersonalAccountId: personalAccountId,
    SubscriberFullInfo: {
      SubscriberInfo: {
        SubscriberTypeId: subscriberTypeId,
        SubscriberStatusId: subscriberStatusId,
        SubscriberId: subscriberId
      },
      SubscriberClientInfo: {
        ClientTypeName: clientTypeName,
        Enviroment: enviroment,
        JurClientTypeName: jurClientType
      }
    },
    BaseFunctionalParams: { ClientCategoryId: clientCategoryId }
  } = personalAccount

  const autoInteractionParams = {
    subscriberId,
    subscriberBranchId: billingBranchId,
    clientId
  }

  const params = {
    clientServiceMethod: enviroment,
    personalAccount: personalAccountId,
    clientType: clientTypeName,
    clientJurType: jurClientType,
    vdnIvr,
    serviceChannelId: Id,
    clientCategoryId,
    linkedHandlingId,
    callinteractionId: interactionId || dialogId,
    autoInteraction: {
      subscriberTypeId,
      subscriberStatusId,
      clientBranchId: billingBranchId,
      ...autoInteractionParams
    },
    ...autoInteractionParams
  }

  try {
    const { data: { Data, ResultType, MessageText } } = yield call(createDraftProtocol, { ...payload, ...params })

    switch (ResultType) {
      case servicesMessageTypes.success:
        yield put({ type: CREATE_DRAFT_PROTOCOL_SUCCESS, payload: Data })
        notification.success({
          message: 'Создание анкеты MNP',
          description: MessageText || 'Создание анкеты MNP произошло успешно'
        })
        break
      case servicesMessageTypes.warning:
        yield put({ type: CREATE_DRAFT_PROTOCOL_SUCCESS, payload: Data })
        notification.success({
          message: 'Создание анкеты MNP',
          description: MessageText
        })
        break
      case servicesMessageTypes.error:
        yield put({ type: CREATE_DRAFT_PROTOCOL_ERROR, payload: MessageText })
        notification.error({
          message: 'Ошибка создания анкеты MNP',
          description: MessageText
        })
        break
    }
  } catch ({ message }) {
    yield put({ type: CREATE_DRAFT_PROTOCOL_FAILURE, payload: message })
  }
}

export function * changeDraftProtocolSaga ({ payload }) {
  const { changeDraftProtocol } = api

  const [queryParams, personalAccount, processingParameters] = yield all([
    select(getQueryParamsState),
    select(getPersonalAccountState),
    select(getProcessingParametersState)
  ])

  const { vdnIvr, linkedHandlingId, interactionId, dialogId } = queryParams
  const {
    ServiceChannel: { Id }
  } = processingParameters

  const {
    ClientId: clientId,
    BillingBranchId: billingBranchId,
    PersonalAccountId: personalAccountId,
    SubscriberFullInfo: {
      SubscriberInfo: {
        SubscriberTypeId: subscriberTypeId,
        SubscriberStatusId: subscriberStatusId,
        SubscriberId: subscriberId
      },
      SubscriberClientInfo: {
        ClientTypeName: clientTypeName,
        Enviroment: enviroment,
        JurClientTypeName: jurClientType
      }
    },
    BaseFunctionalParams: { ClientCategoryId: clientCategoryId }
  } = personalAccount

  const autoInteractionParams = {
    subscriberId,
    subscriberBranchId: billingBranchId,
    clientId
  }

  const params = {
    clientServiceMethod: enviroment,
    personalAccount: personalAccountId,
    clientType: clientTypeName,
    clientJurType: jurClientType,
    vdnIvr,
    serviceChannelId: Id,
    clientCategoryId,
    linkedHandlingId,
    callinteractionId: interactionId || dialogId,
    autoInteraction: {
      subscriberTypeId,
      subscriberStatusId,
      clientBranchId: billingBranchId,
      ...autoInteractionParams
    },
    ...autoInteractionParams
  }

  try {
    const { data: { Data, ResultType, MessageText } } = yield call(changeDraftProtocol, { ...payload, ...params })

    switch (ResultType) {
      case servicesMessageTypes.success:
        yield put({ type: CHANGE_DRAFT_PROTOCOL_SUCCESS, payload: Data })
        if (payload.handlingId) {
          yield put({ type: CHECK_MNP_HANDLING })
        }
        notification.success({
          message: 'Создание анкеты MNP',
          description: MessageText || 'Создание анкеты MNP произошло успешно'
        })
        break
      case servicesMessageTypes.warning:
        yield put({ type: CHANGE_DRAFT_PROTOCOL_SUCCESS, payload: Data })
        if (payload.handlingId) {
          yield put({ type: CHECK_MNP_HANDLING })
        }
        notification.success({
          message: 'Создание анкеты MNP',
          description: MessageText
        })
        break
      case servicesMessageTypes.error:
        yield put({ type: CHANGE_DRAFT_PROTOCOL_ERROR, payload: MessageText })
        if (payload.handlingId) {
          yield put({ type: CHECK_MNP_HANDLING })
        }
        notification.error({
          message: 'Ошибка создания анкеты MNP',
          description: MessageText
        })
        break
    }
  } catch ({ message }) {
    yield put({ type: CHANGE_DRAFT_PROTOCOL_FAILURE, payload: message })
    if (payload.handlingId) {
      yield put({ type: CHECK_MNP_HANDLING })
    }
  }
}

export function * protocolSaga ({ payload }) {
  const { protocol } = api

  const [queryParams, personalAccount, processingParameters] = yield all([
    select(getQueryParamsState),
    select(getPersonalAccountState),
    select(getProcessingParametersState)
  ])

  const { vdnIvr, linkedHandlingId, interactionId, dialogId } = queryParams
  const {
    ServiceChannel: { Id }
  } = processingParameters

  const {
    ClientId: clientId,
    BillingBranchId: billingBranchId,
    PersonalAccountId: personalAccountId,
    SubscriberFullInfo: {
      SubscriberInfo: {
        SubscriberTypeId: subscriberTypeId,
        SubscriberStatusId: subscriberStatusId,
        SubscriberId: subscriberId
      },
      SubscriberClientInfo: {
        ClientTypeName: clientTypeName,
        Enviroment: enviroment,
        JurClientTypeName: jurClientType
      }
    },
    BaseFunctionalParams: { ClientCategoryId: clientCategoryId }
  } = personalAccount

  const autoInteractionParams = {
    subscriberId,
    subscriberBranchId: billingBranchId,
    clientId
  }

  const params = {
    clientServiceMethod: enviroment,
    personalAccount: personalAccountId,
    clientType: clientTypeName,
    clientJurType: jurClientType,
    vdnIvr,
    serviceChannelId: Id,
    clientCategoryId,
    linkedHandlingId,
    callinteractionId: interactionId || dialogId,
    autoInteraction: {
      subscriberTypeId,
      subscriberStatusId,
      clientBranchId: billingBranchId,
      ...autoInteractionParams
    },
    ...autoInteractionParams
  }

  try {
    const { data: { Data, ResultType, MessageText } } = yield call(protocol, { ...payload, ...params })

    switch (ResultType) {
      case servicesMessageTypes.success:
        yield put({ type: PROTOCOL_SUCCESS, payload: Data })
        notification.success({
          message: 'Создание анкеты MNP',
          description: MessageText || 'Создание анкеты MNP произошло успешно'
        })
        break
      case servicesMessageTypes.warning:
        yield put({ type: PROTOCOL_SUCCESS, payload: Data })
        notification.success({
          message: 'Создание анкеты MNP',
          description: MessageText
        })
        break
      case servicesMessageTypes.error:
        yield put({ type: PROTOCOL_ERROR, payload: Data })
        notification.error({
          message: 'Ошибка создания анкеты MNP',
          description: MessageText
        })
        break
    }
  } catch ({ message }) {
    yield put({ type: PROTOCOL_FAILURE, payload: message })
  }
}
