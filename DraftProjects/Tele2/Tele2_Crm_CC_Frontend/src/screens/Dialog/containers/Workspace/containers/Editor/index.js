import { connect } from 'react-redux'
import { uploadMessageFiles, deleteMessageFiles, sendMessage } from 'reducers/twinspot/messagesReducer'
import { fetchMessageTemplates } from 'reducers/twinspot/messageTemplatesReducer'

import Editor from './Editor'

const mapStateToProps = state => ({
  currentConversation: state.twinspot.conversations.currentConversation,
  cuvoLink: state.twinspot.messages.cuvoLink,
  messageFiles: state.twinspot.messages.messageFiles,
  isUploadMessageFilesLoading: state.twinspot.messages.isUploadMessageFilesLoading,
  messageTemplates: state.twinspot.messageTemplates.messageTemplates
})

const mapDispatchToProps = {
  uploadMessageFiles,
  deleteMessageFiles,
  sendMessage,
  fetchMessageTemplates
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
