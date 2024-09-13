import { call, put, select } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'
import { cardModes } from 'constants/cardModes'
import servicesMessageTypes from 'constants/servicesMessageTypes'

import {
  FETCH_DATA_SUBSCRIBER,
  FETCH_DATA_SUBSCRIBER_SUCCESS,
  FETCH_DATA_SUBSCRIBER_ERROR,
  FETCH_DATA_SUBSCRIBER_FAILURE,
  FETCH_DATA_CLIENT_SUCCESS,
  FETCH_DATA_CLIENT_ERROR,
  FETCH_DATA_CLIENT_FAILURE,
  FETCH_REVOKE_SUCCESS,
  FETCH_REVOKE_ERROR,
  FETCH_REVOKE_FAILURE,
  FETCH_VIP_SEGMENTATION_SUCCESS,
  FETCH_VIP_SEGMENTATION_ERROR,
  FETCH_VIP_SEGMENTATION_FAILURE,
  PAYMENT_DELIVERY_TYPES_FETCH,
  PAYMENT_DELIVERY_TYPES_FETCH_SUCCESS,
  PAYMENT_DELIVERY_TYPES_FETCH_ERROR,
  PAYMENT_DELIVERY_TYPES_FETCH_FAILURE,
  UPDATE_SUBSCRIBER_DATA,
  UPDATE_CLIENT_DATA,
  UPDATE_SUBSCRIBER_CLIENT_DATA_SUCCESS,
  UPDATE_SUBSCRIBER_CLIENT_DATA_ERROR,
  UPDATE_SUBSCRIBER_CLIENT_DATA_FAILURE,
  DELETE_FROM_SPACE_SUCCESS,
  DELETE_FROM_SPACE_ERROR,
  DELETE_FROM_SPACE_FAILURE,
  POST_SEND_AGREE_SUCCESS,
  POST_SEND_AGREE_ERROR,
  POST_SEND_AGREE_FAILURE
} from 'reducers/personalInfo/dataClientSubscriberReducer'

import { getPersonalAccountState, getHandlingState } from 'selectors'
import { getCardMode } from 'utils/helpers/getCardMode'

const {
  fetchDataSubscriber,
  fetchDataClient,
  fetchPaymentDeliveryTypes,
  updateSubscriberData,
  updateClientData,
  fetchRevoke,
  fetchVipSegmentation,
  deleteFromSpace,
  postSendAgree
} = api

