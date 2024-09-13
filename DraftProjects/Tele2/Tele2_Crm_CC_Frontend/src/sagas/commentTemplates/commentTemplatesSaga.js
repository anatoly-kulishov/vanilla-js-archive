import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'

import {
  FETCH_COMMENT_TEMPLATES,
  FETCH_COMMENT_TEMPLATES_SUCCESS,
  FETCH_COMMENT_TEMPLATES_ERROR,
  FETCH_COMMENT_TEMPLATES_FAILURE,
  CREATE_COMMENT_TEMPLATE_FETCH_SUCCESS,
  CREATE_COMMENT_TEMPLATE_FETCH_ERROR,
  CREATE_COMMENT_TEMPLATE_FETCH_FAILURE,
  DELETE_COMMENT_TEMPLATE_FETCH_SUCCESS,
  DELETE_COMMENT_TEMPLATE_FETCH_ERROR,
  DELETE_COMMENT_TEMPLATE_FETCH_FAILURE,
  MODIFY_COMMENT_TEMPLATE_FETCH_SUCCESS,
  MODIFY_COMMENT_TEMPLATE_FETCH_ERROR,
  MODIFY_COMMENT_TEMPLATE_FETCH_FAILURE
} from '../../reducers/commentTemplates/commentTemplatesReducer'

const {
  fetchCommentTemplates,
  deleteCommentTemplate,
  modifyCommentTemplate,
  createCommentTemplate
} = api

export function * fetchCommentTemplatesSaga ({ payload }) {
  try {
    const { data } = yield call(fetchCommentTemplates, payload)
    if (data.IsSuccess) {
      yield put({ type: FETCH_COMMENT_TEMPLATES_SUCCESS, payload: data })
    } else {
      yield put({ type: FETCH_COMMENT_TEMPLATES_ERROR, payload: data })
      notification.open({
        message: `Комментарии `,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_COMMENT_TEMPLATES_FAILURE, message: exception.message })
  }
}

export function * createCommentTemplateSaga ({ payload }) {
  try {
    const { data } = yield call(createCommentTemplate, payload)
    if (data.IsSuccess) {
      yield put({ type: CREATE_COMMENT_TEMPLATE_FETCH_SUCCESS, payload: data })
      yield put({ type: FETCH_COMMENT_TEMPLATES })
      notification.open({
        message: `Комментарии `,
        description: data.MessageText,
        type: 'info'
      })
    } else {
      yield put({ type: CREATE_COMMENT_TEMPLATE_FETCH_ERROR, payload: data })
      notification.open({
        message: `Комментарии `,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: CREATE_COMMENT_TEMPLATE_FETCH_FAILURE, message: exception.message })
  }
}

export function * deleteCommentTemplateSaga ({ payload }) {
  try {
    const { commentTemplateId } = payload
    const { data } = yield call(deleteCommentTemplate, commentTemplateId)
    if (data.IsSuccess) {
      yield put({ type: DELETE_COMMENT_TEMPLATE_FETCH_SUCCESS, payload: data })
      yield put({ type: FETCH_COMMENT_TEMPLATES })
      notification.open({
        message: `Комментарии `,
        description: data.MessageText,
        type: 'info'
      })
    } else {
      yield put({ type: DELETE_COMMENT_TEMPLATE_FETCH_ERROR, payload: data })
      notification.open({
        message: `Комментарии `,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: DELETE_COMMENT_TEMPLATE_FETCH_FAILURE, message: exception.message })
  }
}

export function * modifyCommentTemplateSaga ({ payload }) {
  try {
    const { data } = yield call(modifyCommentTemplate, payload)
    if (data.IsSuccess) {
      yield put({ type: MODIFY_COMMENT_TEMPLATE_FETCH_SUCCESS, payload: data })
      yield put({ type: FETCH_COMMENT_TEMPLATES })
      notification.open({
        message: `Комментарии `,
        description: data.MessageText,
        type: 'info'
      })
    } else {
      yield put({ type: MODIFY_COMMENT_TEMPLATE_FETCH_ERROR, payload: data })
      notification.open({
        message: `Комментарии `,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: MODIFY_COMMENT_TEMPLATE_FETCH_FAILURE, message: exception.message })
  }
}
