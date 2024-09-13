import { connect } from 'react-redux'

import {
  sendSms,
  resetSms,
  cancelSms,
  changeCommentTemplate,
  selectReasonCategory,
  selectTemplate,
  fetchTemplates,
  fetchSenders,
  fetchPeriodOfSilence,
  fetchLteNumber,
  filterReasons,
  filterTemplates,
  fetchReasons,
  fetchReasonCategoryCommentTemplates
} from 'reducers/smsSendingReducer'

import { fetchTopSmsTemplates } from 'reducers/sms/topSmsTemplatesReducer'

import SmsSendingPanel from './SmsSendingPanel'

const mapStateToProps = state => {
  return {
    templates: state.smsSending.templates,
    reasonCategoryCommentTemplates: state.smsSending.reasonCategoryCommentTemplates,
    senders: state.smsSending.senders,
    selectedTemplate: state.smsSending.selectedTemplate,
    selectedReason: state.smsSending.selectedReason,
    selectedCategory: state.smsSending.selectedCategory,
    periodOfSilence: state.smsSending.periodOfSilence,
    initialReasons: state.smsSending.initialReasons,
    lteNumber: state.smsSending.lteNumber,
    smsStatus: state.smsSending.smsStatus,
    rightModal: state.internal.rightModal,

    ...state.sms.topSmsTemplatesState,

    personalAccountState: state.personalInfo.personalAccountState,
    whoIsIt: state.personalInfo.numberOperatorBelonging.whoIsIt,
    handlingState: state.internal.handlingState,
    mnpMarkers: state.mnp.mnpMarkersState.mnpMarkers,
    user: state.internal.userState.user,
    cardMode: state.internal.cardMode.cardMode
  }
}

const mapDispatchToProps = {
  sendSms,
  resetSms,
  cancelSms,
  changeCommentTemplate,
  selectReasonCategory,
  selectTemplate,
  fetchTemplates,
  fetchSenders,
  fetchPeriodOfSilence,
  fetchLteNumber,
  filterReasons,
  filterTemplates,
  fetchReasons,
  fetchReasonCategoryCommentTemplates,

  fetchTopSmsTemplates
}

export default connect(mapStateToProps, mapDispatchToProps)(SmsSendingPanel)
