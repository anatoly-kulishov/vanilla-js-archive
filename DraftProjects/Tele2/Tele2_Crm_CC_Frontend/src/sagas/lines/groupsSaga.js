import { call, put, select } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'

import {
  FETCH_GROUP_LIST,
  FETCH_GROUP_LIST_SUCCESS,
  FETCH_GROUP_LIST_ERROR,
  FETCH_GROUP_LIST_FAILURE,

  VALIDATE_AUTOPAY_SERVICE_SUCCESS,
  VALIDATE_AUTOPAY_SERVICE_ERROR,
  VALIDATE_AUTOPAY_SERVICE_FAILURE,

  FETCH_DELETE_GROUP_SUCCESS,
  FETCH_DELETE_GROUP_ERROR,
  FETCH_DELETE_GROUP_FAILURE
} from 'reducers/lines/groupsReducer'

import { FETCH_SUBSCRIBERS_LIST } from 'reducers/lines/subscribersReducer'

import { getPersonalAccountState } from 'selectors'

const message = 'Группы абонента'

export function * fetchGroupListSaga ({ payload }) {
  const { fetchGroupList } = api

  try {
    const { data: { Data, IsSuccess, MessageText } } = yield call(fetchGroupList, payload)
    if (IsSuccess) {
      const { GroupList, ...groupInfo } = Data
      yield put({ type: FETCH_GROUP_LIST_SUCCESS, payload: { GroupList, groupInfo } })
    } else {
      yield put({ type: FETCH_GROUP_LIST_ERROR, payload: MessageText })
    }
  } catch ({ message: MessageText }) {
    yield put({ type: FETCH_GROUP_LIST_FAILURE, payload: MessageText })
  }
}

export function * validateAutopayServiceSaga ({ payload }) {
  const { validateAutopayService } = api

  try {
    const { data: { IsSuccess, MessageText } } = yield call(validateAutopayService, payload)
    if (IsSuccess) {
      yield put({ type: VALIDATE_AUTOPAY_SERVICE_SUCCESS })
    } else {
      yield put({ type: VALIDATE_AUTOPAY_SERVICE_ERROR, payload: MessageText })
      if (MessageText) {
        notification.warning({
          message: message,
          description: MessageText
        })
      }
    }
  } catch ({ message: MessageText }) {
    yield put({ type: VALIDATE_AUTOPAY_SERVICE_FAILURE, payload: MessageText })
    notification.error({
      message: message,
      description: MessageText
    })
  }
}

export function * deleteGroupSaga ({ payload }) {
  const { deleteGroupSubscriber } = api
  const personalAccount = yield select(getPersonalAccountState)

  const { Msisdn: msisdn } = personalAccount

  try {
    const { data } = yield call(deleteGroupSubscriber, payload.deleteParams)
    if (data.IsSuccess) {
      yield put({ type: FETCH_DELETE_GROUP_SUCCESS, payload: data })
      if (payload.isGroup) {
        yield put({ type: FETCH_GROUP_LIST, payload: { msisdn } })
      } else {
        yield put({ type: FETCH_SUBSCRIBERS_LIST, payload: { msisdn, groupId: payload.groupId } })
      }
      if (data.Data.IsSuccess) {
        notification.success({
          message: message,
          description: data.Data.ResponseMessage
        })
      } else {
        notification.error({
          message: message,
          description: data.Data.ResponseMessage
        })
      }
    } else {
      yield put({ type: FETCH_DELETE_GROUP_ERROR, payload: data })
      notification.error({
        message: message,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_DELETE_GROUP_FAILURE, message: exception.message })
  }
}
