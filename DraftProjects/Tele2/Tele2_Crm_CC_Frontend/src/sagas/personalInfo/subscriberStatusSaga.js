import { call, put } from 'redux-saga/effects'
import api from 'utils/api'
import { notification } from 'antd'

import {
  SUBSCRIBER_STATUS_HISTORY_FETCH_SUCCESS,
  SUBSCRIBER_STATUS_HISTORY_FETCH_ERROR,
  SUBSCRIBER_STATUS_HISTORY_FETCH_FAILURE,

  SUBSCRIBER_STATUS_UPDATE_FETCH_SUCCESS,
  SUBSCRIBER_STATUS_UPDATE_FETCH_ERROR,
  SUBSCRIBER_STATUS_UPDATE_FETCH_FAILURE,

  RECOMMENDATION_CHANGE_STATUS_FETCH_SUCCESS,
  RECOMMENDATION_CHANGE_STATUS_FETCH_ERROR,
  RECOMMENDATION_CHANGE_STATUS_FETCH_FAILURE,

  FETCH_SUBSCRIBER_STATUS_LIST_SUCCESS,
  FETCH_SUBSCRIBER_STATUS_LIST_ERROR,
  FETCH_SUBSCRIBER_STATUS_LIST_FAILURE
} from 'reducers/personalInfo/subscriberStatusReducer'

import { FETCH_INTERACTIONS } from 'reducers/reasonsRegisteringReducer'

const {
  fetchSubscriberServiceStatusHistory,
  fetchSubscriberServiceStatusUpdate,
  fetchSubscriberStatusList,
  fetchRecommendationChangeStatus
} = api

export function * fetchSubscriberServiceStatusHistorySaga ({ payload }) {
  try {
    const { data } = yield call(fetchSubscriberServiceStatusHistory, payload)
    if (data.IsSuccess) {
      yield put({ type: SUBSCRIBER_STATUS_HISTORY_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: SUBSCRIBER_STATUS_HISTORY_FETCH_ERROR, payload: data })
      notification.error({
        message: 'Изменение статуса абонента: история',
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: SUBSCRIBER_STATUS_HISTORY_FETCH_FAILURE, message: exception.message })
  }
}

export function * fetchSubscriberServiceStatusUpdateSaga ({ payload }) {
  const message = 'Изменение статуса абонента'
  try {
    const { data } = yield call(fetchSubscriberServiceStatusUpdate, payload)
    if (data.IsSuccess) {
      yield put({ type: SUBSCRIBER_STATUS_UPDATE_FETCH_SUCCESS, payload: data })
      if (data.Data.CreateInteractionSuccess) {
        yield put({ type: FETCH_INTERACTIONS,
          payload: {
            handlingId: payload.handlingId,
            msisdn: payload.msisdn,
            email: payload.email,
            includeRepeatingEntries: true }
        })
        notification.success({
          message: message,
          description: 'Статус абонента успешно изменен'
        })
      } else {
        notification.error({
          message: message,
          description: data.Data && data.Data.CreateInteractionMessage
        })
      }
    } else {
      yield put({ type: SUBSCRIBER_STATUS_UPDATE_FETCH_ERROR, payload: data })
      notification.error({
        message: message,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: SUBSCRIBER_STATUS_UPDATE_FETCH_FAILURE, message: exception.message })
    notification.error({
      message: message,
      description: 'Ошибка сети'
    })
  }
}

export function * fetchRecommendationChangeStatusSaga ({ payload }) {
  try {
    const { data } = yield call(fetchRecommendationChangeStatus, payload)
    if (data.IsSuccess) {
      yield put({ type: RECOMMENDATION_CHANGE_STATUS_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: RECOMMENDATION_CHANGE_STATUS_FETCH_ERROR, payload: data })
      notification.error({
        message: 'Рекомендации при смене статуса абонента',
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: RECOMMENDATION_CHANGE_STATUS_FETCH_FAILURE, message: exception.message })
    notification.error({
      message: 'Рекомендации при смене статуса абонента',
      description: exception.message
    })
  }
}

export function * fetchSubscriberStatusListSaga ({ payload }) {
  try {
    const { data } = yield call(fetchSubscriberStatusList, payload)
    if (data.IsSuccess) {
      yield put({ type: FETCH_SUBSCRIBER_STATUS_LIST_SUCCESS, payload: data })
    } else {
      yield put({ type: FETCH_SUBSCRIBER_STATUS_LIST_ERROR, payload: data })
      notification.error({
        message: 'Список статусов',
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_SUBSCRIBER_STATUS_LIST_FAILURE, message: exception.message })
    notification.error({
      message: 'Список статусов',
      description: exception.message
    })
  }
}
