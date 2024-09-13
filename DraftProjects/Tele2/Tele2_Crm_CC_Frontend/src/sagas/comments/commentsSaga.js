import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'

import {
  GET_COMMENTS_FETCH,
  GET_COMMENTS_FETCH_SUCCESS,
  GET_COMMENTS_FETCH_ERROR,
  GET_COMMENTS_FETCH_FAILURE,

  HANDLE_COMMENT_FETCH_SUCCESS,
  HANDLE_COMMENT_FETCH_ERROR,
  HANDLE_COMMENT_FETCH_FAILURE,

  FETCH_POPUP_COMMENT_SUCCESS,
  FETCH_POPUP_COMMENT_ERROR,
  FETCH_POPUP_COMMENT_FAILURE
} from 'reducers/comments/commentsReducer'

const { fetchPopupComment, fetchComments, handleComment } = api

export function * fetchCommentsSaga ({ payload: { clientId, subClientId, msisdn, branchId } }) {
  try {
    const { data } = yield call(fetchComments, { clientId, subClientId, msisdn, branchId })
    if (data.IsSuccess) {
      yield put({ type: GET_COMMENTS_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: GET_COMMENTS_FETCH_ERROR, payload: data })
      notification.open({
        message: `Комментарии `,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: GET_COMMENTS_FETCH_FAILURE, message: exception.message })
  }
}
// TODO: убрать ненужные деструктуризации payload
export function * fetchHandleCommentSaga (
  { payload: { id, subject, text, typeId, isClientComment, branchId, popup, clientId, msisdn, subClientId, handlingId } }) {
  try {
    let serverAnswer = null
    if (isClientComment) {
      serverAnswer = yield call(handleComment, {
        clientId: id,
        subject: subject,
        text: text,
        typeId: typeId,
        isClientComment: isClientComment,
        branchId: branchId,
        popup: popup,
        handlingId
      })
    } else {
      serverAnswer = yield call(handleComment, {
        subscriberId: id,
        subject: subject,
        text: text,
        typeId: typeId,
        isClientComment: isClientComment,
        branchId: branchId,
        popup: popup,
        handlingId
      })
    }

    const { data } = serverAnswer
    if (data.IsSuccess) {
      yield put({ type: HANDLE_COMMENT_FETCH_SUCCESS, payload: data })
      yield put({ type: GET_COMMENTS_FETCH, payload: { clientId, subClientId, msisdn, branchId } })
      notification.open({
        message: `Комментарии `,
        description: data.MessageText,
        type: 'info'
      })
    } else {
      yield put({ type: HANDLE_COMMENT_FETCH_ERROR, payload: data })

      notification.open({
        message: `Комментарии `,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: HANDLE_COMMENT_FETCH_FAILURE, message: exception.message })
  }
}

export function * fetchPopupCommentSaga ({ payload }) {
  try {
    const { data } = yield call(fetchPopupComment, payload)
    if (data.IsSuccess) {
      yield put({ type: FETCH_POPUP_COMMENT_SUCCESS })
    } else {
      yield put({ type: FETCH_POPUP_COMMENT_ERROR })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_POPUP_COMMENT_FAILURE })
    notification.error({
      message: `Комментарии `,
      description: message
    })
  }
}
