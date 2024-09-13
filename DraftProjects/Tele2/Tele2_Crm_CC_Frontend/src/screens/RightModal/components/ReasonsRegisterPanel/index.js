import { connect } from 'react-redux'

import {
  fetchInteractions,
  fetchCompanyMarks,
  createInteraction,
  deleteInteraction,
  fetchReasonCategoryCommentTemplates,
  fetchInteractionsCommentTemplates,
  clearInteractionsCommentTemplates,
  changeReasonCategory,
  filterReasons,
  fetchReasons,
  fetchCompanyMarksForHandling,
  editInteractionComment,
  clearChangedReasonsCategories
} from 'reducers/reasonsRegisteringReducer'
import { sendSms, cancelSms } from 'reducers/smsSendingReducer'
import { getReasonCategoryForEscalation } from 'reducers/reasonsCategories/reasonCategoryForEscalationReducer'
import { toggleRap } from 'reducers/internal/rightModalReducer'
import {
  changeModalVisibility,
  ticketAddParams,
  selectReason as selectReasonForTicket,
  selectCategory as selectCategoryForTicket
} from 'reducers/tickets/createTicketReducer'

import { rcSearchConnect } from 'reducers/searching/reasonCategorySearchReducer'

import ReasonsRegisterPanel from './ReasonsRegisterPanel'

const mapStateToProps = state => {
  return {
    reasons: state.reasonsRegistering.reasons,
    categories: state.reasonsRegistering.categories,

    companyMarks: state.reasonsRegistering.companyMarks,
    interactions: state.reasonsRegistering.interactions,
    commentTemplates: state.reasonsRegistering.commentTemplates,
    changedReasonsCategories: state.reasonsRegistering.changedReasonsCategories,
    parameters: state.reasonsRegistering.parameters,
    interactionsCommentTemplates: state.reasonsRegistering.interactionsCommentTemplates,
    rightModal: state.internal.rightModal,

    handling: state.internal.handlingState,
    personalAccountState: state.personalInfo.personalAccountState,
    user: state.internal.userState.user,

    handlingId: state.internal.handlingState.Id,
    queryParams: state.internal.queryParamsState.queryParams
  }
}

const mapDispatchToProps = {
  fetchInteractions,
  fetchCompanyMarks,
  createInteraction,
  deleteInteraction,
  fetchReasonCategoryCommentTemplates,
  fetchInteractionsCommentTemplates,
  clearInteractionsCommentTemplates,
  filterReasons,
  fetchReasons,
  changeReasonCategory,
  fetchCompanyMarksForHandling,
  editInteractionComment,
  clearChangedReasonsCategories,

  changeModalVisibility,
  selectReasonForTicket,
  selectCategoryForTicket,
  toggleRap,
  ticketAddParams,

  sendSms,
  cancelSms,

  getReasonCategoryForEscalation,
  rcSearchConnect
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReasonsRegisterPanel)
