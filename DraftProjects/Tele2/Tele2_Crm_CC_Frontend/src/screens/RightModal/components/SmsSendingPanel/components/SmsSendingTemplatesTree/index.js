import { connect } from 'react-redux'

import {
  filterTemplates,
  selectTemplate,
  fetchReasonCategoryCommentTemplates
} from 'reducers/smsSendingReducer'

import SmsSendingTemplatesTree from './SmsSendingTemplatesTree'

const mapStateToProps = state => {
  return {
    templates: state.smsSending.templates,
    selectedTemplate: state.smsSending.selectedTemplate,
    selectedReason: state.smsSending.selectedReason,
    templateSearchName: state.smsSending.templatesFilterFields.templateName,
    firstBoot: state.smsSending.firstBoot
  }
}

const mapDispatchToProps = {
  fetchReasonCategoryCommentTemplates,
  filterTemplates,
  selectTemplate
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SmsSendingTemplatesTree)
