import React from 'react'
import { all, call, put, select } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'

import {
  ACCRUE_SUBSCRIPTION_COMPENSATION_ERROR,
  ACCRUE_SUBSCRIPTION_COMPENSATION_FAILURE,
  ACCRUE_SUBSCRIPTION_COMPENSATION_SUCCESS,
  GET_SUBSCRIPTION_COMPENSATION_AMOUNTS_ERROR,
  GET_SUBSCRIPTION_COMPENSATION_AMOUNTS_FAILURE,
  GET_SUBSCRIPTION_COMPENSATION_AMOUNTS_SUCCESS,
  GET_SUBSCRIPTION_COMPENSATION_LIMITS_ERROR,
  GET_SUBSCRIPTION_COMPENSATION_LIMITS_FAILURE,
  GET_SUBSCRIPTION_COMPENSATION_LIMITS_SUCCESS
} from 'reducers/subscriptions/subscriptionCompensationReducer'
import { getHandlingState, getPersonalAccountState, getUserState } from 'selectors/index'
import HtmlRender from 'components/HtmlRender'

const purifyOptions = { ADD_ATTR: ['target'] }

const { getSubscriptionCompensationAmounts, getSubscriptionCompensationLimits, accrueSubscriptionCompensation } = api

const getNotificationDescription = response => {
  let notificationDescription
  if (response?.MessageText) {
    notificationDescription = response?.MessageText
  } else if (response?.message) {
    notificationDescription = response?.message
  } else if (typeof response === 'string') {
    notificationDescription = response
  }

  return <HtmlRender value={notificationDescription} options={purifyOptions} />
}

export function * getSubscriptionCompensationAmountsSaga ({ payload }) {
  const notificationTitle = 'Получение значений компенсаций для подписок'
  try {
    const { data, status } = yield call(getSubscriptionCompensationAmounts, payload)
    if (status === 200) {
      yield put({ type: GET_SUBSCRIPTION_COMPENSATION_AMOUNTS_SUCCESS, payload: data })
    } else {
      const notificationDescription = getNotificationDescription(data)
      yield put({ type: GET_SUBSCRIPTION_COMPENSATION_AMOUNTS_ERROR, payload: data })
      notification.error({ message: notificationTitle, description: notificationDescription })
    }
  } catch (exception) {
    const notificationDescription = getNotificationDescription(exception?.response?.data) || exception.message
    yield put({ type: GET_SUBSCRIPTION_COMPENSATION_AMOUNTS_FAILURE, message: exception.message })
    notification.error({ message: notificationTitle, description: notificationDescription })
  }
}

export function * getSubscriptionCompensationLimitsSaga ({ payload }) {
  const notificationTitle = 'Получение лимитов компенсаций для подписок'
  try {
    const { data, status } = yield call(getSubscriptionCompensationLimits, payload)
    if (status === 200) {
      yield put({ type: GET_SUBSCRIPTION_COMPENSATION_LIMITS_SUCCESS, payload: data })
    } else {
      const notificationDescription = getNotificationDescription(data)
      yield put({ type: GET_SUBSCRIPTION_COMPENSATION_LIMITS_ERROR, payload: data })
      notification.error({ message: notificationTitle, description: notificationDescription })
    }
  } catch (exception) {
    const notificationDescription = getNotificationDescription(exception?.response?.data) || exception.message
    yield put({ type: GET_SUBSCRIPTION_COMPENSATION_LIMITS_FAILURE, message: exception.message })
    notification.error({ message: notificationTitle, description: notificationDescription })
  }
}

export function * accrueSubscriptionCompensationSaga ({ payload }) {
  const notificationTitle = 'Начисление компенсации для подписки'
  const { serviceNumber, amount } = payload
  try {
    const [handlingState, personalAccountState, userState] = yield all([
      select(getHandlingState),
      select(getPersonalAccountState),
      select(getUserState)
    ])

    const { Id } = handlingState
    const { DisplayName } = userState
    const { ClientId, BillingBranchId, Msisdn, SubscriberId } = personalAccountState
    const { SubscriberTypeId, SubscriberStatusId } = personalAccountState?.SubscriberId?.SubscriberInfo ?? {}

    const requestPayload = {
      ...payload,
      amount: typeof amount === 'string' ? +amount : amount,
      handlingId: Id,
      clientId: ClientId,
      clientBranchId: BillingBranchId,
      msisdn: Msisdn,
      subscriberId: SubscriberId,
      subscriberBranchId: BillingBranchId,
      subscriberTypeId: SubscriberTypeId,
      subscriberStatusId: SubscriberStatusId,
      userFIO: DisplayName
    }

    const { data, status } = yield call(accrueSubscriptionCompensation, requestPayload)
    const notificationDescription = getNotificationDescription(data)

    if (status === 201) {
      yield put({ type: ACCRUE_SUBSCRIPTION_COMPENSATION_SUCCESS, payload: { serviceNumber } })
      notification.success({ message: notificationTitle, description: notificationDescription })
    } else {
      yield put({ type: ACCRUE_SUBSCRIPTION_COMPENSATION_ERROR, payload: { serviceNumber } })
      notification.error({ message: notificationTitle, description: notificationDescription })
    }
  } catch (exception) {
    const notificationDescription = getNotificationDescription(exception?.response?.data) || exception.message
    yield put({
      type: ACCRUE_SUBSCRIPTION_COMPENSATION_FAILURE,
      message: exception.message,
      payload: { serviceNumber }
    })
    notification.error({ message: notificationTitle, description: notificationDescription })
  }
}
