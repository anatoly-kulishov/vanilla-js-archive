import { all, takeEvery, takeLatest } from 'redux-saga/effects'

import {
  FETCH_TEMPLATES,
  FETCH_SENDERS,
  FETCH_PERIOD_OF_SILENCE,
  FETCH_LTE_NUMBER,
  SEND_SMS,
  CANCEL_SMS,
  FETCH_REASON_CATEGORY_COMMENT_TEMPLATES as SMS_SENDING_FETCH_REASON_CATEGORY_COMMENT_TEMPLATES,
  FILTER_TEMPLATES as SMS_SENDING_FILTER_TEMPLATES,
  FILTER_REASONS as SMS_SENDING_FILTER_REASONS,
  FETCH_REASONS as SMS_SENDING_FETCH_REASONS
} from 'reducers/smsSendingReducer'

import {
  FETCH_INTERACTIONS,
  FETCH_COMPANY_MARKS,
  SET_COMPANY_MARK,
  REMOVE_COMPANY_MARK,
  CREATE_INTERACTION,
  DELETE_INTERACTION,
  FETCH_INTERACTIONS_COMMENT_TEMPLATES,
  FETCH_REASON_CATEGORY_COMMENT_TEMPLATES as REASONS_REGISTERING_FETCH_REASON_CATEGORY_COMMENT_TEMPLATES,
  FILTER_REASONS as REASONS_REGISTERING_FILTER_REASONS,
  FETCH_REASONS as REASONS_REGISTERING_FETCH_REASONS,
  CHANGE_COMPANY_MARK,
  FETCH_COMPANY_MARKS_FOR_HANDLING,
  EDIT_INTERACTION_COMMENT
} from 'reducers/reasonsRegisteringReducer'

import {
  fetchTemplatesSaga,
  fetchSendersSaga,
  fetchPeriodOfSilenceSaga,
  fetchLteNumberSaga,
  sendSmsSaga,
  cancelSmsSaga,
  fetchReasonCategoryCommentTemplatesSaga as smsSendingFetchReasonCategoryCommentTemplatesSaga,
  filterTemplatesDelaySaga as filterSmsSendingTemplatesDelaySaga,
  filterReasonsDelaySaga as filterSmsSendingReasonsDelaySaga,
  fetchReasonsCategoriesSaga as fetchSmsSendingReasonsCategoriesSaga
} from './smsSendingSaga'

import {
  fetchInteractionsSaga,
  fetchCompanyMarksSaga,
  setCompanyMarkSaga,
  removeCompanyMarkSaga,
  createInteractionSaga,
  deleteInteractionSaga,
  fetchReasonCategoryCommentTemplatesSaga as reasonsRegisteringFetchReasonCategoryCommentTemplatesSaga,
  filterReasonsDelaySaga as filterReasonsRegisteringReasonsDelaySaga,
  fetchReasonsCategoriesSaga as fetchReasonsRegisteringReasonsCategoriesSaga,
  changeCompanyMarksSaga,
  fetchCompanyMarksForHandlingSaga,
  fetchInteractionsCommentTemplatesSaga,
  editInteractionCommentSaga
} from './reasonsRegisteringSaga'

export default function * () {
  yield all([

    // SMS
    takeEvery(SMS_SENDING_FETCH_REASONS, fetchSmsSendingReasonsCategoriesSaga),
    takeEvery(FETCH_TEMPLATES, fetchTemplatesSaga),
    takeEvery(FETCH_SENDERS, fetchSendersSaga),
    takeEvery(FETCH_PERIOD_OF_SILENCE, fetchPeriodOfSilenceSaga),
    takeEvery(FETCH_LTE_NUMBER, fetchLteNumberSaga),
    takeEvery(SEND_SMS, sendSmsSaga),
    takeEvery(CANCEL_SMS, cancelSmsSaga),
    takeEvery(
      SMS_SENDING_FETCH_REASON_CATEGORY_COMMENT_TEMPLATES,
      smsSendingFetchReasonCategoryCommentTemplatesSaga
    ),

    takeLatest(SMS_SENDING_FILTER_REASONS, filterSmsSendingReasonsDelaySaga),
    takeLatest(SMS_SENDING_FILTER_TEMPLATES, filterSmsSendingTemplatesDelaySaga),

    // Registering
    takeEvery(REASONS_REGISTERING_FETCH_REASONS, fetchReasonsRegisteringReasonsCategoriesSaga),
    takeEvery(FETCH_INTERACTIONS, fetchInteractionsSaga),
    takeEvery(FETCH_COMPANY_MARKS, fetchCompanyMarksSaga),
    takeEvery(FETCH_COMPANY_MARKS_FOR_HANDLING, fetchCompanyMarksForHandlingSaga),
    takeEvery(SET_COMPANY_MARK, setCompanyMarkSaga),
    takeEvery(REMOVE_COMPANY_MARK, removeCompanyMarkSaga),
    takeEvery(CREATE_INTERACTION, createInteractionSaga),
    takeEvery(DELETE_INTERACTION, deleteInteractionSaga),
    takeEvery(FETCH_INTERACTIONS_COMMENT_TEMPLATES, fetchInteractionsCommentTemplatesSaga),
    takeEvery(CHANGE_COMPANY_MARK, changeCompanyMarksSaga),
    takeEvery(EDIT_INTERACTION_COMMENT, editInteractionCommentSaga),
    takeEvery(
      REASONS_REGISTERING_FETCH_REASON_CATEGORY_COMMENT_TEMPLATES,
      reasonsRegisteringFetchReasonCategoryCommentTemplatesSaga
    ),

    takeLatest(REASONS_REGISTERING_FILTER_REASONS, filterReasonsRegisteringReasonsDelaySaga)
  ])
}
