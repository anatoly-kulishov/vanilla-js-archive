import { all, call, put, select } from 'redux-saga/effects'

import { getQueryParamsState, getPersonalAccountState, getProcessingParametersState, getHandlingId } from 'selectors'

import {
  CHECK_MNP_HANDLING_SUCCESS,
  CHECK_MNP_HANDLING_ERROR,
  CHECK_MNP_HANDLING_FAILURE,
  GET_MNP_ORDER,
  GET_MNP_ORDER_SUCCESS,
  GET_MNP_ORDER_ERROR,
  GET_MNP_ORDER_FAILURE,
  CANCEL_MNP_ORDER_SUCCESS,
  CANCEL_MNP_ORDER_ERROR,
  CANCEL_MNP_ORDER_FAILURE,
  GET_ORDER_HISTORY_SUCCESS,
  GET_ORDER_HISTORY_ERROR,
  GET_ORDER_HISTORY_FAILURE,
  GET_CANCELLATIONS_NUMBER_SUCCESS,
  GET_CANCELLATIONS_NUMBER_ERROR,
  GET_CANCELLATIONS_NUMBER_FAILURE,
  GET_CLOSED_ORDERS_SUCCESS,
  GET_CLOSED_ORDERS_ERROR,
  GET_CLOSED_ORDERS_FAILURE,
  GET_HISTORY_ORDER_ID_LIST_SUCCESS,
  GET_HISTORY_ORDER_ID_LIST_ERROR,
  GET_HISTORY_ORDER_ID_LIST_FAILURE
} from 'reducers/mnp/mnpReducer'

import { GET_MARKER_MNP } from 'reducers/mnp/mnpMarkersReducer'

import api from 'utils/api'
import servicesMessageTypes from 'constants/servicesMessageTypes'
import { notification } from 'antd'

export function * checkMnpHandlingSaga ({ payload }) {
  const queryParams = yield select(getQueryParamsState)
  const personalAccount = yield select(getPersonalAccountState)
  const processingParameters = yield select(getProcessingParametersState)
  const handlingId = yield select(getHandlingId)

  let mnpParams = null

  if (processingParameters) {
    const msisdn = personalAccount?.Msisdn
    const BillingBranchId = personalAccount?.BillingBranchId
    // SubscriberFullInfo
    const SubscriberFullInfo = personalAccount?.SubscriberFullInfo
    const SubscriberInfo = SubscriberFullInfo?.SubscriberInfo
    const SubscriberClientInfo = SubscriberFullInfo?.SubscriberClientInfo
    // SubscriberInfo
    const loyalityCategoryId = SubscriberInfo?.LoyalityCategoryId
    const subscriberId = SubscriberInfo?.SubscriberId
    const subscriberTypeId = SubscriberInfo?.SubscriberTypeId
    const subscriberStatusId = SubscriberInfo?.SubscriberStatusId
    // SubscriberClientInfo
    const JurClientTypeName = SubscriberClientInfo?.JurClientTypeName
    const ClientTypeName = SubscriberClientInfo?.ClientTypeName
    const Enviroment = SubscriberClientInfo?.Enviroment
    const ClientId = SubscriberClientInfo?.ClientId
    const PersonalAccountId = SubscriberClientInfo?.PersonalAccountId
    // BaseFunctionalParams
    const BaseFunctionalParams = personalAccount?.BaseFunctionalParams
    const clientCategoryId = BaseFunctionalParams?.ClientCategoryId

    const { vdnIvr, theme, interactionId, dialogId, linkedHandlingId } = queryParams

    const callInteractionId = interactionId || dialogId
    const {
      ServiceChannel: { Id }
    } = processingParameters

    mnpParams = {
      handlingId,
      linkedHandlingId,
      callInteractionId,
      msisdn,
      loyalityCategoryId,
      vdnIvr,
      theme,
      clientServiceMethod: Enviroment,
      clientType: ClientTypeName,
      clientJurType: JurClientTypeName,
      personalAccount: PersonalAccountId,
      clientId: ClientId,
      clientBranchId: BillingBranchId,
      subscriberId,
      subscriberBranchId: BillingBranchId,
      subscriberTypeId,
      subscriberStatusId,
      serviceChannelId: Id,
      clientCategoryId,
      ...payload
    }

    if (mnpParams) {
      const { checkMnpHandling } = api

      try {
        const {
          data: { ResultType, MessageText, Data }
        } = yield call(checkMnpHandling, mnpParams)

        if (Data?.OrderId) {
          yield put({ type: GET_MARKER_MNP })
        }

        switch (ResultType) {
          case servicesMessageTypes.success:
            yield put({ type: CHECK_MNP_HANDLING_SUCCESS, payload: Data })
            break
          case servicesMessageTypes.warning:
            yield put({ type: CHECK_MNP_HANDLING_SUCCESS, payload: Data })
            notification.error({
              message: 'Анкета MNP',
              description: MessageText
            })
            break
          case servicesMessageTypes.error:
            yield put({ type: CHECK_MNP_HANDLING_ERROR, payload: MessageText })
            notification.error({
              message: 'Анкета MNP',
              description: MessageText
            })
            break
          default:
            yield put({ type: CHECK_MNP_HANDLING_FAILURE, payload: 'Анкета MNP. Ошибка загрузки' })
            notification.error({
              message: 'Анкета MNP',
              description: 'Ошибка загрузки'
            })
            break
        }
      } catch ({ message }) {
        yield put({ type: CHECK_MNP_HANDLING_FAILURE, payload: message })
      }
    }
  }
}

