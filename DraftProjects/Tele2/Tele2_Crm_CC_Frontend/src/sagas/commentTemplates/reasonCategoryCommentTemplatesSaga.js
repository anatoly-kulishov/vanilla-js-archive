import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'

import {
  FETCH_REASON_CATEGORY_COMMENT_TEMPLATES,
  FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_SUCCESS,
  FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_ERROR,
  FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_FAILURE,
  CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_SUCCESS,
  CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_ERROR,
  CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_FAILURE,
  DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_SUCCESS,
  DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_ERROR,
  DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_FAILURE
} from '../../reducers/commentTemplates/reasonCategoryCommentTemplatesReducer'

import { FETCH_COMMENT_TEMPLATES } from '../../reducers/commentTemplates/commentTemplatesReducer'

const {
  // fetchReasonCategoryCommentTemplates,
  fetchReasonCategoryCommentTemplatesForAdmin,
  createReasonCategoryCommentTemplateTemplate,
  deleteReasonCategoryCommentTemplate
} = api

export function * fetchReasonCategoryCommentTemplatesSaga ({ payload }) {
  try {
    const { data } = yield call(fetchReasonCategoryCommentTemplatesForAdmin, payload)

    if (data.IsSuccess) {
      yield put({ type: FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_SUCCESS, payload: data })
    } else {
      yield put({ type: FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_ERROR, payload: data })
      notification.open({
        message: `Комментарии `,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_FAILURE, message: exception.message })
  }
}

export function * createReasonCategoryCommentTemplateTemplateSaga ({ payload }) {
  try {
    const { data } = yield call(createReasonCategoryCommentTemplateTemplate, payload)
    if (data.IsSuccess) {
      yield put({ type: CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_SUCCESS, payload: data })
      yield put({ type: FETCH_REASON_CATEGORY_COMMENT_TEMPLATES, payload: { reasonId: payload[0].ReasonId, categoryId: payload[0].CategoryId } })
      yield put({ type: FETCH_COMMENT_TEMPLATES, payload: { reasonId: payload[0].ReasonId, categoryId: payload[0].CategoryId } })
      notification.open({
        message: `Комментарии `,
        description: data.MessageText,
        type: 'info'
      })
    } else {
      yield put({ type: CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_ERROR, payload: data })
      notification.open({
        message: `Комментарии `,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_FAILURE, message: exception.message })
  }
}

export function * deleteReasonCategoryCommentTemplateSaga ({ payload: { ReasonId, CategoryId, TemplateId } }) {
  try {
    const { data } = yield call(deleteReasonCategoryCommentTemplate, { ReasonId, CategoryId, TemplateId })
    if (data.IsSuccess) {
      yield put({ type: DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_SUCCESS, payload: data })
      yield put({ type: FETCH_REASON_CATEGORY_COMMENT_TEMPLATES, payload: { reasonId: ReasonId, categoryId: CategoryId } })
      yield put({ type: FETCH_COMMENT_TEMPLATES, payload: { reasonId: ReasonId, categoryId: CategoryId } })
    } else {
      yield put({ type: DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_ERROR, payload: data })
      notification.open({
        message: `Комментарии `,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH_FAILURE, message: exception.message })
  }
}
