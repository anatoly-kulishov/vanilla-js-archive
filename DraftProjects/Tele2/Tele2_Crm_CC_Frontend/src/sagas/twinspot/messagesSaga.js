import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'

import api from 'utils/api'

import {
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_ERROR,
  FETCH_MESSAGES_FAILURE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
  SEND_MESSAGE_FAILURE,
  FETCH_MESSAGES,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE_FAILURE,
  FETCH_CUVO_LINK_SUCCESS,
  FETCH_CUVO_LINK_ERROR,
  FETCH_CUVO_LINK_FAILURE
} from 'reducers/twinspot/messagesReducer'
import { FETCH_CURRENT_CONVERSATION } from 'reducers/twinspot/conversationsReducer'

const {
  fetchMessages,
  sendMessage,
  uploadFileMongo,
  fetchCuvoLink
} = api

export function * fetchMessagesSaga ({ payload }) {
  try {
    const { data } = yield call(fetchMessages, payload)
    data.IsSuccess
      ? yield put({ type: FETCH_MESSAGES_SUCCESS, payload: data.Data || [] })
      : yield put({ type: FETCH_MESSAGES_ERROR, payload: data })
  } catch (exception) {
    yield put({ type: FETCH_MESSAGES_FAILURE, message: exception.message })
  }
}

export function * sendMessageSaga ({ payload }) {
  try {
    const { data } = yield call(sendMessage, payload)
    if (data.IsSuccess) {
      yield put({ type: SEND_MESSAGE_SUCCESS, payload: data.Data })
      yield put({ type: FETCH_MESSAGES, payload: { ConversationId: payload.ConversationId } })
      yield put({ type: FETCH_CURRENT_CONVERSATION, payload: { ConversationId: payload.ConversationId } })
      notification.success({
        message: 'Сообщение отправлено',
        description: ''
      })
    } else {
      yield put({ type: SEND_MESSAGE_ERROR, payload: data })
      notification.error({
        message: 'Ошибка отправки сообщения',
        description: ''
      })
    }
  } catch (exception) {
    yield put({ type: SEND_MESSAGE_FAILURE, message: exception.message })
  }
}

export function * uploadFileSaga ({ payload }) {
  try {
    const { data: { Data, IsSuccess, MessageText } } = yield call(uploadFileMongo, payload)
    IsSuccess
      ? yield put({ type: UPLOAD_FILE_SUCCESS, payload: Data })
      : yield put({ type: UPLOAD_FILE_ERROR, MessageText })
  } catch (exception) {
    yield put({ type: UPLOAD_FILE_FAILURE, payload: exception.message })
  }
}

export function * fetchCuvoLinkSaga () {
  try {
    const { data: { Data, IsSuccess, MessageText } } = yield call(fetchCuvoLink)
    IsSuccess
      ? yield put({ type: FETCH_CUVO_LINK_SUCCESS, payload: Data })
      : yield put({ type: FETCH_CUVO_LINK_ERROR, MessageText })
  } catch (exception) {
    yield put({ type: FETCH_CUVO_LINK_FAILURE, payload: exception.message })
  }
}