export function * getMnpOrderSaga ({ payload }) {
  const { getMnpOrder } = api
  try {
    const personalAccount = yield select(getPersonalAccountState)

    const {
      BaseFunctionalParams: { ClientCategoryId: clientCategoryId },
      SubscriberFullInfo: {
        SubscriberInfo: { LoyalityCategoryId: loyalityCategoryId }
      }
    } = personalAccount

    const response = yield call(getMnpOrder, { ...payload, clientCategoryId, loyalityCategoryId })
    const { data, status } = response

    switch (status) {
      case 200:
        yield put({ type: GET_MNP_ORDER_SUCCESS, payload: data })
        break
      case 204:
      default:
        yield put({ type: GET_MNP_ORDER_ERROR, payload: 'Заявление не найдено' })
        notification.warning({
          message: 'Заявление MNP',
          description: 'Заявление не найдено'
        })
        break
    }
  } catch ({ message }) {
    yield put({ type: GET_MNP_ORDER_FAILURE, payload: message })
    notification.error({
      message: 'Заявление MNP. Ошибка загрузки данных',
      description: message
    })
  }
}

export function * cancelMnpOrderSaga ({ payload }) {
  const handlingId = yield select(getHandlingId)
  const personalAccount = yield select(getPersonalAccountState)

  const { cancelMnpOrder } = api
  try {
    const {
      Msisdn: msisdn,
      ClientId: clientId,
      BillingBranchId: billingBranchId,
      SubscriberFullInfo: {
        SubscriberInfo: {
          SubscriberTypeId: subscriberTypeId,
          SubscriberStatusId: subscriberStatusId,
          SubscriberId: subscriberId
        }
      }
    } = personalAccount

    const cancelMnpParams = {
      handlingId,
      msisdn,
      autoInteraction: {
        clientId,
        clientBranchId: billingBranchId,
        subscriberId,
        subscriberBranchId: billingBranchId,
        subscriberTypeId,
        subscriberStatusId
      },
      ...payload
    }
    const response = yield call(cancelMnpOrder, cancelMnpParams)
    const { data, status } = response
    const MessageText = data?.MessageText

    switch (status) {
      case 200:
        yield put({ type: CANCEL_MNP_ORDER_SUCCESS, payload: data })
        yield put({ type: GET_MNP_ORDER, payload: { msisdn } })
        if (MessageText) {
          notification.warning({
            message: 'Заявление MNP',
            description: MessageText
          })
        } else {
          notification.success({
            message: 'Заявление MNP',
            description: 'Заявление отменено'
          })
        }
        break
      case 400:
        yield put({ type: CANCEL_MNP_ORDER_ERROR, payload: data })
        notification.error({
          message: 'Заявление MNP',
          description: data
        })
        break
      case 404:
        yield put({ type: CANCEL_MNP_ORDER_ERROR, payload: MessageText })
        notification.warning({
          message: 'Заявление MNP',
          description: MessageText
        })
        break
      case 409:
        yield put({ type: CANCEL_MNP_ORDER_ERROR, payload: MessageText })
        notification.error({
          message: 'Заявление MNP',
          description: MessageText
        })
        break
      default:
        yield put({ type: CANCEL_MNP_ORDER_ERROR, payload: MessageText })
        notification.error({
          message: 'Заявление MNP',
          description: MessageText
        })
        break
    }
  } catch ({ message }) {
    yield put({ type: CANCEL_MNP_ORDER_FAILURE, payload: message })
    notification.error({
      message: 'Заявление MNP. Ошибка загрузки данных',
      description: message
    })
  }
}

