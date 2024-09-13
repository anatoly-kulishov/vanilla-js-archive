import { connect } from 'react-redux'

import { feedbackModalOpen } from 'reducers/feedbackReducer'
import { updateIdentificationLevel, fetchIdentificationLevels } from 'reducers/twinspot/conversationsReducer'
import { fetchChannels } from 'reducers/reasonsCategories/reasonsListReducer'

import TwinspotHeader from './TwinspotHeader'

const mapDispatchToProps = {
  feedbackModalOpen,
  updateIdentificationLevel,
  fetchIdentificationLevels,
  fetchChannels
}
const mapStateToProps = state => ({
  userState: state.internal.userState,
  personalAccount: state.personalInfo.personalAccountState.personalAccount,
  currentConversation: state.twinspot.conversations.currentConversation,
  identificationLevels: state.twinspot.conversations.identificationLevels,
  channels: state.reasonsCategories.reasonsListState.channels,
  ...state.internal.queryParamsState
})

export default connect(mapStateToProps, mapDispatchToProps)(TwinspotHeader)
