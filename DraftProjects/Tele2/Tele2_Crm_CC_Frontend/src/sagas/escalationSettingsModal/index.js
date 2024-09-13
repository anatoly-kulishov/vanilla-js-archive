import { all, takeEvery } from 'redux-saga/effects'

import {
  FETCH_DESTINATION_GROUPS_TREE,
  LINK_DESTINATION_GROUP_TO_REASON_CATEGORY,
  UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY,
  FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY,
  FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY,
  FETCH_BPM_ONLINE_SERVICES,
  FETCH_SMS_TEMPLATES,
  MODIFY_ESCALATION_PARAMS,
  CREATE_ESCALATION_PARAMS,
  DELETE_ESCALATION_PARAMS
} from 'reducers/escalationSettingsModalReducer'

import {
  fetchDestinationGroupsTreeSaga,
  linkDestinationGroupToReasonCategorySaga,
  unlinkDestinationGroupToReasonCategorySaga,
  fetchDestinationGroupsTreeByReasonCategorySaga,
  fetchEscalationParamsByReasonCategorySaga,
  fetchBpmOnlineServicesSaga,
  fetchSmsTemplatesSaga,
  modifyEscalationParamsSaga,
  createEscalationParamsSaga,
  deleteEscalationParamsSaga
} from './escalationSettingsModalSaga'

export default function * () {
  yield all([
    takeEvery(FETCH_DESTINATION_GROUPS_TREE, fetchDestinationGroupsTreeSaga),
    takeEvery(LINK_DESTINATION_GROUP_TO_REASON_CATEGORY, linkDestinationGroupToReasonCategorySaga),
    takeEvery(UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY, unlinkDestinationGroupToReasonCategorySaga),
    takeEvery(FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY, fetchDestinationGroupsTreeByReasonCategorySaga),
    takeEvery(FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY, fetchEscalationParamsByReasonCategorySaga),
    takeEvery(FETCH_BPM_ONLINE_SERVICES, fetchBpmOnlineServicesSaga),
    takeEvery(FETCH_SMS_TEMPLATES, fetchSmsTemplatesSaga),
    takeEvery(MODIFY_ESCALATION_PARAMS, modifyEscalationParamsSaga),
    takeEvery(CREATE_ESCALATION_PARAMS, createEscalationParamsSaga),
    takeEvery(DELETE_ESCALATION_PARAMS, deleteEscalationParamsSaga)
  ])
}