export function * getOrderHistorySaga ({ payload }) {
  const personalAccount = yield select(getPersonalAccountState)
  const { getMnpOrderHistory } = api

  const {
    Msisdn: msisdn,
    BaseFunctionalParams: { ClientCategoryId: clientCategoryId }
  } = personalAccount

  try {
    const response = yield call(getMnpOrderHistory, { ...payload, msisdn, clientCategoryId })
    const { data, status } = response

    switch (status) {
      case 200:
        yield put({ type: GET_ORDER_HISTORY_SUCCESS, payload: data.History })
        break
      default:
        yield put({ type: GET_ORDER_HISTORY_ERROR, payload: data.MessageText })
        break
    }
  } catch ({ message }) {
    yield put({ type: GET_ORDER_HISTORY_FAILURE, payload: message })
  }
}

export function * getCancellationsNumberSaga ({ payload }) {
  const { getCancellationsNumber } = api
  const { msisdn } = payload

  try {
    const result = yield call(getCancellationsNumber, { msisdn })
    const {
      data: { Data, MessageText, ResultType }
    } = result
    switch (ResultType) {
      case servicesMessageTypes.success:
        yield put({ type: GET_CANCELLATIONS_NUMBER_SUCCESS, payload: Data })
        break
      case servicesMessageTypes.error:
        yield put({ type: GET_CANCELLATIONS_NUMBER_ERROR, payload: MessageText })
        break
    }
  } catch ({ message }) {
    yield put({ type: GET_CANCELLATIONS_NUMBER_FAILURE, payload: message })
  }
}

export function * getClosedOrdersSaga ({ payload }) {
  const personalAccount = yield select(getPersonalAccountState)
  const { getClosedOrders } = api
  const { Msisdn } = personalAccount
  try {
    const result = yield call(getClosedOrders, { ...payload, Msisdn })
    const { data, status } = result
    switch (status) {
      case 200:
        yield put({ type: GET_CLOSED_ORDERS_SUCCESS, payload: data })
        break
      default:
        yield put({ type: GET_CLOSED_ORDERS_ERROR, payload: data })
        break
    }
  } catch ({ message }) {
    yield put({ type: GET_CLOSED_ORDERS_FAILURE, payload: message })
  }
}

export function * getHistoryOrderIdListSaga ({ payload }) {
  const personalAccount = yield select(getPersonalAccountState)
  const { getHistoryOrderId } = api
  const { Msisdn } = personalAccount

  try {
    const actions = yield payload.map(function * (item) {
      const { data, status } = yield call(getHistoryOrderId, { ...item, Msisdn })
      switch (status) {
        case 200:
          yield put({ type: GET_HISTORY_ORDER_ID_LIST_SUCCESS, payload: data })
          break
        case 500:
          throw new Error({ message: data.MessageText })
        default:
          yield put({ type: GET_HISTORY_ORDER_ID_LIST_ERROR, payload: { orders: [item], message: data.MessageText } })
          break
      }
    })

    yield all(actions)
  } catch ({ message }) {
    yield put({
      type: GET_HISTORY_ORDER_ID_LIST_FAILURE,
      payload: { orders: payload, message }
    })
  }
}
