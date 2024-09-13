import { all, takeEvery } from 'redux-saga/effects'

import {
  FETCH_COMMENT_TEMPLATES,
  CREATE_COMMENT_TEMPLATE_FETCH,
  DELETE_COMMENT_TEMPLATE_FETCH,
  MODIFY_COMMENT_TEMPLATE_FETCH
} from 'reducers/commentTemplates/commentTemplatesReducer'

import {
  FETCH_REASON_CATEGORY_COMMENT_TEMPLATES,
  CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH,
  DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH
} from 'reducers/commentTemplates/reasonCategoryCommentTemplatesReducer'

import {
  fetchCommentTemplatesSaga,
  createCommentTemplateSaga,
  deleteCommentTemplateSaga,
  modifyCommentTemplateSaga
} from './commentTemplatesSaga'

import {
  fetchReasonCategoryCommentTemplatesSaga,
  createReasonCategoryCommentTemplateTemplateSaga,
  deleteReasonCategoryCommentTemplateSaga
} from './reasonCategoryCommentTemplatesSaga'

export default function * () {
  yield all([
    takeEvery(FETCH_REASON_CATEGORY_COMMENT_TEMPLATES, fetchReasonCategoryCommentTemplatesSaga),
    takeEvery(DELETE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH, deleteReasonCategoryCommentTemplateSaga),
    takeEvery(CREATE_REASON_CATEGORY_COMMENT_TEMPLATE_FETCH, createReasonCategoryCommentTemplateTemplateSaga),
    takeEvery(FETCH_COMMENT_TEMPLATES, fetchCommentTemplatesSaga),
    takeEvery(CREATE_COMMENT_TEMPLATE_FETCH, createCommentTemplateSaga),
    takeEvery(DELETE_COMMENT_TEMPLATE_FETCH, deleteCommentTemplateSaga),
    takeEvery(MODIFY_COMMENT_TEMPLATE_FETCH, modifyCommentTemplateSaga)
  ])
}
