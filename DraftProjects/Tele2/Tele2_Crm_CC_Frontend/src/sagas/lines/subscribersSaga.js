import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

import { notification } from 'antd'

import {
  FETCH_SUBSCRIBERS_LIST_SUCCESS,
  FETCH_SUBSCRIBERS_LIST_ERROR,
  FETCH_SUBSCRIBERS_LIST_FAILURE,

  FETCH_GROUP_NOTIFICATION_MESSAGES_SUCCESS,
  FETCH_GROUP_NOTIFICATION_MESSAGES_ERROR,
  FETCH_GROUP_NOTIFICATION_MESSAGES_FAILURE
} from 'reducers/lines/subscribersReducer'

export function * fetchSubscriberListSaga ({ payload }) {
  const { fetchGroupSubscriberList } = api

  try {
    const { data: { Data, IsSuccess, MessageText } } = yield call(fetchGroupSubscriberList, payload)

    if (IsSuccess) {
      const { SubscriberList, ...subscriberInfo } = Data
      yield put({ type: FETCH_SUBSCRIBERS_LIST_SUCCESS, payload: { SubscriberList, subscriberInfo } })
    } else {
      yield put({ type: FETCH_SUBSCRIBERS_LIST_ERROR, payload: MessageText })
      notification.error({
        message: 'Ошибка получения подписок',
        description: MessageText
      })
    }
  } catch ({ message: MessageText }) {
    yield put({ type: FETCH_SUBSCRIBERS_LIST_FAILURE, payload: MessageText })
    notification.error({
      message: 'Ошибка получения подписок',
      description: MessageText
    })
  }
}

export function * fetchGroupNotificationMessagesSaga ({ payload }) {
  const { fetchGroupNotificationMessages } = api

  try {
    const { data: { Data, IsSuccess, MessageText } } = yield call(fetchGroupNotificationMessages, payload)

    if (IsSuccess) {
      yield put({ type: FETCH_GROUP_NOTIFICATION_MESSAGES_SUCCESS, payload: Data })
    } else {
      yield put({ type: FETCH_GROUP_NOTIFICATION_MESSAGES_ERROR, payload: MessageText })
      notification.error({
        message: 'Ошибка получения истории сообщений',
        description: MessageText
      })
    }
  } catch ({ message: MessageText }) {
    yield put({ type: FETCH_GROUP_NOTIFICATION_MESSAGES_FAILURE, payload: MessageText })
    notification.error({
      message: 'Ошибка получения истории сообщений',
      description: MessageText
    })
  }
}
