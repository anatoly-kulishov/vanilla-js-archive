/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import { connect } from 'react-redux'

import {
  cancelFeedback,
  feedbackModalClose,
  feedbackModalOpen,
  getFeedbackComponents,
  getFeedbackTemplates,
  getFeedbackTypes,
  sendFeedback
} from 'reducers/feedbackReducer'
import { deleteFile, fetchSessionFiles, uploadFile } from 'reducers/internal/fileReducer'
import { recognizeVoice } from 'reducers/internal/voiceRecognitionReducer'

import FeedbackModal from './FeedbackModal'

const mapStateToProps = state => ({
  state: state,
  user: state.internal.userState.user,
  filesState: state.internal.file,
  isFeedbackModalVisible: state.feedback.isVisible,
  isToggled: state.feedback.isVisible,
  isFeedbackSending: state.feedback.isFeedbackSending,
  isFeedbackCanceling: state.feedback.isFeedbackCanceling,

  msisdn: state.personalInfo.personalAccountState.personalAccount?.Msisdn,
  subscriberId: state.personalInfo.personalAccountState.personalAccount?.SubscriberId,

  feedbackTypes: state.feedback.feedbackTypes,
  feedbackComponents: state.feedback.feedbackComponents,
  feedbackTemplates: state.feedback.feedbackTemplates,

  questionaryUseListError: state.questionary.questionaryState.questionaryUseListError,
  voiceRecognition: state.internal.voiceRecognition,

  prefilledData: state.feedback.prefilledData
})

const mapDispatchToProps = {
  sendFeedback,
  cancelFeedback,
  uploadFile,
  deleteFile,
  fetchSessionFiles,
  feedbackModalOpen,
  feedbackModalClose,
  getFeedbackTypes,
  getFeedbackComponents,
  getFeedbackTemplates,
  recognizeVoice
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackModal)