export function * fetchDataSubscriberSaga ({ payload }) {
  try {
    const { data } = yield call(fetchDataSubscriber, payload)
    if (data.IsSuccess) {
      yield put({ type: FETCH_DATA_SUBSCRIBER_SUCCESS, payload: { data: data.Data } })
      yield put({ type: PAYMENT_DELIVERY_TYPES_FETCH })
    } else {
      yield put({ type: FETCH_DATA_SUBSCRIBER_ERROR, payload: { error: data } })
      notification.open({
        message: `Ошибка`,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (error) {
    yield put({ type: FETCH_DATA_SUBSCRIBER_FAILURE, message: error.message })
  }
}

export function * fetchDataClientSaga ({ payload }) {
  try {
    const { data } = yield call(fetchDataClient, payload)
    if (data.IsSuccess) {
      yield put({ type: FETCH_DATA_CLIENT_SUCCESS, payload: { data: data.Data } })
    } else {
      yield put({ type: FETCH_DATA_CLIENT_ERROR, payload: { error: data } })
      notification.open({
        message: `Ошибка`,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (error) {
    yield put({ type: FETCH_DATA_CLIENT_FAILURE, message: error.message })
  }
}

export function * fetchRevokeSaga ({ payload }) {
  try {
    const { data } = yield call(fetchRevoke, payload)
    if (data.IsSuccess) {
      yield put({ type: FETCH_REVOKE_SUCCESS, payload: { data: data.Data } })

      const personalAccount = yield select(getPersonalAccountState)
      const { Msisdn, BillingBranchId, SubClientId, ClientId, ClientCategory } = personalAccount
      const cardMode = getCardMode(ClientCategory, Msisdn)
      if (cardMode !== cardModes.client) {
        yield put({
          type: FETCH_DATA_SUBSCRIBER,
          payload: {
            Msisdn: Msisdn,
            BranchId: BillingBranchId,
            ClientId: SubClientId || ClientId,
            isB2b: true
          }
        })
      }
    } else {
      const { ResultType } = data
      yield put({ type: FETCH_REVOKE_ERROR, payload: { error: data } })
      notification.open({
        message: `Ошибка`,
        description: data.MessageText,
        type: ResultType === 2 ? 'error' : 'warning'
      })
    }
  } catch (error) {
    yield put({ type: FETCH_REVOKE_FAILURE, message: error.message })
    notification.open({
      message: `Ошибка`,
      description: error.message,
      type: 'error'
    })
  }
}

export function * fetchVipSegmentationSaga ({ payload }) {
  try {
    const { data } = yield call(fetchVipSegmentation, payload)
    switch (data.ResultType) {
      case servicesMessageTypes.success:
      case servicesMessageTypes.warning:
        yield put({ type: FETCH_VIP_SEGMENTATION_SUCCESS, payload: data?.Data })
        break
      case servicesMessageTypes.error:
        yield put({ type: FETCH_VIP_SEGMENTATION_ERROR, payload: { error: data } })
        break
      default:
        yield put({ type: FETCH_VIP_SEGMENTATION_ERROR, payload: { error: data } })
        break
    }
  } catch (error) {
    yield put({ type: FETCH_VIP_SEGMENTATION_FAILURE, message: error.message })
    notification.open({
      message: `Ошибка`,
      description: error.message,
      type: 'error'
    })
  }
}

export function * fetchPaymentDeliveryTypesSaga () {
  const personalAccount = yield select(getPersonalAccountState)

  const { BillingBranchId: branchId } = personalAccount

  try {
    const { data } = yield call(fetchPaymentDeliveryTypes, { branchId })
    if (data.IsSuccess) {
      yield put({ type: PAYMENT_DELIVERY_TYPES_FETCH_SUCCESS, payload: data.Data })
    } else {
      yield put({ type: PAYMENT_DELIVERY_TYPES_FETCH_ERROR, payload: { error: data } })
    }
  } catch (error) {
    yield put({ type: PAYMENT_DELIVERY_TYPES_FETCH_FAILURE, message: error.message })
  }
}

export function * updateSubscriberDataSaga ({ payload: dataToUpdate, type }) {
  const personalAccount = yield select(getPersonalAccountState)
  const handling = yield select(getHandlingState)
  const {
    BillingBranchId: branchId,
    SubscriberId: subscriberId,
    ClientId: clientId,
    Msisdn: msisdn,
    Email: email,
    SubscriberFullInfo: {
      SubscriberInfo: { SubscriberTypeId: subscriberTypeId, SubscriberStatusId: subscriberStatusId }
    }
  } = personalAccount
  const { Id: handlingId } = handling

  const payload = {
    branchId,
    clientId,
    subscriberId,
    msisdn,
    handlingId,
    email,
    subscriberTypeId,
    subscriberStatusId,
    ...dataToUpdate
  }

  try {
    let loadedData
    switch (type) {
      case UPDATE_SUBSCRIBER_DATA:
        loadedData = yield call(updateSubscriberData, payload)
        break
      case UPDATE_CLIENT_DATA:
        loadedData = yield call(updateClientData, payload)
        break
    }
    const { data } = loadedData
    if (data.IsSuccess) {
      yield put({ type: UPDATE_SUBSCRIBER_CLIENT_DATA_SUCCESS, payload: data.Data })
      notification.success({
        message: 'Данные абонента',
        description: data?.MessageText
      })
    } else {
      yield put({ type: UPDATE_SUBSCRIBER_CLIENT_DATA_ERROR, payload: { error: data } })
      notification.error({
        message: 'Данные абонента',
        description: data?.MessageText
      })
    }
  } catch (error) {
    yield put({ type: UPDATE_SUBSCRIBER_CLIENT_DATA_FAILURE, message: error.message })
    notification.error({
      message: 'Данные абонента',
      description: error.message
    })
  }
}

export function * deleteFromSpaceSaga ({ payload }) {
  const personalAccount = yield select(getPersonalAccountState)
  const {
    ClientId,
    SubscriberId,
    BillingBranchId,
    SubscriberFullInfo: {
      SubscriberInfo: {
        SubscriberTypeId,
        SubscriberStatusId
      }
    }
  } = personalAccount

  const requestPayload = {
    SubscriberBranchId: BillingBranchId,
    SubscriberTypeId,
    SubscriberStatusId,
    SubscriberId,
    ClientBranchId: BillingBranchId,
    ClientId
  }

  try {
    const response = yield call(deleteFromSpace, { ...payload, ...requestPayload })
    const { data: { MessageText, ResultType } } = response
    switch (ResultType) {
      case servicesMessageTypes.success:
        yield put({ type: DELETE_FROM_SPACE_SUCCESS })
        notification.success({
          message: 'Роуминг-режим',
          description: MessageText
        })
        break
      default:
        yield put({ type: DELETE_FROM_SPACE_ERROR })
        notification.error({
          message: 'Роуминг-режим',
          description: MessageText
        })
        break
    }
  } catch {
    yield put({ type: DELETE_FROM_SPACE_FAILURE })
    notification.error({
      message: 'Роуминг-режим. Ошибка загрузки данных'
    })
  }
}

export function * postSendAgreeSaga ({ payload }) {
  try {
    const { data } = yield call(postSendAgree, payload)
    if (data.IsSuccess) {
      yield put({ type: POST_SEND_AGREE_SUCCESS, payload: { data: data.Data } })

      const personalAccount = yield select(getPersonalAccountState)
      const { Msisdn, BillingBranchId, SubClientId, ClientId, ClientCategory } = personalAccount
      const cardMode = getCardMode(ClientCategory, Msisdn)
      if (cardMode !== cardModes.client) {
        yield put({
          type: FETCH_DATA_SUBSCRIBER,
          payload: {
            Msisdn: Msisdn,
            BranchId: BillingBranchId,
            ClientId: SubClientId || ClientId,
            isB2b: true
          }
        })
      }
    } else {
      const { ResultType } = data
      yield put({ type: POST_SEND_AGREE_ERROR, payload: { error: data } })
      notification.open({
        message: `Ошибка`,
        description: data.MessageText,
        type: ResultType === 2 ? 'error' : 'warning'
      })
    }
  } catch (error) {
    yield put({ type: POST_SEND_AGREE_FAILURE, message: error.message })
    notification.open({
      message: `Ошибка`,
      description: error.message,
      type: 'error'
    })
  }
}
