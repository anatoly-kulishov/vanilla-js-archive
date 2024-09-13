import { connect } from 'react-redux'
import { fetchSendersConversations, fetchIdentificationLevels, updateIdentificationLevel } from 'reducers/twinspot/conversationsReducer'
import { fetchChannels } from 'reducers/reasonsCategories/reasonsListReducer'

import Preview from './Preview'

const mapStateToProps = state => ({
  ...state.twinspot.conversations,
  ...state.twinspot.messages,
  channels: state.reasonsCategories.reasonsListState.channels
})

const mapDispatchToProps = {
  fetchSendersConversations,
  fetchIdentificationLevels,
  updateIdentificationLevel,
  fetchChannels
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
