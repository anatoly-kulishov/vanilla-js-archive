import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

import { notification } from 'antd'
import {} from 'reducers/personalInfo/dataClientSubscriberReducer'
import {
  DELETE_SUBSCRIBER_NOTIFICATION_ERROR,
  DELETE_SUBSCRIBER_NOTIFICATION_FAILURE,
  DELETE_SUBSCRIBER_NOTIFICATION_SUCCESS,
  FETCH_SUBSCRIBER_NOTIFICATIONS,
  FETCH_SUBSCRIBER_NOTIFICATIONS_ERROR,
  FETCH_SUBSCRIBER_NOTIFICATIONS_FAILURE,
  FETCH_SUBSCRIBER_NOTIFICATIONS_SUCCESS,
  MODIFY_SUBSCRIBER_NOTIFICATION_ERROR,
  MODIFY_SUBSCRIBER_NOTIFICATION_FAILURE,
  MODIFY_SUBSCRIBER_NOTIFICATION_SUCCESS
} from 'reducers/personalInfo/subscriberNotificationsReducer'

const { fetchSubscriberNotifications, modifySubscriberNotification, deleteSubscriberNotification } = api

export function * fetchSubscriberNotificationsSaga ({ payload }) {
  const errorMessage = 'Получение нотификаций абонента'
  try {
    const { data, status } = yield call(fetchSubscriberNotifications, payload)
    const { warnings, message } = data
    switch (status) {
      case 200:
        yield put({ type: FETCH_SUBSCRIBER_NOTIFICATIONS_SUCCESS, payload: data })
        break
      default:
        yield put({ type: FETCH_SUBSCRIBER_NOTIFICATIONS_ERROR })
        notification.warning({ message: errorMessage, description: warnings ? warnings.join('\n') : message })
    }
  } catch (exception) {
    yield put({ type: FETCH_SUBSCRIBER_NOTIFICATIONS_FAILURE })
    notification.error({ message: errorMessage, description: exception.message })
  }
}

export function * modifySubscriberNotificationSaga ({ payload }) {
  const errorMessage = 'Ошибка при подключении нотификации'
  try {
    const { requestData, notificationParams } = payload

    const { data, status } = yield call(modifySubscriberNotification, requestData)
    const { warnings, message } = data

    switch (status) {
      case 201:
        yield put({ type: MODIFY_SUBSCRIBER_NOTIFICATION_SUCCESS })
        yield put({ type: FETCH_SUBSCRIBER_NOTIFICATIONS, payload: notificationParams })
        notification.success({ description: 'Нотификация успешно подключена' })
        break
      default:
        yield put({ type: MODIFY_SUBSCRIBER_NOTIFICATION_ERROR })
        notification.warning({ message: errorMessage, description: warnings?.length ? warnings?.join('\n') : message })
    }
  } catch (exception) {
    yield put({ type: MODIFY_SUBSCRIBER_NOTIFICATION_FAILURE })
    notification.error({ message: errorMessage, description: exception.message })
  }
}

export function * deleteSubscriberNotificationSaga ({ payload }) {
  const errorMessage = 'Ошибка при отключении нотификации'
  try {
    const { requestData, notificationParams } = payload

    const { data, status } = yield call(deleteSubscriberNotification, requestData)
    const { warnings, message } = data

    switch (status) {
      case 201:
        yield put({ type: DELETE_SUBSCRIBER_NOTIFICATION_SUCCESS })
        yield put({ type: FETCH_SUBSCRIBER_NOTIFICATIONS, payload: notificationParams })
        notification.success({ description: 'Нотификация успешно отключена' })
        break
      default:
        yield put({ type: DELETE_SUBSCRIBER_NOTIFICATION_ERROR })
        notification.warning({ message: errorMessage, description: warnings?.length ? warnings?.join('\n') : message })
    }
  } catch (exception) {
    yield put({ type: DELETE_SUBSCRIBER_NOTIFICATION_FAILURE })
    notification.error({ message: errorMessage, description: exception.message })
  }
}
